YNBrowser.ready(function() {

  // 1. 判断路径 
  // 1.1 判断是图片列表的页面路径
  if (location.pathname.startsWith('/examples/imagelist.html')) {

    // 2. 跟踪元素的出现
    YNBrowser.track('.cell', function(elt) {

      // 3. 得到下载链接
      let url = elt.querySelector('img').src

      // 4. 显示保存按钮
      YNBrowser.showSaveButton(elt, {
        onClick: function() {

          // 5. 点击时调用保存
          YNBrowser.save({ url: url })
        }
      })
    })

    // 上面的代码可以使用更新简单的方式
    // YNBrowser.auto.trackMultipleImages({
    //   selector: '.cell',
    //   findUrl: 'img', // optinal
    //   attr: 'src' // optional
    // })
  }

  // 1.2 判断是单图列表的页面路径
  if (location.pathname.startsWith('/examples/single-image.html')) {

    // 2. 跟踪元素的出现
    // YNBrowser.track('.center', function(elt) {

    //   // 3. 得到下载链接
    //   let url = elt.querySelector('img').src

    //   // 4. 显示下载popup，无需要调用YNBrowser.save，内部自动处理
    //   YNBrowser.showSavePopup({
    //     items: [url]
    //   })
    // })

    // 上面的代码可以使用一种简单的方式
    YNBrowser.auto.trackSingleImage('.center img')
  }

  // 1.3 有时候图片不够高清，需要用户点击后查看高清再保存
  if (location.pathname.startsWith('/examples/just-tips.html')) {
    YNBrowser.showOptimizedTips()
  }

  // 1.4 检测到单个视频的路径时
  if (location.pathname.startsWith('/examples/video.html')) {
    YNBrowser.track('.player', function(elt) {
      YNBrowser.showSavePopup({
        title: '检测到一个视频',
        items: [elt.src]
      })
    })

    // 上面的代码也可以使用一行代替
    // YNBrowser.auto.trackSingleVideo('.player')
  }

})