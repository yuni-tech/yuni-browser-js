// .imgover #imgshow .list
function showBtn(selecter){
  YNBrowser.track(selecter, function(elt) {
    var desc=''
    var url=''
    var elmsTop=jQuery(elt).find('img')
    var descElm=jQuery(elt).find('.info>p')
    if(descElm.length){
      desc=descElm.text()
    }
    if(elmsTop.length){
      if(!desc){
        desc=elmsTop[0].alt
      }
      url=elmsTop[0].src.split('!')[0]
    }
    if(url){
      YNBrowser.showSaveButton(elt,{onClick: function() {
          YNBrowser.save({desc:desc,url:url})
        }
      })
    }
  })
}
showBtn('.imgover #imgshow .list')
showBtn('.art-m .art-img')