import{n as v}from"./bootstrap-CA8cR5SF.js";import{z as C,K as g,r as m,w as F,a as f,m as w}from"../jse/index-index-BRZmeAp7.js";function k(e,{beforeFocus:t,afterFocus:a,beforeBlur:i,afterBlur:u}={}){const r=C(),{emit:p}=r,o=g(),s=m(!1),c=n=>{f(t)&&t(n)||s.value||(s.value=!0,p("focus",n),a==null||a())},d=n=>{var l;f(i)&&i(n)||n.relatedTarget&&((l=o.value)!=null&&l.contains(n.relatedTarget))||(s.value=!1,p("blur",n),u==null||u())},h=()=>{var n,l;(n=o.value)!=null&&n.contains(document.activeElement)&&o.value!==document.activeElement||(l=e.value)==null||l.focus()};return F(o,n=>{n&&n.setAttribute("tabindex","-1")}),v(o,"focus",c,!0),v(o,"blur",d,!0),v(o,"click",h,!0),{isFocused:s,wrapperRef:o,handleFocus:c,handleBlur:d}}const x=e=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(e);function A({afterComposition:e,emit:t}){const a=m(!1),i=o=>{t==null||t("compositionstart",o),a.value=!0},u=o=>{var s;t==null||t("compositionupdate",o);const c=(s=o.target)==null?void 0:s.value,d=c[c.length-1]||"";a.value=!x(d)},r=o=>{t==null||t("compositionend",o),a.value&&(a.value=!1,w(()=>e(o)))};return{isComposing:a,handleComposition:o=>{o.type==="compositionend"?r(o):u(o)},handleCompositionStart:i,handleCompositionUpdate:u,handleCompositionEnd:r}}export{A as a,k as u};
