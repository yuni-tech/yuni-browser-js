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