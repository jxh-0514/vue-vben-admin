var C=(f,d,s)=>new Promise((u,r)=>{var c=e=>{try{l(s.next(e))}catch(t){r(t)}},h=e=>{try{l(s.throw(e))}catch(t){r(t)}},l=e=>e.done?u(e.value):Promise.resolve(e.value).then(c,h);l((s=s.apply(f,d)).next())});import{C as k}from"./bootstrap-CA8cR5SF.js";import{d as H,r as p,b as y,c as R,o as T,e as o,f as a,g as n,h as $,n as m,u as g,j as v,k as i,t as b,l as S,m as B}from"../jse/index-index-BRZmeAp7.js";const A={class:"relative"},E={class:"flex-auto"},N={key:0,class:"mb-2 flex text-lg font-semibold"},V={key:0,class:"text-muted-foreground"},w={key:0},O=H({name:"Page",__name:"page",props:{title:{},description:{},contentClass:{},autoContentHeight:{type:Boolean,default:!1},headerClass:{},footerClass:{}},setup(f){const d=p(0),s=p(0),u=p(!1),r=y("headerRef"),c=y("footerRef"),h=R(()=>f.autoContentHeight?{height:`calc(var(${k}) - ${d.value}px)`,overflowY:u.value?"auto":"unset"}:{});function l(){return C(this,null,function*(){var e,t;f.autoContentHeight&&(yield B(),d.value=((e=r.value)==null?void 0:e.offsetHeight)||0,s.value=((t=c.value)==null?void 0:t.offsetHeight)||0,setTimeout(()=>{u.value=!0},30))})}return T(()=>{l()}),(e,t)=>(a(),o("div",A,[e.description||e.$slots.description||e.title||e.$slots.title||e.$slots.extra?(a(),o("div",{key:0,ref_key:"headerRef",ref:r,class:m(g(v)("bg-card border-border relative flex items-end border-b px-6 py-4",e.headerClass))},[$("div",E,[i(e.$slots,"title",{},()=>[e.title?(a(),o("div",N,b(e.title),1)):n("",!0)]),i(e.$slots,"description",{},()=>[e.description?(a(),o("p",V,b(e.description),1)):n("",!0)])]),e.$slots.extra?(a(),o("div",w,[i(e.$slots,"extra")])):n("",!0)],2)):n("",!0),$("div",{class:m(g(v)("h-full p-4",e.contentClass)),style:S(h.value)},[i(e.$slots,"default")],6),e.$slots.footer?(a(),o("div",{key:1,ref_key:"footerRef",ref:c,class:m(g(v)("bg-card align-center absolute bottom-0 left-0 right-0 flex px-6 py-4",e.footerClass))},[i(e.$slots,"footer")],2)):n("",!0)]))}});export{O as _};
