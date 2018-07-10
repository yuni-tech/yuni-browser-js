
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
  //.slide-holder #mobile_pin_img
  YNBrowser.auto.trackMultipleImages({
    selector: ".slide-holder #mobile_pin_img",
    findUrl: 'img',
    attr: 'src'
  })
  YNBrowser.track('.waterfall .wfc.mobile-board-item', function(elt) {
    var desc=''
    var url=''
    var item=[]
    YNBrowser.showSaveButton(elt,function(){
      if(jQuery(elt).find('.board-info>h3').length){
        desc=jQuery(elt).find('.board-info>h3').text();
      }
      if(jQuery(elt).find('img').length){//多张图
        for(var i=0;i<jQuery(elt).find('img').length;i++){
          url=jQuery(elt).find('img')[i].src.split('_')[0]//缩略图改为高清图片
          item.push({url:url,desc:desc})
        }
      }
      // 带上描述
      YNBrowser.save(item)
      desc=''
      url=''
      item=''
    })
  })
  //.pin-item
  YNBrowser.track('.waterfall .pin-item.wfc', function(elt) {
    var desc=''
    var url=''
    YNBrowser.showSaveButton(elt,function(){
      if(jQuery(elt).find('.description').length){
        desc=jQuery(elt).find('.description').text();
      }
      if(jQuery(elt).find('img').length){
        url=jQuery(elt).find('img')[0].src.split('_')[0]//缩略图改为高清图片
      }
      // 带上描述
      YNBrowser.save({
        url: url,
        desc: desc
      })
      desc=''
      url=''
    })
  })
})