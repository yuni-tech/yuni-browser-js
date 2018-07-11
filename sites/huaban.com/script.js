
YNBrowser.ready(function() {
  // 如果有蒙层则删除
  YNBrowser.track('#index_cover', function(el) {
    el.remove()
  })
  function addButton(type,selector,titleTag,options){
    if(!options){
      options=''
    }
    if (typeof titleTag == 'object') {
      options = titleTag
      titleTag = ''
    }
    YNBrowser.track(selector, function(elt) {
      var desc=''
      var url=''
      var item=[]
      YNBrowser.showSaveButton(elt,options,function(){
        if(titleTag&&jQuery(elt).find(titleTag).length){
          desc=jQuery(elt).find(titleTag).text();
        }
        if(type===1){//单张图
          if(jQuery(elt).find('img').length){
            url=jQuery(elt).find('img')[0].src.split('_')[0]//缩略图改为高清图片
          }
          item=[{url:url,desc:desc}]
        }else if(type===2){//多张图
          if(options&&jQuery(elt).find('img').length){
            for(var i=0;i<jQuery(elt).find('img').length;i++){
              url=jQuery(elt).find('img')[i].src.split('_')[0]//缩略图改为高清图片
              item.push({url:url,desc:desc})
            }
          }
        }
        // 带上描述
        YNBrowser.save(item)
        desc=''
        url=''
        item=''
      })
    })
  }
  //查看大图
  YNBrowser.track('#image-viewer', function(elt) {
    if(jQuery('#image-viewer').find('.yn-popup-layer.yn-save-popup').length){
      return
    }
    var items=[]
    var desc=''
    var url=''
    if(jQuery('.pin-board-title').length){
      desc=jQuery('.pin-board-title').text();
    }
    if(jQuery('#pin_board_imgs>img').length){
      for(var i=0;i<jQuery('#pin_board_imgs>img').length;i++){
        url=jQuery('#pin_board_imgs>img')[i].src.split('_')[0]
        items.push({desc:desc,url:url});
      }
    }
    YNBrowser.showSavePopup({items:items},'#image-viewer')
    var items=[]
    var desc=[]
    var url=[]
  })
  YNBrowser.track('#mobile_pin_img', function(elt) {
    var items=[]
    var desc=''
    var url=''
    // if(jQuery('.pin-board-title').length){//多张
    //   desc=jQuery('.pin-board-title').text();
    // }
    if(jQuery('.pin-description>.text').length){
      desc=jQuery('.pin-description>.text').text();
    }
    if(jQuery('#mobile_pin_img>img').length){
      // for(var i=0;i<jQuery('#pin_board_imgs>img').length;i++){//多张
      //   url=jQuery('#pin_board_imgs>img')[i].src.split('_')[0]
      //   items.push({desc:desc,url:url});
      // }
      //单张
      url=jQuery('#mobile_pin_img>img')[0].src.split('_')[0]
      items.push({desc:desc,url:url});
    }
    YNBrowser.showSaveButton('#mobile_pin_view .slide-holder', function() {
      // 带上描述
      YNBrowser.save(items)
    })
    desc=''
    url=''
    item=''
  })
  addButton(2,'.waterfall .wfc.mobile-board-item','.board-info>h3',{size:'small'})
  addButton(2,'.waterfall .person-item.wfc',{size:'small'})
  addButton(2,'.waterfall .wfc.mobile-explore-item','.board-title',{size:'small'})
  addButton(1,'.waterfall .pin-item.wfc','.description')
  addButton(1,'.waterfall .pin-item.wfc','.description')
  addButton(1,'.recommend-items>.recommend-item','.recommend-title')
})