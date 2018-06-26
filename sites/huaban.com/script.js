
YNBrowser.ready(function() {
  // 如果有蒙层则删除
  YNBrowser.track('#index_cover', function(el) {
    el.remove()
  })

  // recommend-item
  YNBrowser.auto.trackMultipleImages({
    selector: ".recommend-item",
    findUrl: 'img',
    attr: 'src'
  })
})