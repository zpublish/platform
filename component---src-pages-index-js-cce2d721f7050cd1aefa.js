/*! For license information please see component---src-pages-index-js-cce2d721f7050cd1aefa.js.LICENSE.txt */
(self.webpackChunkweb=self.webpackChunkweb||[]).push([[678],{9756:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}n.d(t,{Z:function(){return r}})},2945:function(e,t){"use strict";var n="function"==typeof Symbol&&Symbol.for,r=n?Symbol.for("react.element"):60103,i=n?Symbol.for("react.portal"):60106,o=n?Symbol.for("react.fragment"):60107,c=n?Symbol.for("react.strict_mode"):60108,l=n?Symbol.for("react.profiler"):60114,a=n?Symbol.for("react.provider"):60109,u=n?Symbol.for("react.context"):60110,s=n?Symbol.for("react.async_mode"):60111,f=n?Symbol.for("react.concurrent_mode"):60111,h=n?Symbol.for("react.forward_ref"):60112,d=n?Symbol.for("react.suspense"):60113,p=n?Symbol.for("react.suspense_list"):60120,g=n?Symbol.for("react.memo"):60115,m=n?Symbol.for("react.lazy"):60116,x=n?Symbol.for("react.block"):60121,v=n?Symbol.for("react.fundamental"):60117,y=n?Symbol.for("react.responder"):60118,b=n?Symbol.for("react.scope"):60119;function w(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case s:case f:case o:case l:case c:case d:return e;default:switch(e=e&&e.$$typeof){case u:case h:case m:case g:case a:return e;default:return t}}case i:return t}}}function j(e){return w(e)===f}t.ForwardRef=h,t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===o||e===f||e===l||e===c||e===d||e===p||"object"==typeof e&&null!==e&&(e.$$typeof===m||e.$$typeof===g||e.$$typeof===a||e.$$typeof===u||e.$$typeof===h||e.$$typeof===v||e.$$typeof===y||e.$$typeof===b||e.$$typeof===x)}},8920:function(e,t,n){"use strict";e.exports=n(2945)},6608:function(e,t,n){e.exports=n(6530)},6530:function(e){var t={generateRectangles:function(e){if(!e.dimensions)throw new Error("No dimensions option given for Masonry Layout");return e.gutter=e.gutter||0,e.gutterX=e.gutterX||e.gutter,e.gutterY=e.gutterY||e.gutter,e.width=e.width||800,e.columns=e.columns||3,e.maxHeight=e.maxHeight||0,e.customize=e.customize||function(e){return e},void 0===e.collapsing&&(e.collapsing=!0),void 0===e.centering&&(e.centering=!1),e.dimensions.map(t.__scaleRectangles(e.columns,e.width,e.gutterX,e.maxHeight)).map(t.__prepareCustomize(e.customize,e)).map(t.__translateRectanglesForNColumns(e.columns,e.width,e.gutterX,e.gutterY,e.collapsing)).map(t.__centerRectangles(e.centering,e.columns,e.width,e.gutterX))},__prepareCustomize:function(e,t){return function(n,r,i){return e(n,r,i,t)}},__translateRectanglesForNColumns:function(e,n,r,i,o,c){return function(c,l,a){if(l){if(l<e)return c=t.__placeRectangleAt(c,t.__widthSingleColumn(e,n,r)*l+r*l,0);if(o)var u=t.__placeAfterRectangle(a.slice(0,l),i,o,e,l);else u=t.__placeAfterRectangle(a.slice(0,l-l%e),i,o,e,l);return c=t.__placeRectangleAt(c,u.x,u.height)}return c=t.__placeRectangleAt(c,0,0,i)}},__scaleRectangles:function(e,n,r,i){return function(o){var c=o.width/o.height,l=t.__widthSingleColumn(e,n,r),a=l/c;return i&&i<a&&(a=i),{width:Math.floor(l),height:Math.floor(a),x:0,y:0}}},__centerRectangles:function(e,n,r,i){var o=t.__widthSingleColumn(n,r,i);return function(t,r,c){return n<=c.length||!e||(t.x+=(n-c.length)*o/2+(n-c.length)*i/2),t}},__placeRectangleAt:function(e,t,n){return Object.assign(e,{x:t,y:n})},__rectanglesToColumns:function(e,t){function n(e){return function(t){return t===e}}var r=e.reduce((function(e,t,r,i){return~e.findIndex(n(t.x))||e.push(t.x),e}),[]);return e.reduce((function(e,i,o,c){var l=r.findIndex(n(i.x));return e[l]?e[l].height=i.y+i.height+t:(e[l]=Object.assign({},i),e[l].height+=t),e}),[])},__placeAfterRectangle:function(e,n,r,i,o){var c=t.__rectanglesToColumns(e,n),l=c.sort((function(e,t){return e.height-t.height})).map((function(e){return Object.assign({},e)})),a=c.sort((function(e,t){return t.height-e.height})).map((function(e){return Object.assign({},e)}));c.sort((function(e,t){return e.x-t.x})).map((function(e){return Object.assign({},e)}));return r?l[0]:{x:c[o%i].x,y:0,width:a[o%i].width,height:a[0].height}},__widthSingleColumn:function(e,t,n){return(t+=n)/e-n}};e.exports?e.exports=t:window.SimpleMasonry=t},3846:function(e,t,n){"use strict";var r=n(5893),i=n(9490),o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n},l=function(e){var t=c(e,[]);return(0,r.jsx)(i.xu,o({width:48,height:48,px:"4px",py:"6px",justifyContent:"space-between"},t,{children:new Array(3).fill(null).map((function(e,t){return(0,r.jsx)(i.x1,{bg:"black",height:"4px",width:"40px"},t)}))}),void 0)},a=(0,i.l7)(i.xv,(function(){return{color:"black",ml:16,fontFamily:"IBM Plex Serif",bold:!0,fontSize:28,lineHeight:32}}));a.defaultProps={children:"Microblog App"};var u=function(){return(0,r.jsx)(i.xu,{flex:1},void 0)},s=function(e){var t=e.children,n=void 0===t?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l,{},void 0),(0,r.jsx)(a,{},void 0),(0,r.jsx)(u,{},void 0)]},void 0):t;return(0,r.jsx)(i.X2,o({p:16,alignItems:"center",justifyContent:"space-between"},{children:n}),void 0)};s.MenuIcon=l,s.Title=a,s.Fill=u,t.Z=s},4690:function(e,t,n){"use strict";var r=n(5893),i=n(9490),o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n},l=function(e){var t=e.p,n=void 0===t?[16,40,0]:t,l=e.pt,a=void 0===l?40:l,u=e.pb,s=void 0===u?40:u,f=e.children,h=c(e,["p","pt","pb","children"]);return(0,r.jsx)(i.xu,o({as:"section",p:n,pt:a,pb:s},h,{children:(0,r.jsx)(i.xu,o({width:"100%",maxWidth:1024,alignSelf:"center"},{children:f}),void 0)}),void 0)};l.Title=function(e){return(0,r.jsx)(i.s0.H5,o({name:"SectionTitle",mb:3,bold:!0},e),void 0)},t.Z=l},3265:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var r=n(7294),i=(n(5444),n(1775)),o=n(9756),c=n(6608),l=n.n(c),a=n(9490),u=["p","pt","pb","children"],s=function(e){var t=e.p,n=void 0===t?[16,40,0]:t,i=e.pt,c=void 0===i?40:i,l=e.pb,s=void 0===l?40:l,f=e.children,h=(0,o.Z)(e,u);return r.createElement(a.xu,Object.assign({as:"section",p:n,pt:c,pb:s},h),r.createElement(a.xu,{width:"100%",maxWidth:1024,alignSelf:"center"},f))};s.Title=function(e){return r.createElement(a.s0.H5,Object.assign({name:"SectionTitle",mb:3,bold:!0},e))};var f=s,h=["src","x","y","height","width","i"],d=["children","color"],p=function(e){var t=e.src,n=e.x,i=e.y,c=e.height,l=e.width;e.i,(0,o.Z)(e,h);return r.createElement(a.xu,{position:"absolute",top:i,left:n,width:l,height:c},r.createElement(a.Ee,{src:t,style:{flex:1},resizeMode:"contain"}))},g=function e(t){var n=t.images,i=void 0===n?[]:n,o=t.columns,c=void 0===o?3:o,u=t.gutter,s=void 0===u?8:u,f=(t.maxHeight,t.collapsing,t.customize,t.centering,t.viewport,t.width||(0,a.dz)().width),h=(0,a.$Y)().breakpoint;0===h&&(f-=32,c=2),1===h&&(f-=80,c=3),2===h&&(f=1024,c=4);var d,g=i.map((function(e){return{width:e.width,height:e.height}})),m=(d={dimensions:g,columns:c,width:f,gutter:s},l().generateRectangles(d)),x=m[m.length-1],v=(null==x?void 0:x.y)+(null==x?void 0:x.height);return r.createElement(a.X2,{height:v,width:"100%",name:e.name,justifyContent:"space-between"},i.map((function(e,t){var n=e.url,i=e.id,o=m[t],c=o.x,l=o.y,a=o.width,u=o.height;return r.createElement(r.Fragment,{key:i},function(e,t){var n=e.url,i=e.x,o=e.y,c=e.width,l=e.height;return r.createElement(p,{key:n,src:n,x:i,y:o,height:l,width:c,i:t})}({url:n,x:c,y:l,width:a,height:u},t))})))},m=function(e){var t=e.images,n=e.width,i=e.viewport,o=void 0===i?{height:"100vh",width:"100vw"}:i;return r.createElement(a.xu,{bg:"white",minHeight:o.height,width:"100%"},r.createElement(a.xu,{bg:"white"},r.createElement(f,{pt:16,justifyContent:"center"},r.createElement(a.xu,{position:"relative"},r.createElement(g,{images:t,width:n})))))};m.InstagramButton=function(e){var t=e.children,n=void 0===t?"SEE MORE ON INSTAGRAM":t,i=e.color,c=void 0===i?"#0057FF":i,l=(0,o.Z)(e,d);return r.createElement(a.xu,Object.assign({borderWidth:2,borderColor:c,flex:1,p:16,alignItems:"center",justifyContent:"center"},l),r.createElement(a.xv,{color:c,fontFamily:"Roboto",fontSize:28,lineHeight:36,center:!0,bold:!0},n))};var x=m,v=n(5127),y=n(6179),b=n(1179),w=n(3846),j=n(5893),_=n(7740),O=function(){return(O=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},S=function(){return(0,j.jsx)(a.xu,O({alignItems:"center",p:32},{children:(0,j.jsx)(a.X2,{children:(0,j.jsxs)(a.xv,O({fontFamily:"Roboto",fontSize:16},{children:["© ",(new Date).getFullYear()," Microblog App"]}),void 0)},void 0)}),void 0)},E=function(){return(E=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},C=function(){return(0,j.jsx)(_.Svg,E({width:"48px",height:"48px",viewBox:"0 0 48 48"},{children:(0,j.jsx)(_.G,E({stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},{children:(0,j.jsx)(_.G,E({transform:"translate(-16.000000, -16.000000)"},{children:(0,j.jsxs)(_.G,E({transform:"translate(16.000000, 16.000000)"},{children:[(0,j.jsx)(_.Rect,{x:"0",y:"0",width:"48",height:"48"},void 0),(0,j.jsx)(_.G,E({transform:"translate(24.000000, 24.000000) rotate(-315.000000) translate(-24.000000, -24.000000) translate(4.000000, 22.000000)",fill:"#000000"},{children:(0,j.jsx)(_.Rect,{x:"0",y:"0",width:"40",height:"4"},void 0)}),void 0),(0,j.jsx)(_.G,E({transform:"translate(8.443651, 8.443651)",fill:"#000000"},{children:(0,j.jsx)(_.Rect,{transform:"translate(15.556349, 15.556349) rotate(-45.000000) translate(-15.556349, -15.556349) ",x:"-4.44365081",y:"13.5563492",width:"40",height:"4"},void 0)}),void 0)]}),void 0)}),void 0)}),void 0)}),void 0)},R=function(e){var t=e.onMenuClick;return console.log({onMenuClick:t}),(0,j.jsxs)(a.xu,E({flex:1},{children:[(0,j.jsxs)(w.Z,{children:[(0,j.jsx)(a.xu,E({onClick:t},{children:(0,j.jsx)(C,{},void 0)}),void 0),(0,j.jsx)(w.Z.Title,{},void 0),(0,j.jsx)(w.Z.Fill,{},void 0)]},void 0),(0,j.jsx)(a.xu,E({flex:1,justifyContent:"center",alignItems:"center"},{children:["Home","Instagram","About","Contact"].map((function(e){return(0,j.jsx)(a.xu,E({p:20},{children:(0,j.jsx)(a.xv,E({color:"black",fontSize:32,fontFamily:"Roboto",bold:!0},{children:null==e?void 0:e.toUpperCase()}),void 0)}),void 0)}))}),void 0),(0,j.jsx)(S,{},void 0)]}),void 0)},$=n(4690),k=function(){var e=(0,b.Z)(),t=(0,r.useState)(!1),n=t[0],o=t[1];return r.createElement(v.Z,null,r.createElement(y.Z,{title:"Home | Microblog App"}),r.createElement(i.xu,{bg:"white",minHeight:e.height,width:"100%"},r.createElement(i.xu,{bg:"white"},r.createElement(w.Z,null,r.createElement(w.Z.MenuIcon,{onClick:function(){o(!n)}}),r.createElement(w.Z.Title,null),r.createElement(w.Z.Fill,null)),r.createElement($.Z,{pt:"8px"},r.createElement("a",{href:"./compose/post"},r.createElement(x.InstagramButton,null,"Create Post"))),r.createElement(S,null),n&&r.createElement(i.xu,{position:"fixed",bg:"white",width:"100vw",height:"100vh"},r.createElement(R,{onMenuClick:function(){o(!n)}})))))}},5881:function(){}}]);
//# sourceMappingURL=component---src-pages-index-js-cce2d721f7050cd1aefa.js.map