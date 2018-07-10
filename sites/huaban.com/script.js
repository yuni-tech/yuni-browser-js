
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
  addButton(2,'.waterfall .wfc.mobile-board-item','.board-info>h3',{size:'small'})
  addButton(2,'.waterfall .person-item.wfc',{size:'small'})
  addButton(2,'.waterfall .wfc.mobile-explore-item','.board-title',{size:'small'})
  addButton(1,'.waterfall .pin-item.wfc','.description')
  addButton(1,'.waterfall .pin-item.wfc','.description')
  addButton(1,'.recommend-items>.recommend-item','.recommend-title')
  addButton(1,'.slide-holder #mobile_pin_img')
})