!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("LazyLoad",[],e):"object"==typeof exports?exports.LazyLoad=e():t.LazyLoad=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){const r=n(1);class i{constructor(t){this.opts=t,this.checkOpts();const{selectors:e}=t;this.elements={},e.forEach(t=>{[...document.querySelectorAll(t)].forEach(t=>{this.elements[t.dataset.src]=t})});let n=this;this.lazyEventListener=()=>{n.lazyLoad()},window.addEventListener("resize",this.lazyEventListener),window.addEventListener("scroll",this.lazyEventListener)}checkOpts(){const t=r.checkObj(this.opts,{selectors:t=>r.isArrayOf(t,r.isString),loadHandler:t=>r.isOr(r.isUndefined(t),r.isFunction(t)),errorHandler:t=>r.isOr(r.isUndefined(t),r.isFunction(t)),advance:t=>r.isOr(r.isUndefined(t),r.isNumber(t)),setNaturalSizeAfterLoad:t=>r.isOr(r.isUndefined(t),r.isBool(t))});r.assert(t.result,t.status),r.setObjDefault(this.opts,"advance",i.ADVANCE_DEFAULT),r.setObjDefault(this.opts,"setNaturalSizeAfterLoad",i.SET_NATURAL_SIZE_AFTER_LOAD_DEFAULT)}lazyLoad(){const{loadHandler:t,errorHandler:e,advance:n,setNaturalSizeAfterLoad:r}=this.opts;for(let i in this.elements){const o=this.elements[i];if(s(o,n)){delete this.elements[i];let n=t(o);o.onload=()=>{r&&(o.naturalHeight&&(o.style.height=o.naturalHeight+"px"),o.naturalWidth&&(o.style.width=o.naturalWidth+"px")),n&&n()},o.onerror=()=>{n&&n(),e&&e(o)},o.src=o.dataset.src}}0===this.elements.length&&(window.removeEventListener("resize",this.lazyEventListener),window.removeEventListener("scroll",this.lazyEventListener))}static buildDefaultLoadHandler(t,e){return function(n){let r=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div");r.classList.add(t),i.classList.add(e),r.style.position="relative",s.style.position="absolute",s.style.top="50%",s.style.left="50%",s.style.transform="translate(-50%, -50%)";let o=getComputedStyle(i);s.style.width=o.width,s.style.height=o.height,r.append(s),s.append(i),n.parentNode&&n.parentNode.replaceChild(r,n),r.append(n);const a=n.style.visibility;return n.style.visibility="hidden",function(){r.parentNode&&r.parentNode.replaceChild(n,r),n.style.visibility=a}}}}i.ADVANCE_DEFAULT=50,i.SET_NATURAL_SIZE_AFTER_LOAD_DEFAULT=!0;function s(t,e=0){let n=t.getBoundingClientRect();return!!(n.top<window.innerHeight+e&&n.left<window.innerWidth+e&&n.bottom>0-e&&n.right>0-e)}t.exports={LazyLoader:i,UnlazyLoader:class{static unlazy(t){const{selectors:e,setNaturalSizeAfterLoad:n}=t;e.forEach(t=>{[...document.querySelectorAll(t)].forEach(t=>{t.onload=()=>{(n||void 0===n)&&(t.naturalHeight&&(t.style.height=t.naturalHeight+"px"),t.naturalWidth&&(t.style.width=t.naturalWidth+"px"))},t.src=t.dataset.src,t.removeAttribute("data-src")})})}},isElementVisible:s,throttle:function(t,e){let n=0;return function(){let r=Date.now();r-n>e&&(t.apply(null,arguments),n=r)}}}},function(t,e){class n{static isString(t){return"string"==typeof t||t instanceof String}static isNumber(t){return"number"==typeof t||t instanceof Number}static isFiniteNumber(t){return this.isNumber(t)&&isFinite(t)}static isArray(t){return t.constructor===Array}static isFunction(t){return t.constructor===Function}static isObject(t){return"object"==typeof t}static isNull(t){return null===t}static isUndefined(t){return void 0===t}static isBool(t){return"boolean"==typeof t||t instanceof Boolean}static isSymbol(t){return"symbol"==typeof t||t instanceof Symbol}static objectKeysContain(t,e){return e in t}static objectValuesContain(t,e){return-1!==Object.values(t).indexOf(e)}static isElement(t){return t instanceof Element||t instanceof HTMLDocument}static isDefined(t){return void 0!==t}static isArrayOf(t,e){return n.isAnd(n.isArray(t),0!==t.length,t.every(t=>e(t)))}static assert(t,e){if(!this.isBool(t))throw new Error("assert() - not boolean in arguments");if(!1===t)throw new Error("assert() - fail: "+e)}static assertAnd(){if(0===arguments.length)return;let t=this.isString(arguments[arguments.length-1]),e=t?arguments[arguments.length-1]:"",n=t?arguments.length-1:arguments.length;for(let t=0;t<n;++t){if(!this.isBool(arguments[t]))throw new Error("assertAnd() - not boolean in arguments");if(!0!==arguments[t])throw new Error("assertAnd() - fail at argument "+t+": "+e)}}static isAnd(){for(let t=0;t<arguments.length;++t)if(!0!==arguments[t])return!1;return!0}static assertOr(){if(0===arguments.length)return;let t=this.isString(arguments[arguments.length-1]),e=t?arguments[arguments.length-1]:"",n=t?arguments.length-1:arguments.length;for(let t=0;t<n;++t){if(!this.isBool(arguments[t]))throw new Error("assertOr() - not boolean in arguments");if(!0===arguments[t])return}throw new Error("assertOr() - fail at argument "+i+": "+e)}static isOr(){for(let t=0;t<arguments.length;++t)if(!0===arguments[t])return!0;return!1}static setObjDefault(t,e,n){return e in t||(t[e]=n),t}static checkObj(t,e){let n=0;for(let r in e){if(!e[r](t[r]))return{result:!1,status:`Rule number ${n} is not correct`};++n}return{result:!0,status:"ok"}}}t.exports=n}])}));