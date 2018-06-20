/* inject */
(function() {

    // 获取客户端注入的本js代码的标签得到传递的信息，如：debug, host
    var injectHost = "localhost:" + (location.protocol === "https:" ? "15068" : "15069")

    var path = 'sites/'
    var sitesBase = location.protocol + "//" + injectHost + '/' + path

    // 注入js
    var script = document.createElement('script')
    script.id = "yuni-browser-inject"
    script.type = "text/javascript"
    script.src = sitesBase + 'inject.js?t=' + Date.now()
    script.setAttribute("debug", "true")
    script.setAttribute("host", injectHost)
    document.getElementsByTagName("head")[0].appendChild(script);
    
})();