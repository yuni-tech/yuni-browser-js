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
