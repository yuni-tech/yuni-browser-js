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

  // 目前先为这个网站开放测试
  if (location.host.indexOf('unsplash.com') === -1) {
    return
  }

  documentLongpress(function(element) {
    // 检测到图片
    let url = getUrl(element)
    JSBridge.UI.actionSheet([{
      text: '保存到云相册（推荐）',
      action: 'album'
    }, {
      text: '保存到本地',
      action: 'system'
    }]).then(function(resp) {
      switch(resp.data) {
        case 'album':
          YNBrowser.save(url)
          break
        case 'system':
          JSBBridge.Browser.saveToSystemAlbum({ url: url })
          break
      }
    })
  })
  

  // 这里定义如何longpress
  function documentLongpress(callback) {
    document.addEventListener('touchstart', function() {
      callback()
    })
  }

  // 这里定义通过一个element找到可以保存的图片
  function getUrl(element) {
    return 'https://www.uneed.com/source/img/logo.png'
  }

})