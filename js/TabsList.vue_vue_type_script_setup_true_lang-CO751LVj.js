var f=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var l=(s,a)=>{var t={};for(var e in s)b.call(s,e)&&a.indexOf(e)<0&&(t[e]=s[e]);if(s!=null&&f)for(var e of f(s))a.indexOf(e)<0&&v.call(s,e)&&(t[e]=s[e]);return t};import{m as h,n as B,o as C,w as y}from"./bootstrap-B1vnuyFx.js";import{V as c,Z as i,_ as u,$ as d,X as p,a2 as $,a3 as P,U as n,J as m,a0 as _,b2 as g}from"../jse/index-index-CfeF-6tH.js";const T=c({__name:"Tabs",props:{defaultValue:{},orientation:{},dir:{},activationMode:{},modelValue:{},asChild:{type:Boolean},as:{}},emits:["update:modelValue"],setup(s,{emit:a}){const r=h(s,a);return(o,w)=>(u(),i(n(B),$(P(n(r))),{default:d(()=>[p(o.$slots,"default")]),_:3},16))}}),M=c({__name:"TabsContent",props:{class:{},value:{},forceMount:{type:Boolean},asChild:{type:Boolean},as:{}},setup(s){const a=s,t=m(()=>{const o=a,{class:e}=o;return l(o,["class"])});return(e,r)=>(u(),i(n(C),_({class:n(g)("ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",a.class)},t.value),{default:d(()=>[p(e.$slots,"default")]),_:3},16,["class"]))}}),S=c({__name:"TabsList",props:{class:{},loop:{type:Boolean},asChild:{type:Boolean},as:{}},setup(s){const a=s,t=m(()=>{const o=a,{class:e}=o;return l(o,["class"])});return(e,r)=>(u(),i(n(y),_(t.value,{class:n(g)("bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1",a.class)}),{default:d(()=>[p(e.$slots,"default")]),_:3},16,["class"]))}});export{T as _,S as a,M as b};
