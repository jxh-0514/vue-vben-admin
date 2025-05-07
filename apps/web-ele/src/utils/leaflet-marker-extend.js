/*
 * 扩展 L.Marker 的默认逻辑，对于 未传递 icon 或 iconUrl 的情况，使用默认图标。
 */
import Icon from 'leaflet/dist/images/marker-icon.png';

// 默认图标
const originalInitialize = L.Marker.prototype.initialize;

// 设置默认图标
const defaultIcon = L.icon({
  iconUrl: Icon,
  // iconAnchor: [0, 20],
  iconSize: [25, 41],
});

L.Marker.prototype.initialize = function (latlng, options = {}) {
  // 如果未传递 icon 或 iconUrl，使用默认图标
  if (options?.icon) {
    // 测试 URL 是否有效，若无效则回退到默认图标
    const img = new Image();
    img.src = options.icon;
    img.onerror = () => {
      console.error(
        `Failed to load icon at ${options.icon}, using default icon.`,
      );
      options.icon = defaultIcon;
    };
  } else {
    console.warn(
      'No icon provided or iconUrl is missing, using the default icon.',
    );
    options.icon = defaultIcon;
  }

  // 调用原始初始化方法
  originalInitialize.call(this, latlng, options);
};

L.marker.prototype.initialize = function (latlng, options) {
  return new L.Marker.prototype.initialize(latlng, options);
};
