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