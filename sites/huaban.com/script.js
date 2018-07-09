
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
  YNBrowser.auto.trackMultipleImages({
    selector: ".person-item",
    findUrl: 'img',
    attr: 'src'
  })
  YNBrowser.auto.trackMultipleImages({
    selector: ".mobile-board-item",
    findUrl: 'img',
    attr: 'src'
  })
  //.slide-holder #mobile_pin_img
  YNBrowser.auto.trackMultipleImages({
    selector: ".slide-holder #mobile_pin_img",
    findUrl: 'img',
    attr: 'src'
  })
  //.slide-holder #mobile_pin_img
  YNBrowser.auto.trackMultipleImages({
    selector: ".waterfall .pin-item.wfc",
    findUrl: 'img',
    attr: 'src'
  })
})