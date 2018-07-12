

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

/* JSBridge */

!(function(e) {
  var t = {};

  function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
  (n.c = t),
  (n.d = function(e, t, r) {
      n.o(e, t) ||
          Object.defineProperty(e, t, {
              configurable: !1,
              enumerable: !0,
              get: r
          });
  }),
  (n.r = function(e) {
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
  (n.n = function(e) {
      var t =
          e && e.__esModule ?

          function() {
              return e.default;
          } :
          function() {
              return e;
          };
      return n.d(t, "a", t), t;
  }),
  (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
  }),
  (n.p = ""),
  n((n.s = 4));
})([
  function(e, t, n) {
      "use strict";
      var r,
          o =
          (this && this.__extends) ||
          ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] }
                      instanceof Array &&
                      function(e, t) {
                          e.__proto__ = t;
                      }) ||
                  function(e, t) {
                      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                  }),
              function(e, t) {
                  function n() {
                      this.constructor = e;
                  }
                  r(e, t),
                      (e.prototype =
                          null === t ?
                          Object.create(t) :
                          ((n.prototype = t.prototype), new n()));
              });
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i,
          a = n(2),
          s = {};

      function c() {
          return i;
      }
      (t.setNativeImplement = function(e) {
          i = e;
      }),
      (t.getNative = c),
      (t.addJSModule = function(e, t) {
          s[e] = t;
      });
      var u = (function() {
          function e() {
              var e = this;
              (this.nativeEvent = new a.default()),
              (this._idSeed = 1),
              (this._handles = {}),
              (this._jsModules = {}),
              Object.keys(s).forEach(function(t) {
                  var n = s[t];
                  e.addJSModule(t, n);
              });
          }
          return (
              (e.prototype._genHandleId = function() {
                  return "BridgeHandle_" + this._idSeed++;
              }),
              (e.prototype.callNative = function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                      var o = e.handleId || t._genHandleId();
                      (t._handles[o] = function(e) {
                          200 === e.ec ? n(e) : r(e);
                      }),
                      (e.handleId = o),
                      t.callNativeInternal(e);
                  });
              }),
              (e.prototype.callNativeFlat = function(e, t, n) {
                  return this.callNative({ module: e, method: t, args: n || {} });
              }),
              (e.prototype.callNativeSync = function(e, t, n) {
                  return this.callNativeInternalSync({ module: e, method: t, args: n });
              }),
              (e.prototype.callJS = function(e) {
                  var t = this,
                      n = this._jsModules[e.module][e.method](e.args);
                  Promise.resolve(n).then(function(n) {
                      t.callNative({
                          module: "JSCallback",
                          method: "callback",
                          handleId: e.handleId,
                          args: n
                      });
                  });
              }),
              (e.prototype.addJSModule = function(e, t) {
                  this._jsModules[e] = t;
              }),
              (e.prototype.handleNativeResponse = function(e) {
                  var t = this._handles[e.handleId];
                  t && (delete this._handles[e.handleId], t(e));
              }),
              (e.prototype.handleNativeEvent = function(e, t) {
                  this.nativeEvent.emit(e, t);
              }),
              (e.prototype.handleModuleEvent = function(e, t, n) {
                  this._jsModules[e].emit(t, n);
              }),
              e
          );
      })();
      t.Native = u;
      var l = (function(e) {
          function t() {
              return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
              o(t, e),
              Object.defineProperty(t.prototype, "native", {
                  get: function() {
                      return c();
                  },
                  enumerable: !0,
                  configurable: !0
              }),
              t
          );
      })(a.default);
      t.ModuleBase = l;
  },
  function(e, t, n) {
      "use strict";
      var r,
          o =
          (this && this.__extends) ||
          ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] }
                      instanceof Array &&
                      function(e, t) {
                          e.__proto__ = t;
                      }) ||
                  function(e, t) {
                      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                  }),
              function(e, t) {
                  function n() {
                      this.constructor = e;
                  }
                  r(e, t),
                      (e.prototype =
                          null === t ?
                          Object.create(t) :
                          ((n.prototype = t.prototype), new n()));
              });
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(0),
          a = (function(e) {
              function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
              }
              return (
                  o(t, e),
                  (t.prototype.download = function(e) {
                      var t = e;
                      return (
                          Array.isArray(e) && (t = { items: e }),
                          this.native.callNative({
                              module: "Browser",
                              method: "download",
                              args: t
                          })
                      );
                  }),
                  t
              );
          })(i.ModuleBase);
      (t.BrowserModule = a),
      (t.Browser = new a()),
      i.addJSModule("Browser", t.Browser);
  },
  function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = Object.prototype.hasOwnProperty,
          o = "~";

      function i() {}

      function a(e, t, n, r, i) {
          var a = new function(e, t, n) {
                  (this.fn = e), (this.context = t), (this.once = n || !1);
              }(n, r || e, i),
              s = o ? o + t : t;
          return (
              e._events[s] ?
              e._events[s].fn ?
              (e._events[s] = [e._events[s], a]) :
              e._events[s].push(a) :
              ((e._events[s] = a), e._eventsCount++),
              e
          );
      }

      function s(e, t) {
          0 == --e._eventsCount ? (e._events = new i()) : delete e._events[t];
      }

      function c() {
          (this._events = new i()), (this._eventsCount = 0);
      }
      Object.create &&
          ((i.prototype = Object.create(null)), new i().__proto__ || (o = !1)),
          (c.prototype.eventNames = function() {
              var e,
                  t,
                  n = [];
              if (0 === this._eventsCount) return n;
              for (t in (e = this._events))
                  r.call(e, t) && n.push(o ? t.slice(1) : t);
              return Object.getOwnPropertySymbols ?
                  n.concat(Object.getOwnPropertySymbols(e)) :
                  n;
          }),
          (c.prototype.listeners = function(e, t) {
              var n = o ? o + e : e,
                  r = this._events[n];
              if (t) return !!r;
              if (!r) return [];
              if (r.fn) return [r.fn];
              for (var i = 0, a = r.length, s = new Array(a); i < a; i++)
                  s[i] = r[i].fn;
              return s;
          }),
          (c.prototype.emit = function(e, t, n, r, i, a) {
              var s = o ? o + e : e;
              if (!this._events[s]) return !1;
              var c,
                  u,
                  l = this._events[s],
                  f = arguments.length;
              if (l.fn) {
                  switch ((l.once && this.removeListener(e, l.fn, void 0, !0), f)) {
                      case 1:
                          return l.fn.call(l.context), !0;
                      case 2:
                          return l.fn.call(l.context, t), !0;
                      case 3:
                          return l.fn.call(l.context, t, n), !0;
                      case 4:
                          return l.fn.call(l.context, t, n, r), !0;
                      case 5:
                          return l.fn.call(l.context, t, n, r, i), !0;
                      case 6:
                          return l.fn.call(l.context, t, n, r, i, a), !0;
                  }
                  for (u = 1, c = new Array(f - 1); u < f; u++) c[u - 1] = arguments[u];
                  l.fn.apply(l.context, c);
              } else {
                  var d,
                      p = l.length;
                  for (u = 0; u < p; u++)
                      switch (
                          (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), f)
                      ) {
                          case 1:
                              l[u].fn.call(l[u].context);
                              break;
                          case 2:
                              l[u].fn.call(l[u].context, t);
                              break;
                          case 3:
                              l[u].fn.call(l[u].context, t, n);
                              break;
                          case 4:
                              l[u].fn.call(l[u].context, t, n, r);
                              break;
                          default:
                              if (!c)
                                  for (d = 1, c = new Array(f - 1); d < f; d++)
                                      c[d - 1] = arguments[d];
                              l[u].fn.apply(l[u].context, c);
                      }
              }
              return !0;
          }),
          (c.prototype.on = function(e, t, n) {
              return a(this, e, t, n, !1);
          }),
          (c.prototype.once = function(e, t, n) {
              return a(this, e, t, n, !0);
          }),
          (c.prototype.removeListener = function(e, t, n, r) {
              var i = o ? o + e : e;
              if (!this._events[i]) return this;
              if (!t) return s(this, i), this;
              var a = this._events[i];
              if (a.fn)
                  a.fn !== t || (r && !a.once) || (n && a.context !== n) || s(this, i);
              else {
                  for (var c = 0, u = [], l = a.length; c < l; c++)
                      (a[c].fn !== t || (r && !a[c].once) || (n && a[c].context !== n)) &&
                      u.push(a[c]);
                  u.length ? (this._events[i] = 1 === u.length ? u[0] : u) : s(this, i);
              }
              return this;
          }),
          (c.prototype.removeAllListeners = function(e) {
              var t;
              return (
                  e ?
                  ((t = o ? o + e : e), this._events[t] && s(this, t)) :
                  ((this._events = new i()), (this._eventsCount = 0)),
                  this
              );
          }),
          (c.prototype.off = c.prototype.removeListener),
          (c.prototype.addListener = c.prototype.on),
          (c.prototype.setMaxListeners = function() {
              return this;
          }),
          (c.prefixed = o),
          (t.default = c);
  },
  function(e, t, n) {
      "use strict";
      var r,
          o =
          (this && this.__extends) ||
          ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] }
                      instanceof Array &&
                      function(e, t) {
                          e.__proto__ = t;
                      }) ||
                  function(e, t) {
                      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                  }),
              function(e, t) {
                  function n() {
                      this.constructor = e;
                  }
                  r(e, t),
                      (e.prototype =
                          null === t ?
                          Object.create(t) :
                          ((n.prototype = t.prototype), new n()));
              });
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(0);
      !(function(e) {
          for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
      })(n(0));
      var a = "undefined" == typeof window ? {} : window;
      t.isUneedWebView =
          a.isUneedWebView ||
          (a.navigator &&
              a.navigator.userAgent &&
              a.navigator.userAgent.indexOf("UneedWebView"));
      var s = a.navigator.userAgent,
          c = a.androidBridge || /UNWebView\/android/.test(s),
          u = (c && /UNWebView\/android\/lowLevelBridge/.test(s),
              (function(e) {
                  function t() {
                      var t = e.call(this) || this;
                      return (
                          (a.onNativeMessage = function(e) {
                              return t.handleNativeResponse(e);
                          }),
                          (a.onNativeEvent = function(e, n) {
                              return t.handleNativeEvent(e, n);
                          }),
                          (a.onModuleEvent = function(e, n, r) {
                              return t.handleModuleEvent(e, n, r);
                          }),
                          (a.callJS = function(e) {
                              return t.callJS(e);
                          }),
                          t
                      );
                  }
                  return (
                      o(t, e),
                      (t.prototype.callNativeInternal = function(e) {
                          if (c) {
                              var t = JSON.stringify(e);
                              return a.androidBridge.exec(t);
                          }
                          if (a.webkit && a.webkit.messageHandlers)
                              return a.webkit.messageHandlers.defaultHandler.postMessage(e);
                          if (a.UIWebViewJSBridge)
                              return a.UIWebViewJSBridge.callNative(JSON.stringify(e));
                          var n = document.createElement("iframe");
                          (n.style.width = "1px"),
                          (n.style.height = "1px"),
                          (n.style.display = "none"),
                          (n.src = "yunijs://callNative?args=" + JSON.stringify(e)),
                          document.body.appendChild(n),
                              setTimeout(function() {
                                  n.remove();
                              }, 100);
                      }),
                      (t.prototype.callNativeInternalSync = function(e) {}),
                      t
                  );
              })(i.Native));
      (t.WebViewNative = u),
      (t.native = new u()),
      (t.nativeEvent = t.native.nativeEvent),
      i.setNativeImplement(t.native);
  },
  function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(3),
          o = n(1),
          i = window;
      (i.JSBridge = r), Object.assign(i.JSBridge, o);
  }
]);


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
            script.charset='utf-8'
            script.async = true;
            script.src = url;
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
    YNBrowser.readyCallback = function() {}
    YNBrowser.ready = function(func) {
        YNBrowser.readyCallback = func
        callReady()
    }

    function callReady() {
        if (YNBrowser.isReady) {
            YNBrowser.readyCallback && YNBrowser.readyCallback()
            YNBrowser.readyCallback = null
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
        // 注入inject.css
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.charset='utf-8';
        link.href = protocol + injectHost + '/' + path + 'inject.css?t=' + Date.now();
        link.media = 'all';
        document.getElementsByTagName("head")[0].appendChild(link);

        // 注入css
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.charset='utf-8';
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

  YNBrowser.showOptimizedTips = function(title) {
    jQuery('.yn-popup-layer').remove()
    title = title || '页面已优化,点击图片或视频保存至相册'
    let tpl = [
      '<div class="yn-popup-layer yn-optimized-tips">',
        '<div class="yn-logo yn-icon"></div>',
        '<div class="yn-title">' + title + '</div>',
      '</div>'
    ]
    jQuery(tpl.join('')).appendTo(document.body)
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
    popup.find('.yn-btn').on('click', function() {
        event.stopPropagation();
        event.preventDefault();
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
    $div.click(function() {
        event.stopPropagation();
        event.preventDefault();
        console.info('与你浏览器：点击了保存')
        onClick()
    });
    jQuery($div[0]).appendTo(element)
    // element.appendChild($div[0])
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
