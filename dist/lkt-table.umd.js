(function(u,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue"),require("vuedraggable"),require("lkt-events"),require("lkt-string-tools")):typeof define=="function"&&define.amd?define(["exports","vue","vuedraggable","lkt-events","lkt-string-tools"],e):(u=typeof globalThis<"u"?globalThis:u||self,e(u.LktTable={},u.Vue,u.draggable,u.LktEvents,u.LktStringTools))})(this,function(u,e,E,I,R){"use strict";var Ae=Object.defineProperty;var Te=(u,e,E)=>e in u?Ae(u,e,{enumerable:!0,configurable:!0,writable:!0,value:E}):u[e]=E;var g=(u,e,E)=>(Te(u,typeof e!="symbol"?e+"":e,E),E);const M=(t=>t&&typeof t=="object"&&"default"in t?t:{default:t})(E);class S{constructor(l="",n=""){g(this,"key");g(this,"label");g(this,"sortable");g(this,"hidden");g(this,"editable");g(this,"formatter");g(this,"checkEmpty");g(this,"colspan");g(this,"type");g(this,"link");g(this,"options");this.key=l,this.label=n,this.sortable=!0,this.hidden=!1,this.formatter=void 0,this.checkEmpty=void 0,this.colspan=void 0}setIsSortable(l=!0){return this.sortable=l,this}setIsEditable(l=!0){return this.editable=l,this}setIsHidden(l=!0){return this.hidden=l,this}setFormatter(l=void 0){return this.formatter=l,this}setEmptyChecker(l=void 0){return this.checkEmpty=l,this}setColSpan(l=void 0){return this.colspan=void 0,this}getHref(l){return typeof this.link=="function"?this.link(l):this.link}defineAsLink(l){return this.type="link",this.link=l,this}defineAsText(){return this.type="text",this}defineAsInt(){return this.type="int",this}defineAsFloat(){return this.type="float",this}defineAsCheck(){return this.type="check",this}defineAsSwitch(){return this.type="switch",this}defineAsSelect(l){return this.type="select",this.options=l,this}}const z=(t,l,n=!0)=>new S(t,l).setIsSortable(n),J=(t,l,n,s=!0)=>new S(t,l).setIsSortable(s).defineAsLink(n),P=(t,l,n=!0)=>new S(t,l).setIsSortable(n).defineAsText(),G=(t,l,n=!0)=>new S(t,l).setIsSortable(n).defineAsCheck(),Q=(t,l,n=!0)=>new S(t,l).setIsSortable(n).defineAsSwitch(),W=(t,l,n,s=!0)=>new S(t,l).setIsSortable(s).defineAsSelect(n),X=(t,l,n=!0)=>new S(t,l).setIsSortable(n).setIsHidden(!0),j=(t,l,n,s)=>{if(!n)return 0;let i=t[n.key],a=l[n.key];if(s==="asc"){if(i>a)return 1;if(a>i)return-1}else{if(i>a)return-1;if(a>i)return 1}return 0},V=(t,l,n)=>t.formatter&&typeof t.formatter=="function"?t.formatter(l[t.key],l,t,n):l[t.key],Y=(t,l,n)=>{if(!t.colspan)return-1;let s=l;return n.forEach(i=>{let a=A(t,i);a>0&&a<s&&(s=a)}),s},A=(t,l)=>t.colspan===!1?!1:typeof t.colspan=="function"?t.colspan(l):t.colspan,Z=(t,l,n)=>{if(typeof t!="object"||!t.key||l.indexOf(t.key)>-1)return!1;let s=A(t,n);return typeof t.colspan>"u"?!0:(typeof t.colspan<"u"&&(typeof t.colspan=="function"?s=parseInt(t.colspan()):s=parseInt(t.colspan)),s>0)},_=(t=[])=>{if(t.length>0){for(let l=0;l<t.length;++l)if(t[l].sortable)return t[l].key}return""},v=(t,l)=>{if(t.length>0){for(let n=0;n<t.length;++n)if(t[n].key===l)return t[n]}return null},ee=e.createElementVNode("i",{class:"lkt-cell-text"},null,-1),te=e.createElementVNode("i",{class:"lkt-cell-check"},null,-1),le=e.createElementVNode("i",{class:"lkt-cell-check"},null,-1),ne=e.createElementVNode("i",{class:"lkt-cell-check"},null,-1),ae={name:"LktTableCell",inheritAttrs:!1},U=e.defineComponent({...ae,props:{column:{type:Object,default:()=>({})},i:{type:[Number],default:0},modelValue:{type:Object,default:()=>({})}},emits:["edited"],setup(t,{emit:l}){const n=l,s=t,i=e.ref(s.modelValue),a=e.ref(i.value[s.column.key]),b=e.ref(null);return e.watch(a,()=>{const y=JSON.parse(JSON.stringify(i.value));y[s.column.key]=a.value,n("edited",y,s.i)}),e.watch(()=>s.modelValue,y=>{i.value=y,a.value=i.value[s.column.key]}),(y,o)=>{const k=e.resolveComponent("router-link"),d=e.resolveComponent("lkt-field-text"),B=e.resolveComponent("lkt-field-check"),$=e.resolveComponent("lkt-field-switch"),N=e.resolveComponent("lkt-field-select");return t.column.type==="link"?(e.openBlock(),e.createBlock(k,{key:0,to:t.column.getHref(i.value)},{default:e.withCtx(()=>[e.createTextVNode(e.toDisplayString(e.unref(V)(t.column,i.value,t.i)),1)]),_:1},8,["to"])):t.column.type==="text"?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[t.column.editable?(e.openBlock(),e.createBlock(d,{key:0,ref:C=>b.value=C,modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=C=>a.value=C)},null,8,["modelValue"])):e.createCommentVNode("",!0),t.column.editable?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[ee,e.createTextVNode(e.toDisplayString(e.unref(V)(t.column,i.value,t.i)),1)],64))],64)):t.column.type==="check"?(e.openBlock(),e.createElementBlock(e.Fragment,{key:2},[t.column.editable?(e.openBlock(),e.createBlock(B,{key:0,modelValue:a.value,"onUpdate:modelValue":o[1]||(o[1]=C=>a.value=C)},null,8,["modelValue"])):e.createCommentVNode("",!0),t.column.editable?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[te,e.createTextVNode(e.toDisplayString(e.unref(V)(t.column,i.value,t.i)),1)],64))],64)):t.column.type==="switch"?(e.openBlock(),e.createElementBlock(e.Fragment,{key:3},[t.column.editable?(e.openBlock(),e.createBlock($,{key:0,modelValue:a.value,"onUpdate:modelValue":o[2]||(o[2]=C=>a.value=C)},null,8,["modelValue"])):e.createCommentVNode("",!0),t.column.editable?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[le,e.createTextVNode(e.toDisplayString(e.unref(V)(t.column,i.value,t.i)),1)],64))],64)):t.column.type==="select"?(e.openBlock(),e.createElementBlock(e.Fragment,{key:4},[t.column.editable?(e.openBlock(),e.createBlock(N,{key:0,modelValue:a.value,"onUpdate:modelValue":o[3]||(o[3]=C=>a.value=C),options:t.column.options},null,8,["modelValue","options"])):e.createCommentVNode("",!0),t.column.editable?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[ne,e.createTextVNode(e.toDisplayString(e.unref(V)(t.column,i.value,t.i)),1)],64))],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:5},[e.createTextVNode(e.toDisplayString(e.unref(V)(t.column,i.value,t.i)),1)],64))}}}),oe=["data-i","data-handle-drag"],re={key:0,"data-role":"drag-indicator"},ie={key:1,"data-role":"invalid-drag-indicator"},de=["data-column","colspan","title","onClick"],ce={name:"LktTableRow",inheritAttrs:!1},K=e.defineComponent({...ce,props:{isDraggable:{type:Boolean,default:!0},sortable:{type:Boolean,default:!0},i:{type:[Number],default:0},displayHiddenColumnsIndicator:{type:Boolean,default:!1},visibleColumns:{type:Array,default:()=>[]},emptyColumns:{type:Array,default:()=>[]},hiddenIsVisible:{type:Boolean,default:!1},item:{type:Object,default:()=>({})}},emits:["edited","click","show"],setup(t,{emit:l}){const n=l,s=t,i=e.ref(s.item),a=(o,k,d)=>{n("click",o,I.createLktEvent("",{item:k,column:d}))},b=(o,k)=>{n("show",o,I.createLktEvent("",{i:k}))},y=(o,k)=>{i.value=o};return e.watch(()=>s.item,o=>i.value=o),e.watch(i,()=>n("edited",i.value,s.i)),(o,k)=>(e.openBlock(),e.createElementBlock("tr",{"data-i":t.i,"data-handle-drag":t.isDraggable},[t.sortable&&t.isDraggable?(e.openBlock(),e.createElementBlock("td",re)):t.sortable?(e.openBlock(),e.createElementBlock("td",ie)):e.createCommentVNode("",!0),t.displayHiddenColumnsIndicator?(e.openBlock(),e.createElementBlock("td",{key:2,onClick:k[0]||(k[0]=d=>b(d,t.i)),"data-role":"show-more",class:e.normalizeClass(t.hiddenIsVisible?"state-open":"")},null,2)):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.visibleColumns,d=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[e.unref(Z)(d,t.emptyColumns,t.item)?(e.openBlock(),e.createElementBlock("td",{key:0,"data-column":d.key,colspan:e.unref(A)(d,t.item),title:e.unref(V)(d,t.item,t.i),onClick:B=>a(B,t.item,d)},[o.$slots[d.key]?e.renderSlot(o.$slots,d.key,{key:0,value:t.item[d.key],item:t.item,column:d,i:t.i}):t.item?(e.openBlock(),e.createBlock(U,{key:1,column:d,modelValue:i.value,"onUpdate:modelValue":k[1]||(k[1]=B=>i.value=B),i:t.i,onEdited:y},null,8,["column","modelValue","i"])):e.createCommentVNode("",!0)],8,de)):e.createCommentVNode("",!0)],64))),256))],8,oe))}}),se={"data-role":"hidden-row"},me=["colspan"],ue=["data-column"],ke=["data-i"],fe=["data-column","title","onClick"],ye={name:"LktHiddenRow",inheritAttrs:!1},he=e.defineComponent({...ye,props:{isDraggable:{type:Boolean,default:!0},sortable:{type:Boolean,default:!0},i:{type:[Number],default:0},hiddenColumnsColSpan:{type:Number,default:0},visibleColumns:{type:Array,default:()=>[]},hiddenColumns:{type:Array,default:()=>[]},emptyColumns:{type:Array,default:()=>[]},hiddenIsVisible:{type:Boolean,default:!1},modelValue:{type:Object,default:()=>({})}},emits:["update:modelValue","click"],setup(t,{emit:l}){const n=l,s=t,i=e.ref(s.modelValue),a=(b,y,o)=>{n("click",b,I.createLktEvent("",{item:y,column:o}))};return e.watch(()=>s.modelValue,b=>i.value=b),e.watch(i,()=>n("update:modelValue",i.value)),(b,y)=>e.withDirectives((e.openBlock(),e.createElementBlock("tr",se,[e.createElementVNode("td",{colspan:t.hiddenColumnsColSpan},[e.createElementVNode("table",null,[e.createElementVNode("tr",null,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.hiddenColumns,o=>(e.openBlock(),e.createElementBlock("th",{"data-column":o.key},[e.createElementVNode("div",null,e.toDisplayString(o.label),1)],8,ue))),256))]),e.createElementVNode("tr",{"data-i":t.i},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.hiddenColumns,(o,k)=>(e.openBlock(),e.createElementBlock("td",{"data-column":o.key,title:e.unref(V)(o,i.value,k),onClick:d=>a(d,i.value,o)},[b.$slots[o.key]?e.renderSlot(b.$slots,o.key,{key:0,value:i.value[o.key],item:i.value,column:o,i:k}):(e.openBlock(),e.createBlock(U,{key:1,column:o,modelValue:i.value,"onUpdate:modelValue":y[0]||(y[0]=d=>i.value=d),i:k},null,8,["column","modelValue","i"]))],8,fe))),256))],8,ke)])],8,me)],512)),[[e.vShow,t.hiddenIsVisible]])}}),be=["data-sortable"],ge={key:0,"data-role":"drag-indicator"},Ce={key:1},pe=["data-column","data-sortable","data-sort","colspan","title","onClick"],Be={key:1},Ve={key:1,class:"lkt-empty-table"},Ee={name:"LktTable",inheritAttrs:!1},Se=e.defineComponent({...Ee,props:{modelValue:{type:Array,default:()=>[]},columns:{type:Array,default:()=>[]},sorter:{type:Function,default:j},sortable:{type:Boolean,default:!1},hideEmptyColumns:{type:Boolean,default:!1},draggableChecker:{type:Function,default:t=>!0},checkValidDrag:{type:Function,default:t=>!0},draggableItemKey:{type:String,default:"name"}},emits:["update:modelValue","sort","click"],setup(t,{expose:l,emit:n}){const s=n,i=e.useSlots(),a=t,b={},y=e.ref(typeof a.sorter=="function"?a.sorter:j),o=e.ref(_(a.columns)),k=e.ref("asc"),d=e.ref(a.modelValue),B=e.ref(b),$=e.ref(!1),N=R.generateRandomString(12),C=e.computed(()=>d.value.length>0),L=e.computed(()=>{if(!a.hideEmptyColumns)return[];let r=[];return a.columns.forEach(c=>{let m=c.key,f=!1;d.value.forEach(h=>{if(typeof h.checkEmpty=="function")return h.checkEmpty(h);h[m]&&(f=!0)}),f||r.push(m)}),r}),w=e.computed(()=>a.columns.filter(r=>!r.hidden)),T=e.computed(()=>a.columns.filter(r=>r.hidden)),we=e.computed(()=>{let r=w.value.length+1;return a.sortable&&++r,r}),D=e.computed(()=>T.value.length>0&&!a.sortable),$e=e.computed(()=>a.columns.map(r=>r.key)),F=e.computed(()=>{let r=[];for(let c in i)$e.value.indexOf(c)!==-1&&r.push(c);return r}),Le=r=>{let c=r.target;if(typeof c.dataset.column>"u")do c=c.parentNode;while(typeof c.dataset.column>"u"&&c.tagName!=="TABLE"&&c.tagName!=="body");if(c.tagName==="TD"&&(c=c.parentNode,c=c.dataset.i,typeof c<"u"))return d.value[c]},x=r=>B.value["tr_"+r]===!0,q=r=>{!r||r.sortable&&(d.value=d.value.sort((c,m)=>y.value(c,m,r,k.value)),k.value=k.value==="asc"?"desc":"asc",o.value=r.key,s("sort",[o.value,k.value]))},H=(r,c)=>{s("click",r,c)},O=(r,c)=>{let m="tr_"+c.value.i;B.value[m]=typeof B.value[m]>"u"?!0:!B.value[m]},Ie=(r,c)=>{d.value[c]=r};return e.onMounted(()=>{q(v(a.columns,o.value))}),e.watch(()=>a.modelValue,r=>d.value=r),e.watch(d,r=>{s("update:modelValue",r)}),l({getItemByEvent:Le}),(r,c)=>C.value?(e.openBlock(),e.createElementBlock("div",{key:0,class:"lkt-table","data-sortable":t.sortable},[e.createElementVNode("table",null,[e.createElementVNode("thead",null,[e.createElementVNode("tr",null,[t.sortable?(e.openBlock(),e.createElementBlock("th",ge)):e.createCommentVNode("",!0),D.value?(e.openBlock(),e.createElementBlock("th",Ce)):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(w.value,m=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[L.value.indexOf(m.key)===-1?(e.openBlock(),e.createElementBlock("th",{key:0,"data-column":m.key,"data-sortable":m.sortable===!0,"data-sort":m.sortable===!0&&o.value===m.key?k.value:"",colspan:e.unref(Y)(m,t.columns.length,d.value),title:m.label,onClick:f=>q(m)},[e.createElementVNode("div",null,e.toDisplayString(m.label),1)],8,pe)):e.createCommentVNode("",!0)],64))),256))])]),t.sortable?(e.openBlock(),e.createBlock(e.unref(M.default),{key:0,modelValue:d.value,"onUpdate:modelValue":c[0]||(c[0]=m=>d.value=m),move:t.checkValidDrag,itemKey:t.draggableItemKey,onStart:c[1]||(c[1]=m=>$.value=!0),onEnd:c[2]||(c[2]=m=>$.value=!1),tag:"tbody",class:"lkt-sortable-table",handle:"[data-handle-drag]"},{item:e.withCtx(({element:m,index:f})=>[(e.openBlock(),e.createBlock(K,{key:e.unref(N)+"-"+f,i:f,item:m,"display-hidden-columns-indicator":D.value,"is-draggable":t.draggableChecker?t.draggableChecker(m):!0,sortable:t.sortable,"visible-columns":w.value,"empty-columns":L.value,"hidden-is-visible":x(f),onClick:H,onShow:O},e.createSlots({_:2},[e.renderList(F.value,h=>({name:h,fn:e.withCtx(p=>[e.renderSlot(r.$slots,h,{item:p.item,value:p.value,column:p.column})])}))]),1032,["i","item","display-hidden-columns-indicator","is-draggable","sortable","visible-columns","empty-columns","hidden-is-visible"]))]),_:3},8,["modelValue","move","itemKey"])):(e.openBlock(),e.createElementBlock("tbody",Be,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(m,f)=>(e.openBlock(),e.createBlock(K,{key:e.unref(N)+"-"+f,i:f,item:m,"display-hidden-columns-indicator":D.value,"is-draggable":t.draggableChecker?t.draggableChecker(m):!0,sortable:t.sortable,"visible-columns":w.value,"empty-columns":L.value,"hidden-is-visible":x(f),onClick:H,onShow:O,onEdited:Ie},e.createSlots({_:2},[e.renderList(F.value,h=>({name:h,fn:e.withCtx(p=>[e.renderSlot(r.$slots,h,{item:p.item,value:p.value,column:p.column})])}))]),1032,["i","item","display-hidden-columns-indicator","is-draggable","sortable","visible-columns","empty-columns","hidden-is-visible"]))),128)),T.value.length>0?(e.openBlock(!0),e.createElementBlock(e.Fragment,{key:0},e.renderList(d.value,(m,f)=>(e.openBlock(),e.createBlock(he,{key:e.unref(N)+"-"+f,i:f,item:m,"hidden-columns":T.value,"hidden-columns-col-span":we.value,"is-draggable":t.draggableChecker?t.draggableChecker(m):!0,sortable:t.sortable,"visible-columns":w.value,"empty-columns":L.value,"hidden-is-visible":x(f),onClick:H,onShow:O},e.createSlots({_:2},[e.renderList(F.value,h=>({name:h,fn:e.withCtx(p=>[e.renderSlot(r.$slots,h,{item:p.item,value:p.value,column:p.column})])}))]),1032,["i","item","hidden-columns","hidden-columns-col-span","is-draggable","sortable","visible-columns","empty-columns","hidden-is-visible"]))),128)):e.createCommentVNode("",!0)]))])],8,be)):r.$slots["no-items"]?(e.openBlock(),e.createElementBlock("div",Ve,[e.renderSlot(r.$slots,"no-items")])):e.createCommentVNode("",!0)}}),Ne={install:t=>{t.component("lkt-table",Se)}};u.createCheckColumn=G,u.createColumn=z,u.createHiddenColumn=X,u.createLinkColumn=J,u.createSelectColumn=W,u.createSwitchColumn=Q,u.createTextColumn=P,u.default=Ne,Object.defineProperties(u,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
