// 定义地理位置数据的接口
interface GeolocationData {
  latitude: number; // 纬度
  longitude: number; // 经度
  accuracy: number; // 位置的精确度（单位：米）
}

// 定义错误代码映射
const errorMessages = {
  1: 'Permission denied. Please allow location access.',
  2: 'Location information is unavailable.',
  3: 'The request to get location timed out.',
  UNSUPPORTED: 'Geolocation is not supported by your browser.',
};

/**
 * 获取当前位置的Async/Await封装
 * @returns Promise<GeolocationData>
 * @throws 当获取位置失败时抛出错误
 */
export async function getCurrentPosition(): Promise<GeolocationData> {
  // 检查浏览器是否支持Geolocation API
  if (!navigator.geolocation) {
    throw new Error(errorMessages.UNSUPPORTED);
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        // 根据错误代码获取对应的错误信息
        const message =
          errorMessages[error.code as keyof typeof errorMessages] ||
          'An unknown error occurred.';
        reject(new Error(message));
      },
    );
  });
}

/**
 * 带重试机制的获取位置方法
 * @param retries 最大重试次数（默认3次）
 * @param delay 重试间隔(ms)（默认1000ms）
 * @returns Promise<GeolocationData>
 * @throws 当所有重试都失败后抛出错误
 */
export async function getLocationWithRetry(
  retries = 3,
  delay = 1000,
): Promise<GeolocationData> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const position = await getCurrentPosition();
      return position;
    } catch (error) {
      lastError = error as Error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Failed to get location after retries');
}
