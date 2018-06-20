/**
 * 这里编写一些高级用法，可以快速完成一套动作（跟踪/查找url/显示下载按钮/显示popup)
 */
(function() {

  YNBrowser.auto = {}

  YNBrowser.auto.trackSingleImage = function(selector) {
    YNBrowser.track(selector, function(elt) {
      YNBrowser.showSavePopup({
        title: '检测到一张图片',
        items: [elt.src]
      })
    })
  }

  YNBrowser.auto.trackSingleVideo = function(selector) {
    YNBrowser.track(selector, function(elt) {
      YNBrowser.showSavePopup({
        title: '检测到一个视频',
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
            return findUrlBySelector(options.findUrl, options.attr)
          }
        } else if (typeof options.findUrl === 'function') {
          findUrlFunc = options.findUrl
        } else {
          findUrlFunc = findUrlDefault
        }
        var url = findUrlFunc(elt)
        if (url) {
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

  function findUrlBySelector(selector, attr) {
    return findUrlDefault($(selector)[0], attr)
  }

})();