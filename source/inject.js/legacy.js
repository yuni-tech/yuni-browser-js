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
    YNBrowser.clickAnalysis(location.hostname);
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
