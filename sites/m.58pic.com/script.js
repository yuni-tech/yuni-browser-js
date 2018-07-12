//站酷网站
  YNBrowser.track('.imgover #imgshow .list', function(elt) {
    var items=[]
    var desc=''
    var url=''
    var elmsTop=jQuery('.art-m .art-img img')
    if(elmsTop.length){
      desc=elmsTop[0].alt
      url=elmsTop[0].src.split('!/')[0]
      items.push({desc:desc,url:url});
    }
    var elsmMore=jQuery('.imgover #imgshow .list img')
    console.log(elsmMore.length);
    if(elsmMore.length){
      for(var i=0;i<elsmMore.length;i++){
        desc=elsmMore[i].alt
        url=elsmMore[i].src.split('!/')[0]
        items.push({desc:desc,url:url});
      }
    }
    if(items.length){
      YNBrowser.showSavePopup({items:items})
    }
    desc=''
    url=''
    item=''
  })