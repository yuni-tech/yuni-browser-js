YNBrowser.ready(function() {
    //检测到单个视频的路径时
    if (location.pathname.startsWith('/share/item')) {
      YNBrowser.track("video.video-player", function(elt) {
        YNBrowser.showSavePopup({title: '检测到1个视频',items: [elt.src]},'.video-container')
      })
    }
  })