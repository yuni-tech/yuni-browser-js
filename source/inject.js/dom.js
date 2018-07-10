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
    title = title || '页面已优化，点击图片或视频保存至相册'
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