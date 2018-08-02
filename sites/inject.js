

/* global define */
(function (root, factory) {
  window.YNBrowser = window.YNBrowser || {};
  YNBrowser.compareVersion = factory();
}(window, function () {

  var semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

  function indexOrEnd(str, q) {
    return str.indexOf(q) === -1 ? str.length : str.indexOf(q);
  }

  function split(v) {
    var c = v.replace(/^v/, '').replace(/\+.*$/, '');
    var patchIndex = indexOrEnd(c, '-');
    var arr = c.substring(0, patchIndex).split('.');
    arr.push(c.substring(patchIndex + 1));
    return arr;
  }

  function tryParse(v) {
    return isNaN(Number(v)) ? v : Number(v);
  }

  function validate(version) {
    if (typeof version !== 'string') {
      throw new TypeError('Invalid argument expected string');
    }
    if (!semver.test(version)) {
      throw new Error('Invalid argument not valid semver');
    }
  }

  return function compareVersions(v1, v2) {
    [v1, v2].forEach(validate);

    var s1 = split(v1);
    var s2 = split(v2);

    for (var i = 0; i < Math.max(s1.length - 1, s2.length - 1); i++) {
      var n1 = parseInt(s1[i] || 0, 10);
      var n2 = parseInt(s2[i] || 0, 10);

      if (n1 > n2) return 1;
      if (n2 > n1) return -1;
    }

    var sp1 = s1[s1.length - 1];
    var sp2 = s2[s2.length - 1];

    if (sp1 && sp2) {
      var p1 = sp1.split('.').map(tryParse);
      var p2 = sp2.split('.').map(tryParse);

      for (i = 0; i < Math.max(p1.length, p2.length); i++) {
        if (p1[i] === undefined || typeof p2[i] === 'string' && typeof p1[i] === 'number') return -1;
        if (p2[i] === undefined || typeof p1[i] === 'string' && typeof p2[i] === 'number') return 1;

        if (p1[i] > p2[i]) return 1;
        if (p2[i] > p1[i]) return -1;
      }
    } else if (sp1 || sp2) {
      return sp1 ? -1 : 1;
    }

    return 0;
  };

}));

!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){"use strict";var o,r=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var i,a=n(4),s={};function c(){return i}e.setNativeImplement=function(t){i=t},e.getNative=c,e.addJSModule=function(t,e){s[t]=e};var u=function(){function t(){var t=this;this.nativeEvent=new a.default,this._idSeed=1,this._handles={},this._jsModules={},Object.keys(s).forEach(function(e){var n=s[e];t.addJSModule(e,n)})}return t.prototype._genHandleId=function(){return"BridgeHandle_"+this._idSeed++},t.prototype.callNative=function(t){var e=this;return new Promise(function(n,o){var r=t.handleId||e._genHandleId();e._handles[r]=function(t){200===t.ec?n(t):o(t)},t.handleId=r,e.callNativeInternal(t)})},t.prototype.callNativeFlat=function(t,e,n){return this.callNative({module:t,method:e,args:n||{}})},t.prototype.callNativeSync=function(t,e,n){return this.callNativeInternalSync({module:t,method:e,args:n})},t.prototype.callJS=function(t){var e=this,n=this._jsModules[t.module][t.method](t.args);Promise.resolve(n).then(function(n){e.callNative({module:"JSCallback",method:"callback",handleId:t.handleId,args:n})})},t.prototype.addJSModule=function(t,e){this._jsModules[t]=e},t.prototype.handleNativeResponse=function(t){var e=this._handles[t.handleId];e&&(delete this._handles[t.handleId],e(t))},t.prototype.handleNativeEvent=function(t,e){this.nativeEvent.emit(t,e)},t.prototype.handleModuleEvent=function(t,e,n){this._jsModules[t].emit(e,n)},t}();e.Native=u;var l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),Object.defineProperty(e.prototype,"native",{get:function(){return c()},enumerable:!0,configurable:!0}),e}(a.default);e.ModuleBase=l},function(t,e,n){"use strict";var o,r=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.post=function(t){return this.native.callNativeFlat("Analysis","post",t)},e}(i.ModuleBase);e.AnalysisModule=a,e.Analysis=new a,i.addJSModule("Analysis",e.Analysis)},function(t,e,n){"use strict";var o,r=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.actionSheet=function(t){return this.native.callNativeFlat("UI","actionSheet",{items:t})},e.prototype.toast=function(t){return"string"==typeof t&&(t={message:t}),this.native.callNativeFlat("UI","toast",t)},e.prototype.alert=function(t){return"string"==typeof t?this.native.callNativeFlat("UI","alert",{message:t}):this.native.callNativeFlat("UI","alert",t)},e.prototype.confirm=function(t){return"string"==typeof t?this.native.callNativeFlat("UI","confirm",{message:t}):this.native.callNativeFlat("UI","confirm",t)},e.prototype.input=function(t){return void 0===t&&(t=16),this.native.callNativeFlat("UI","input",{maxLength:t})},e.prototype.showLoading=function(t){this.native.callNativeFlat("UI","showLoading",{title:t})},e.prototype.hideLoading=function(){this.native.callNativeFlat("UI","hideLoading")},e}(i.ModuleBase);e.UIModule=a,e.UI=new a,i.addJSModule("UI",e.UI)},function(t,e,n){"use strict";var o,r=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.download=function(t){var e=t;return Array.isArray(t)&&(e={items:t}),this.native.callNative({module:"Browser",method:"download",args:e})},e.prototype.saveToSystemAlbum=function(t){return this.native.callNative({module:"Browser",method:"saveToSystemAlbum",args:t})},e}(i.ModuleBase);e.BrowserModule=a,e.Browser=new a,i.addJSModule("Browser",e.Browser)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=Object.prototype.hasOwnProperty,r="~";function i(){}function a(t,e,n,o,i){var a=new function(t,e,n){this.fn=t,this.context=e,this.once=n||!1}(n,o||t,i),s=r?r+e:e;return t._events[s]?t._events[s].fn?t._events[s]=[t._events[s],a]:t._events[s].push(a):(t._events[s]=a,t._eventsCount++),t}function s(t,e){0==--t._eventsCount?t._events=new i:delete t._events[e]}function c(){this._events=new i,this._eventsCount=0}Object.create&&(i.prototype=Object.create(null),(new i).__proto__||(r=!1)),c.prototype.eventNames=function(){var t,e,n=[];if(0===this._eventsCount)return n;for(e in t=this._events)o.call(t,e)&&n.push(r?e.slice(1):e);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(t)):n},c.prototype.listeners=function(t,e){var n=r?r+t:t,o=this._events[n];if(e)return!!o;if(!o)return[];if(o.fn)return[o.fn];for(var i=0,a=o.length,s=new Array(a);i<a;i++)s[i]=o[i].fn;return s},c.prototype.emit=function(t,e,n,o,i,a){var s=r?r+t:t;if(!this._events[s])return!1;var c,u,l=this._events[s],f=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),f){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,n),!0;case 4:return l.fn.call(l.context,e,n,o),!0;case 5:return l.fn.call(l.context,e,n,o,i),!0;case 6:return l.fn.call(l.context,e,n,o,i,a),!0}for(u=1,c=new Array(f-1);u<f;u++)c[u-1]=arguments[u];l.fn.apply(l.context,c)}else{var p,d=l.length;for(u=0;u<d;u++)switch(l[u].once&&this.removeListener(t,l[u].fn,void 0,!0),f){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,e);break;case 3:l[u].fn.call(l[u].context,e,n);break;case 4:l[u].fn.call(l[u].context,e,n,o);break;default:if(!c)for(p=1,c=new Array(f-1);p<f;p++)c[p-1]=arguments[p];l[u].fn.apply(l[u].context,c)}}return!0},c.prototype.on=function(t,e,n){return a(this,t,e,n,!1)},c.prototype.once=function(t,e,n){return a(this,t,e,n,!0)},c.prototype.removeListener=function(t,e,n,o){var i=r?r+t:t;if(!this._events[i])return this;if(!e)return s(this,i),this;var a=this._events[i];if(a.fn)a.fn!==e||o&&!a.once||n&&a.context!==n||s(this,i);else{for(var c=0,u=[],l=a.length;c<l;c++)(a[c].fn!==e||o&&!a[c].once||n&&a[c].context!==n)&&u.push(a[c]);u.length?this._events[i]=1===u.length?u[0]:u:s(this,i)}return this},c.prototype.removeAllListeners=function(t){var e;return t?(e=r?r+t:t,this._events[e]&&s(this,e)):(this._events=new i,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prototype.setMaxListeners=function(){return this},c.prefixed=r,e.default=c},function(t,e,n){"use strict";var o,r=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var i=n(0);!function(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}(n(0));var a="undefined"==typeof window?{}:window;e.isUneedWebView=a.isUneedWebView||a.navigator&&a.navigator.userAgent&&a.navigator.userAgent.indexOf("UneedWebView");var s=a.navigator.userAgent,c=a.androidBridge||/UNWebView\/android/.test(s),u=(c&&/UNWebView\/android\/lowLevelBridge/.test(s),function(t){function e(){var e=t.call(this)||this;return a.onNativeMessage=function(t){return e.handleNativeResponse(t)},a.onNativeEvent=function(t,n){return e.handleNativeEvent(t,n)},a.onModuleEvent=function(t,n,o){return e.handleModuleEvent(t,n,o)},a.callJS=function(t){return e.callJS(t)},e}return r(e,t),e.prototype.callNativeInternal=function(t){if(c){var e=JSON.stringify(t);return a.androidBridge.exec(e)}if(a.webkit&&a.webkit.messageHandlers)return a.webkit.messageHandlers.defaultHandler.postMessage(t);if(a.UIWebViewJSBridge)return a.UIWebViewJSBridge.callNative(JSON.stringify(t));var n=document.createElement("iframe");n.style.width="1px",n.style.height="1px",n.style.display="none",n.src="yunijs://callNative?args="+JSON.stringify(t),document.body.appendChild(n),setTimeout(function(){n.remove()},100)},e.prototype.callNativeInternalSync=function(t){},e}(i.Native));e.WebViewNative=u,e.native=new u,e.nativeEvent=e.native.nativeEvent,i.setNativeImplement(e.native)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(3),i=n(2),a=n(1),s=window;s.JSBridge=o,Object.assign(s.JSBridge,r),Object.assign(s.JSBridge,i),Object.assign(s.JSBridge,a)}]);

/**
 * 这里是inject.js 核心代码部分，主要完成以下事情：
 * 1. 加载jquery.js
 * 2. 同时加载匹配的css/js
 * 3. 完成后调用YNBrowser.readyCallback
 * 
 */
(function() {

    window.YNBrowser = window.YNBrowser || {};

    var jQuery = window.jQuery;

    // 常规的importJS
    function importJS(libs, cb) {
        if (!libs.length || libs.length == 0) return;
        let loaded = 0;
        let error = false

        libs.forEach(function(url) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = url;
            script.charset='utf-8'
            script.onload = function(e) {
                loaded++;
                if (loaded == libs.length) {
                    cb && cb(error);
                }
            }
            script.onerror = function(e) {
                loaded ++
                error = true
                if (loaded == libs.length) {
                    cb && cb(error);
                }
            }
            document.body.appendChild(script);
        })
    }

    YNBrowser.importJS = importJS
    YNBrowser.isReady = false
    YNBrowser.readyCallbacks = []
    YNBrowser.ready = function(func) {
        YNBrowser.readyCallbacks.push(func)
        callReady()
    }

    function callReady() {
        if (YNBrowser.isReady) {
            YNBrowser.readyCallbacks.forEach((callback) => {
                if (typeof callback == 'function') {
                    setTimeout(callback, 1)
                }
            })
            YNBrowser.readyCallbacks.length = 0
        }
    }

    var host = location.hostname;

    var hostMatch = {
        "image.baidu.com": "m.baidu.com"
    }

    // www.uneed.com -> uneed.com
    if (host.split('.')[0] === "www") {
        host = host.substr(4)
    }
    if (hostMatch[host]) {
        host = hostMatch[host]
    }

    // 获取客户端注入的本js代码的标签得到传递的信息，如：debug, host
    var injectTag = document.getElementById('yuni-browser-inject')
    var debug = injectTag.getAttribute('debug') === 'true'
    var injectHost = injectTag.getAttribute('host') || 'cdn.uneed.com'

    // 调试模式下使用 http
    var protocol = (location.protocol + "//")
        // 调试模式下不需要 browser/ 的路径 
    var path = (debug ? 'sites/' : 'browser/')
    var sitesBase = protocol + injectHost + '/' + path
    var injectBase = sitesBase + host + '/'

    var hasMatchJQuery = false
    if (typeof jQuery != 'undefined') {  
        if (YNBrowser.compareVersion(jQuery.fn.jquery, '3.0.0') >= 0) {
            hasMatchJQuery = true
        }
    }

    // 没有足够高版本的jQuery
    if (!hasMatchJQuery) {
        importJS([sitesBase + 'libs/jquery.js'], function(error) {
            jQuery = $.noConflict()
            injectDomainCssAndScript();
        })
    } else {
        injectDomainCssAndScript();
    }

    function injectDomainCssAndScript() {
        // if(document.querySelector("meta[charset='gbk']")){
        //     document.querySelector("meta[charset='gbk']").setAttribute('charset','utf-8');
        // }
        // 注入inject.css
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.charset='utf-8'
        link.href = protocol + injectHost + '/' + path + 'inject.css?t=' + Date.now();
        link.media = 'all';
        document.getElementsByTagName("head")[0].appendChild(link);

        // 注入css
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.charset='utf-8'
        link.href = injectBase + 'style.css?t=' + Date.now();
        link.media = 'all';
        document.getElementsByTagName("head")[0].appendChild(link);

        // 注入js
        var script = document.createElement('script')
        script.type = "text/javascript"
        script.defer = true
        script.charset='utf-8'
        script.src = injectBase + 'script.js?t=' + Date.now()
        document.getElementsByTagName("head")[0].appendChild(script);
           
        var linkReady = false
        var scriptReady = false
        link.addEventListener('load', function() {
            linkReady = true
            if (linkReady && scriptReady) {
                YNBrowser.ready && YNBrowser.ready()
            }
        })
        script.addEventListener('load', function() {
            scriptReady = true
            if (linkReady && scriptReady) {
                YNBrowser.isReady = true
                callReady()
            }
        })

        link.addEventListener('error', function() {
            linkReady = true
            if (linkReady && scriptReady) {
                YNBrowser.ready && YNBrowser.ready()
            }
        })
        script.addEventListener('error', function() {
            scriptReady = true
            if (linkReady && scriptReady) {
                YNBrowser.isReady = true
                callReady()
            }
        })
    }

    YNBrowser.save = function(options) {
        console.log(options)
        if (typeof options === 'string') {//单图下载无desc
            JSBridge.Browser.download({ url: options })
        }
        else if (Object.prototype.toString.call(options) === '[object Array]') {
            var items = []
            for(var i=0; i<options.length; i++) {
                var item = options[i]
                if (typeof item === 'string') {
                    items.push({
                        url: item
                    })
                    continue
                }
                if (!item.url) {
                    console.error('调用 YNBrowser.save 时出错：其中有元素的url为空')
                    return
                }
                if (typeof item.url !== "string") {
                    console.error('调用 YNBrowser.save 时出错：其中有元素的url不是string类型')
                    return
                }
                if (item.desc && typeof item.desc !== "string") {
                    console.error('调用 YNBrowser.save 时出错：其中有元素的desc不是string类型')
                    return
                }
                items.push(item)
            }
            JSBridge.Browser.download(items)
        }
        else if (typeof options === 'object') {
            if (!options.url) {
                console.error('调用 YNBrowser.save 时出错：url为空')
                return
            }
            if (typeof options.url !== "string") {
                console.error('调用 YNBrowser.save 时出错：url不是string类型')
                return
            }
            if (options.desc && typeof options.desc !== "string") {
                console.error('调用 YNBrowser.save 时出错：desc不是string类型')
                return
            }
            JSBridge.Browser.download(options)
        } 
    }
    YNBrowser.bgImgUrl=function(tag){//处理图片为背景图片
        tag = /^url\((['"]?)(.*)\1\)$/.exec(tag);
        tag = tag ? tag[2] : "";
        return tag;
    }
})();

/**
 * 这里写一些针对dom元素解析和监听的通用作法
 */
(function() {

  // 跟踪指定的元素变化
  YNBrowser.track = function(selector, callback) {
    // 先从现有的渲染DOM里查
    let elements = document.querySelectorAll(selector)
    if (elements && elements.length > 0) {
      for(var i=0; i<elements.length; i++) {
        try {
          callback(elements[i])
        } catch(error) {
          console.error(error)
        }
      }
    }
    if (jQuery) {
      // 再监听DOM的变化
      jQuery(document).on('DOMNodeInserted', selector, function(e) {
        try {
          callback(e.currentTarget)
        } catch(error) {
          console.error(error)
        }
      });
    }
  }

  YNBrowser.showOptimizedTips = function(title,selecter) {
    jQuery('.yn-popup-layer').remove()
    title = title || '页面已优化，点击图片或视频保存至相册'
    let tpl = [
      '<div class="yn-popup-layer yn-optimized-tips">',
        '<div class="yn-logo yn-icon"></div>',
        '<div class="yn-title">' + title + '</div>',
      '</div>'
    ]
    let $dom = jQuery(tpl.join(''))
    if(selecter){
      $dom.appendTo(selecter)
    }else{
      $dom.appendTo(document.body)
    }
    setTimeout(() => $dom.remove(), 3000)
  }

  YNBrowser.showSavePopup = function(options,selecter) {
    options = options || {}
    options.items = options.items || []
    if (options.items.length <= 0) {
      console.error('调用 YNBrowser.showSavePopup 出错: options.items 为空')
      return
    }

    jQuery('.yn-popup-layer').remove()

    let title = options.title || (options.items.length > 1 ? "检测到"+options.items.length+"个文件" : "检查到1个文件")
    let tpl = [
      '<div class="yn-popup-layer yn-save-popup">',
        '<div class="yn-title">' + title + '</div>',
        '<div class="yn-btn"></div>',
      '</div>'
    ]
    let popup = jQuery(tpl.join(''))
    popup.find('.yn-btn').on('click', function(e) {
      console.info('与你浏览器：点击了保存', options.items)
      if (options.onSaveClick) {
        options.onSaveClick(options)
      } else {
        YNBrowser.save(options.items)
      }
    })
    if(selecter){
      popup.appendTo(selecter)
    }else{
      popup.appendTo(document.body)
    }
  }

  // 在某个元素里显示保存按钮
  YNBrowser.showSaveButton = function(elt, options, onClick) {
    if (jQuery(elt).find('.yn-btn-save')[0]) {
        return
    }
    var onClick
    if (typeof options == 'function') {
        onClick = options
        options = {}
    } else {
      onClick = onClick || options.onClick
    }
    options = options || {}
    var $div = jQuery(document.createElement('div'))
    var uuid = "yn-dom-id-" + Math.ceil(Math.random() * Date.now())
    $div[0].id = uuid
    $div.addClass('yn-btn-save')
    if (options.size) {
        $div.addClass(options.size)
    } else {
        $div.addClass('normal')
    }
    if (options.position) {
        $div.addClass(options.position)
    } else {
        $div.addClass('right-top')
    }
    $div.click(function() {
      event.stopPropagation();
      event.preventDefault();
      console.info('与你浏览器：点击了保存')
      onClick()
    });
    // elt.appendChild($div[0]) appendChild和append会报方法不存在的错误
    jQuery($div[0]).appendTo(elt)
    jQuery(document).on('DOMNodeRemoved', '#' + uuid, function() {
        showDownloadBtn(elt, options, onClick)
    })
  }

})();

/**
 * 这里编写一些高级用法，可以快速完成一套动作（跟踪/查找url/显示下载按钮/显示popup)
 */
(function() {

  YNBrowser.auto = {}

  YNBrowser.auto.trackSingleImage = function(selector) {
    YNBrowser.track(selector, function(elt) {
      YNBrowser.showSavePopup({
        title: '检测到1张图片',
        items: [elt.src]
      })
    })
  }

  YNBrowser.auto.trackSingleVideo = function(selector) {
    YNBrowser.track(selector, function(elt) {
      YNBrowser.showSavePopup({
        title: '检测到1个视频',
        items: [elt.src]
      })
    })
  }

  YNBrowser.auto.trackMultipleImages = function(options) {
    options = options || {}
    YNBrowser.track(options.selector, function(elt) {
      YNBrowser.showSaveButton(elt, options, function() {
        var findUrlFunc = null
        if (typeof options.findUrl === 'string') {
          findUrlFunc = function() {
            return findUrlBySelector(elt, options.findUrl, options.attr)
          }
        } else if (typeof options.findUrl === 'function') {
          findUrlFunc = options.findUrl
        } else {
          findUrlFunc = findUrlDefault
        }
        var url = findUrlFunc(elt)
        if (url) {
          if( url.startsWith('//') ){
            url = 'http:' + url;
          }
          YNBrowser.save(url)
        }
      })
    });
  }

  function findUrlDefault(elt, attr) {
    var img = elt.querySelector('img')
    if (img) {
      return img.getAttribute(attr || 'src')
    } else {
      return null
    }
  }

  function findUrlBySelector(elt, selector, attr) {
    //return findUrlDefault($(selector)[0], attr)
    return findUrlDefault(elt, attr)
  }

})();

(function() {

    // 在这里提供通用的一些检查元素的方法
    function trackDOMElements(selector, callback) {
        // 先从现有的渲染DOM里查
        let elements = document.querySelectorAll(selector)
        if (elements && elements.length > 0) {
            callback(elements)
        }
        // 再监听DOM的变化
        jQuery(document).on('DOMNodeInserted', selector, function(e) {
            callback(e.currentTarget)
        });
    }

  function showDownloadBtn(element, params, onClick) {
    if (jQuery(element).find('.yuni-download-btn')[0]) {
        return
    }
    if (typeof params == 'function') {
        onClick = params
        params = null
    }
    params = params || {}
    var $div = jQuery(document.createElement('div'))
    var uuid = "yuni-dom-id-" + Math.ceil(Math.random() * Date.now())
    $div[0].id = uuid
    $div.addClass('yuni-download-btn')
    if (params.size) {
        $div.addClass(params.size)
    } else {
        $div.addClass('normal')
    }
    if (params.position) {
        $div.addClass(params.position)
    } else {
        $div.addClass('right-top')
    }
    // $div.click(onClick);
    // element.appendChild($div[0])
    $div.click(function() {
        event.stopPropagation();
        event.preventDefault();
        console.info('与你浏览器：点击了保存')
        onClick()
    });
    jQuery($div[0]).appendTo(element)
    jQuery(document).on('DOMNodeRemoved', '#' + uuid, function() {
        showDownloadBtn(element, params, onClick)
    })
  }
  
  function downImg(event) { //点击下载事件
    event.stopPropagation();
    event.preventDefault();
    var savedatas = jQuery(event.target).data("savedatas");
    console.log("我要准备下载了...",savedatas);
    JSBridge.Browser.download(savedatas)
    return false;
  }
  window.YNBrowser.downImg = downImg //下载事件
    //定义为全局调用
  function showDownloadBtns(type, pasrams, savedatas, title, onClick) {
    var htmlTag = jQuery(document.createElement('div'));
    //url--图片链接
    if (!title) { //单图标题
        title = '检测到文件'
    }
    if (!onClick) { //默认点击事件
        onClick = downImg;
    }
    if (type == 1||type==3) { //1为单图，2为多图，3为批量保存
        if (type == 1) {
            htmlTag.addClass('yuni-down-one');
        }else if(type==3){
            htmlTag.addClass('yuni-down-all');
        }
        htmlTag.append("<i class='yuni-text'>" + title + "</i><section class='yuni-btn-icon' data-savedatas></section>");
        htmlTag.find('.yuni-btn-icon').data('savedatas', savedatas);
        htmlTag.find('.yuni-btn-icon').on('click', onClick);
    } else if (type == 2) {
        htmlTag.addClass('yuni-down-two');
        htmlTag.data('savedatas', savedatas);
        htmlTag.on('click', onClick);
    }
    if (pasrams) { //添加样式
        pasrams.forEach(function(item, index) {
            htmlTag.addClass(item);
        })
    }
    return htmlTag[0];
  }
  // 下载提示
  var tipHtml=function(title){
    if(!title){
        title='页面已优化,点击图片或视频保存至相册'
    }
   return "<div class='yuni-down-tip'><section class='yuni-logo'></section><i class='yuni-text'>" + title + "</i></div>"
  }
  
  
  function addClassName(type) {
    var className;
    if (type == 1) { //单图
        className = '.yuni-down-one';
    } else if (type == 2) { //多图
        className = '.yuni-down-two';
    }else if (type == 3) { //多图
        className = '.yuni-down-all';
    }
    return className;
  }
  
  YNBrowser.addClassName = addClassName;
  YNBrowser.trackDOMElements = trackDOMElements;
  YNBrowser.showDownloadBtn = showDownloadBtn;
  YNBrowser.showDownloadBtns = showDownloadBtns;
  YNBrowser.tipHtml = tipHtml;

})();


// 这里实现长按一张图保存的情况

YNBrowser.ready(function() {

  // 没有这个，说明客户端还没有支持
  if (!window.YUNI_VERSION) {
    return
  }

  // 2.5.10以上才能使用这个功能
  if (YNBrowser.compareVersion(window.YUNI_VERSION, '2.5.10') < 0) {
    return
  }

  // 目前屏蔽这个网站
  if (location.host.indexOf('m.58pic.com') !== -1) {//千图网文字乱码
    return
  }

  documentLongpress(function(element) {
    // 检测到图片
    let url = getUrl(element)
    if(!url || !url.startsWith('http')){//加入没有获取到url
      return;
    }
    JSBridge.UI.actionSheet([{
      text: '保存到云相册（推荐）',
      action: 'album'
    }
    // {
    //   text: '保存到本地',
    //   action: 'system'
    // }
    ]).then(function(resp) {
      switch(resp.data) {
        case 'album':
          YNBrowser.save(url)
          break
        case 'system':
          JSBridge.Browser.saveToSystemAlbum({ url: url })
          break
      }
    })
  })
  

  // 这里定义如何longpress
  function documentLongpress(callback) {
    document.addEventListener('scroll',touchFn)
    document.addEventListener('touchmove',touchFn)
    document.addEventListener('touchend',touchFn)
    document.addEventListener('touchstart',touchFn)
    document.addEventListener('touchcancel',touchFn)
    var timeOutEvent=0;
    var startX=0;
    var startY=0;
    function touchFn(e){
        jQuery(e.target).css({'-webkit-touch-callout':'none','-webkit-user-select':'none','-khtml-user-select':'none','-moz-user-select':'none','-ms-user-select':'none','user-select':'none'});
        switch (e.type){
            case "touchstart" :  //500ms之后执行
                if(e.touches && e.touches.length==1){
                    startX=e.touches[0].pageX
                    startY=e.touches[0].pageY
                    timeOutEvent = setTimeout(()=>{
                        e.preventDefault();
                        e.stopPropagation();
                        callback(e)
                    },450)
                }else{
                    clearTimeout(timeOutEvent)
                }
                break;
            default:
                if(e.changedTouches&&e.changedTouches.length&&e.type!=='touchend'){
                    var moveX=e.changedTouches[0].pageX
                    var moveY=e.changedTouches[0].pageY
                    if(Math.abs(moveX-startX)>10||Math.abs(moveY-startY)>10){
                        clearTimeout(timeOutEvent)
                    }
                }else{
                    clearTimeout(timeOutEvent)
                }
                break;
        }
    }
  }

  // 这里定义通过一个element找到可以保存的图片
  function getUrl(element) {
    var url='';
    var tag=element.target;
    if(element&&tag){
        var bg=jQuery(tag).css("backgroundImage");
        var img=jQuery(tag).attr("src");
        if(img && typeof img === 'string'){
            url=img
        }else if(bg && typeof bg === 'string'){
            url=YNBrowser.bgImgUrl(bg);
        }
        if(url.startsWith('//') ){
          url = 'http:' + url;
        }
    }
    return url;
  }
})