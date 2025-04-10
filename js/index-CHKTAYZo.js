var Z=Object.defineProperty,ee=Object.defineProperties;var ae=Object.getOwnPropertyDescriptors;var z=Object.getOwnPropertySymbols;var oe=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable;var F=(a,s,o)=>s in a?Z(a,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[s]=o,b=(a,s)=>{for(var o in s||(s={}))oe.call(s,o)&&F(a,o,s[o]);if(z)for(var o of z(s))le.call(s,o)&&F(a,o,s[o]);return a},_=(a,s)=>ee(a,ae(s));import{o as P,L as A,h as R,q as D,ap as L,k,l as I,aq as K,A as E,w as se,an as x}from"./bootstrap-CA8cR5SF.js";import{C,U as G,u as te}from"./index-CG0_2O8F.js";import{q as U,r as V,y as ne,c as f,d as h,e as N,f as w,h as g,N as T,u as e,n as v,ae as q,k as $,G as M,t as j,m as H,l as re,o as ie,ab as de,L as ue,af as ce,w as pe}from"../jse/index-index-BRZmeAp7.js";import{u as me,b as fe}from"./use-form-common-props-DFBxOh6J.js";import{u as ve}from"./index-BMinbDcC.js";import{b as be,u as ye,a as _e}from"./use-form-item-D8__z1hu.js";import{d as ge}from"./error-0DlWtrQ3.js";const O=R({modelValue:{type:[String,Number,Boolean],default:void 0},size:D,disabled:Boolean,label:{type:[String,Number,Boolean],default:void 0},value:{type:[String,Number,Boolean],default:void 0},name:{type:String,default:void 0}}),he=R(_(b({},O),{border:Boolean})),W={[G]:a=>U(a)||P(a)||A(a),[C]:a=>U(a)||P(a)||A(a)},J=Symbol("radioGroupKey"),Q=(a,s)=>{const o=V(),l=ne(J,void 0),d=f(()=>!!l),c=f(()=>L(a.value)?a.label:a.value),i=f({get(){return d.value?l.modelValue:a.modelValue},set(n){d.value?l.changeEvent(n):s&&s(G,n),o.value.checked=a.modelValue===c.value}}),u=me(f(()=>l==null?void 0:l.size)),t=fe(f(()=>l==null?void 0:l.disabled)),r=V(!1),p=f(()=>t.value||d.value&&i.value!==c.value?-1:0);return ve({from:"label act as value",replacement:"value",version:"3.0.0",scope:"el-radio",ref:"https://element-plus.org/en-US/component/radio.html"},f(()=>d.value&&L(a.value))),{radioRef:o,isGroup:d,radioGroup:l,focus:r,size:u,disabled:t,tabIndex:p,modelValue:i,actualValue:c}},Be=h({name:"ElRadio"}),Ee=h(_(b({},Be),{props:he,emits:W,setup(a,{emit:s}){const o=a,l=I("radio"),{radioRef:d,radioGroup:c,focus:i,size:u,disabled:t,modelValue:r,actualValue:p}=Q(o,s);function n(){H(()=>s(C,r.value))}return(m,B)=>{var y;return w(),N("label",{class:v([e(l).b(),e(l).is("disabled",e(t)),e(l).is("focus",e(i)),e(l).is("bordered",m.border),e(l).is("checked",e(r)===e(p)),e(l).m(e(u))])},[g("span",{class:v([e(l).e("input"),e(l).is("disabled",e(t)),e(l).is("checked",e(r)===e(p))])},[T(g("input",{ref_key:"radioRef",ref:d,"onUpdate:modelValue":S=>q(r)?r.value=S:null,class:v(e(l).e("original")),value:e(p),name:m.name||((y=e(c))==null?void 0:y.name),disabled:e(t),checked:e(r)===e(p),type:"radio",onFocus:S=>i.value=!0,onBlur:S=>i.value=!1,onChange:n,onClick:E(()=>{},["stop"])},null,42,["onUpdate:modelValue","value","name","disabled","checked","onFocus","onBlur","onClick"]),[[K,e(r)]]),g("span",{class:v(e(l).e("inner"))},null,2)],2),g("span",{class:v(e(l).e("label")),onKeydown:E(()=>{},["stop"])},[$(m.$slots,"default",{},()=>[M(j(m.label),1)])],42,["onKeydown"])],2)}}}));var Re=k(Ee,[["__file","radio.vue"]]);const Se=R(b({},O)),Ve=h({name:"ElRadioButton"}),ke=h(_(b({},Ve),{props:Se,setup(a){const s=a,o=I("radio"),{radioRef:l,focus:d,size:c,disabled:i,modelValue:u,radioGroup:t,actualValue:r}=Q(s),p=f(()=>({backgroundColor:(t==null?void 0:t.fill)||"",borderColor:(t==null?void 0:t.fill)||"",boxShadow:t!=null&&t.fill?`-1px 0 0 0 ${t.fill}`:"",color:(t==null?void 0:t.textColor)||""}));return(n,m)=>{var B;return w(),N("label",{class:v([e(o).b("button"),e(o).is("active",e(u)===e(r)),e(o).is("disabled",e(i)),e(o).is("focus",e(d)),e(o).bm("button",e(c))])},[T(g("input",{ref_key:"radioRef",ref:l,"onUpdate:modelValue":y=>q(u)?u.value=y:null,class:v(e(o).be("button","original-radio")),value:e(r),type:"radio",name:n.name||((B=e(t))==null?void 0:B.name),disabled:e(i),onFocus:y=>d.value=!0,onBlur:y=>d.value=!1,onClick:E(()=>{},["stop"])},null,42,["onUpdate:modelValue","value","name","disabled","onFocus","onBlur","onClick"]),[[K,e(u)]]),g("span",{class:v(e(o).be("button","inner")),style:re(e(u)===e(r)?e(p):{}),onKeydown:E(()=>{},["stop"])},[$(n.$slots,"default",{},()=>[M(j(n.label),1)])],46,["onKeydown"])],2)}}}));var X=k(ke,[["__file","radio-button.vue"]]);const Ie=R(b({id:{type:String,default:void 0},size:D,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:void 0},fill:{type:String,default:""},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}},te(["ariaLabel"]))),Ce=W,Ge=h({name:"ElRadioGroup"}),Ne=h(_(b({},Ge),{props:Ie,emits:Ce,setup(a,{emit:s}){const o=a,l=I("radio"),d=be(),c=V(),{formItem:i}=ye(),{inputId:u,isLabeledByFormItem:t}=_e(o,{formItemContext:i}),r=n=>{s(G,n),H(()=>s(C,n))};ie(()=>{const n=c.value.querySelectorAll("[type=radio]"),m=n[0];!Array.from(n).some(B=>B.checked)&&m&&(m.tabIndex=0)});const p=f(()=>o.name||d.value);return de(J,ue(_(b({},ce(o)),{changeEvent:r,name:p}))),pe(()=>o.modelValue,()=>{o.validateEvent&&(i==null||i.validate("change").catch(n=>ge()))}),(n,m)=>(w(),N("div",{id:e(u),ref_key:"radioGroupRef",ref:c,class:v(e(l).b("group")),role:"radiogroup","aria-label":e(t)?void 0:n.ariaLabel||"radio-group","aria-labelledby":e(t)?e(i).labelId:void 0},[$(n.$slots,"default")],10,["id","aria-label","aria-labelledby"]))}}));var Y=k(Ne,[["__file","radio-group.vue"]]);const De=se(Re,{RadioButton:X,RadioGroup:Y}),Ke=x(Y),xe=x(X);export{De as ElRadio,xe as ElRadioButton,Ke as ElRadioGroup,De as default,Se as radioButtonProps,W as radioEmits,Ce as radioGroupEmits,J as radioGroupKey,Ie as radioGroupProps,he as radioProps,O as radioPropsBase};
