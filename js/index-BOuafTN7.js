import{i as g}from"../jse/index-index-BRZmeAp7.js";import{i as x,a as C}from"./bootstrap-CA8cR5SF.js";const s=new Map;if(C){let e;document.addEventListener("mousedown",t=>e=t),document.addEventListener("mouseup",t=>{if(e){for(const n of s.values())for(const{documentHandler:o}of n)o(t,e);e=void 0}})}function u(e,t){let n=[];return g(t.arg)?n=t.arg:x(t.arg)&&n.push(t.arg),function(o,a){const r=t.instance.popperRef,c=o.target,i=a==null?void 0:a.target,l=!t||!t.instance,f=!c||!i,p=e.contains(c)||e.contains(i),m=e===c,h=n.length&&n.some(d=>d==null?void 0:d.contains(c))||n.length&&n.includes(i),v=r&&(r.contains(c)||r.contains(i));l||f||p||m||h||v||t.value(o,a)}}const T={beforeMount(e,t){s.has(e)||s.set(e,[]),s.get(e).push({documentHandler:u(e,t),bindingFn:t.value})},updated(e,t){s.has(e)||s.set(e,[]);const n=s.get(e),o=n.findIndex(r=>r.bindingFn===t.oldValue),a={documentHandler:u(e,t),bindingFn:t.value};o>=0?n.splice(o,1,a):n.push(a)},unmounted(e){s.delete(e)}};export{T as C};
