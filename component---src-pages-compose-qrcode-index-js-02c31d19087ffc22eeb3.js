(self.webpackChunkweb=self.webpackChunkweb||[]).push([[174,242],{4269:function(e,t,o){"use strict";o.r(t);var r=o(7294),l=o(4851),i=o(4159),n="defs",a="g",c="rect",d="clipPath",g="stop";t.default=function(e){var t=e.value,o=void 0===t?"hello world":t,u=e.size,h=void 0===u?100:u,s=e.color,f=void 0===s?"black":s,p=e.style,v=e.backgroundColor,E=void 0===v?"white":v,m=e.logo,y=e.logoSize,k=void 0===y?.2*h:y,w=e.logoBackgroundColor,b=void 0===w?"transparent":w,x=e.logoMargin,z=void 0===x?2:x,C=e.logoBorderRadius,M=void 0===C?0:C,B=e.quietZone,R=void 0===B?0:B,S=e.enableLinearGradient,L=void 0!==S&&S,A=e.gradientDirection,G=void 0===A?["0%","0%","100%","100%"]:A,P=e.linearGradient,O=void 0===P?["rgb(255,0,0)","rgb(0,255,255)"]:P,j=e.ecl,q=void 0===j?"M":j,D=e.getRef,W=e.onError,Y=(0,r.useMemo)((function(){try{return(0,i.default)((0,l.default)(o,q),h)}catch(e){if(!W||"function"!=typeof W)throw e;W(e)}}),[o,h,q]);if(!Y)return null;var Z=Y.path,F=Y.cellSize;return r.createElement("svg",{ref:D,viewBox:[-R,-R,h+2*R,h+2*R].join(" "),width:h,height:h,style:p},r.createElement(n,null,r.createElement("linearGradient",{id:"grad",x1:G[0],y1:G[1],x2:G[2],y2:G[3]},r.createElement(g,{offset:"0",stopColor:O[0],stopOpacity:"1"}),r.createElement(g,{offset:"1",stopColor:O[1],stopOpacity:"1"}))),r.createElement(a,null,r.createElement(c,{x:-R,y:-R,width:h+2*R,height:h+2*R,fill:E})),r.createElement(a,null,r.createElement("path",{d:Z,strokeLinecap:"butt",stroke:L?"url(#grad)":f,strokeWidth:F})),m&&function(e){var t=e.size,o=e.logo,l=e.logoSize,i=e.logoBackgroundColor,g=e.logoMargin,u=e.logoBorderRadius,h=(t-l-2*g)/2,s=l+2*g,f=u+g/l*u;return r.createElement(a,{x:h,y:h},r.createElement(n,null,r.createElement(d,{id:"clip-logo-background"},r.createElement(c,{width:s,height:s,rx:f,ry:f})),r.createElement(d,{id:"clip-logo"},r.createElement(c,{width:l,height:l,rx:u,ry:u}))),r.createElement(a,null,r.createElement(c,{width:s,height:s,fill:i,clipPath:"url(#clip-logo-background)"})),r.createElement(a,{x:g,y:g},r.createElement("image",{width:l,height:l,preserveAspectRatio:"xMidYMid slice",href:o,clipPath:"url(#clip-logo)"})))}({size:h,logo:m,logoSize:k,logoBackgroundColor:b,logoMargin:z,logoBorderRadius:M}))}},4159:function(e,t,o){"use strict";o.r(t),t.default=function(e,t){var o=t/e.length,r="";return e&&Array.isArray(e)?(e.forEach((function(t,l){var i=!1;t.forEach((function(t,n){t?(i||(r+="M"+o*n+" "+(o/2+o*l)+" ",i=!0),i&&n===e.length-1&&(r+="L"+o*(n+1)+" "+(o/2+o*l)+" ")):i&&(r+="L"+o*n+" "+(o/2+o*l)+" ",i=!1)}))})),{cellSize:o,path:r}):{}}}}]);
//# sourceMappingURL=component---src-pages-compose-qrcode-index-js-02c31d19087ffc22eeb3.js.map