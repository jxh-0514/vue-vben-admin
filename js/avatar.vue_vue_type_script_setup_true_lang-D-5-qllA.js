import{V as i,Z as d,_ as r,$ as c,X as m,b1 as n,U as s,b2 as h,a2 as _,a3 as v,a0 as z,J as p,ak as f,al as y,x as u,af as b,a5 as x,a6 as g}from"../jse/index-index-CfeF-6tH.js";import{r as C,z as k,H as $,K as w}from"./bootstrap-B1vnuyFx.js";const B=C("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{shape:{circle:"rounded-full",square:"rounded-md"},size:{base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl",sm:"h-10 w-10 text-xs"}}}),P=i({__name:"Avatar",props:{class:{},shape:{default:"circle"},size:{default:"sm"}},setup(t){const e=t;return(a,l)=>(r(),d(s(k),{class:n(s(h)(s(B)({size:a.size,shape:a.shape}),e.class))},{default:c(()=>[m(a.$slots,"default")]),_:3},8,["class"]))}}),V=i({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(t){const e=t;return(a,l)=>(r(),d(s($),_(v(e)),{default:c(()=>[m(a.$slots,"default")]),_:3},16))}}),A=i({__name:"AvatarImage",props:{src:{},referrerPolicy:{},asChild:{type:Boolean},as:{}},setup(t){const e=t;return(a,l)=>(r(),d(s(w),z(e,{class:"h-full w-full object-cover"}),null,16))}}),H=i({inheritAttrs:!1,__name:"avatar",props:{alt:{default:"avatar"},class:{},dot:{type:Boolean,default:!1},dotClass:{default:"bg-green-500"},size:{},delayMs:{},asChild:{type:Boolean},as:{default:"button"},src:{},referrerPolicy:{}},setup(t){const e=t,a=p(()=>e.alt.slice(-2).toUpperCase()),l=p(()=>e.size!==void 0&&e.size>0?{height:`${e.size}px`,width:`${e.size}px`}:{});return(o,S)=>(r(),f("div",{class:n([e.class,"relative flex flex-shrink-0 items-center"]),style:y(l.value)},[u(s(P),{class:n([e.class,"size-full"])},{default:c(()=>[u(s(A),{alt:o.alt,src:o.src},null,8,["alt","src"]),u(s(V),null,{default:c(()=>[x(g(a.value),1)]),_:1})]),_:1},8,["class"]),o.dot?(r(),f("span",{key:0,class:n([o.dotClass,"border-background absolute bottom-0 right-0 size-3 rounded-full border-2"])},null,2)):b("",!0)],6))}});export{H as _};
