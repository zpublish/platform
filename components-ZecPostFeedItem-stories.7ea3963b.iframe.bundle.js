"use strict";(self.webpackChunk_zpublish_web=self.webpackChunk_zpublish_web||[]).push([[40],{"./stories/components/ZecPostFeedItem.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>ZecPostFeedItem_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),lib=__webpack_require__("./node_modules/@zpublish/components/lib/index.js");const zecpages_feed_namespaceObject=JSON.parse('[{"id":1840,"memo":"Zcash\'s power is shielded rn,\\nZoonTM to be disclosed.\\n\\nMay the fox\'s be with you.","datetime":"1650120036736","amount":100000,"txid":"8dc21cc232356ba740f682d93739a062d51450649346def32e8646c1102897ad","likes":0,"reply_zaddr":null,"reply_to_post":null,"reply_count":0,"ispoll":false,"board_name":null,"board_zaddr":null,"username":null}]');var _Default$parameters,_Default$parameters2,console=__webpack_require__("./node_modules/console-browserify/index.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var feedItem=zecpages_feed_namespaceObject[0];console.log({feedItem});const ZecPostFeedItem_stories={component:lib.lV,title:"Components/ZecPostFeedItem",tags:["autodocs"]};var Default={args:{item:new Date(Number(feedItem.datetime)),replyToPostId:feedItem.reply_to_post,text:feedItem.memo,replyCount:feedItem.replyCount,likeCount:feedItem.likes,id:feedItem.id,mb:16}};Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    item: new Date(Number(feedItem.datetime)),\n    replyToPostId: feedItem.reply_to_post,\n    text: feedItem.memo,\n    // @ts-ignore\n    replyCount: feedItem.replyCount,\n    likeCount: feedItem.likes,\n    id: feedItem.id,\n    // @ts-ignore\n    mb: 16\n  }\n}"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2=_Default$parameters2.docs)||void 0===_Default$parameters2?void 0:_Default$parameters2.source)})})}}]);