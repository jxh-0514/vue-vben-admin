var v=Object.defineProperty,m=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var i=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var a=(r,t,e)=>t in r?v(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,n=(r,t)=>{for(var e in t||(t={}))S.call(t,e)&&a(r,e,t[e]);if(i)for(var e of i(t))_.call(t,e)&&a(r,e,t[e]);return r},l=(r,t)=>m(r,y(t));import{h,j as b,k as g,l as k,w as P}from"./bootstrap-CA8cR5SF.js";import{d as u,c as z,e as d,f as c,g as C,n as p,u as o,k as D,l as E}from"../jse/index-index-BRZmeAp7.js";const w=h({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:b(String),default:"solid"}}),B=u({name:"ElDivider"}),N=u(l(n({},B),{props:w,setup(r){const t=r,e=k("divider"),f=z(()=>e.cssVar({"border-style":t.borderStyle}));return(s,$)=>(c(),d("div",{class:p([o(e).b(),o(e).m(s.direction)]),style:E(o(f)),role:"separator"},[s.$slots.default&&s.direction!=="vertical"?(c(),d("div",{key:0,class:p([o(e).e("text"),o(e).is(s.contentPosition)])},[D(s.$slots,"default")],2)):C("v-if",!0)],6))}}));var V=g(N,[["__file","divider.vue"]]);const q=P(V);export{q as ElDivider,q as default,w as dividerProps};
