//小按钮
function showBtn(selecter){
    YNBrowser.track(selecter, function(elt) {
        if(elmsAdd&&elmsAdd.find('.yn-btn-save').length){
            return
        }
        var desc=''
        var url=''
        var elmsAdd=''
        var elmsImg=jQuery(elt).find('.imgSuperCmp>img')
        var descElm=jQuery(elt).find('.photo_activity_item__details')
        if(descElm.length){
            var textOne=descElm.find('.photo_activity_item__title').text()
            var textTwo=descElm.find('.photo_activity_item__description').text()
            if(textOne&&textTwo){
                desc=textOne+"--"+textTwo
            }else if(textOne&&!textTwo){
                desc=textOne
            }else if(!textOne&&textTwo){
                desc=textTwo
            }
        }
        if(elmsImg.length){
            elmsAdd=jQuery(elt).find('.imgSuperCmp')
            url=elmsImg.attr('data-original')
            if(url.indexOf('!p')>=0){
                url=urlP5(url);
            }
        }else if(jQuery(elt).find(".photo_activity_item__img.set_index_img1").length){
            elmsAdd=jQuery(elt).find('.photo_activity_item__img.set_index_img1')
            url=urlP5(YNBrowser.bgImgUrl(elmsAdd.css("backgroundImage")));
        }
        if(url){
            YNBrowser.showSaveButton(elmsAdd,{onClick: function() {
                    rowser.save({desc:desc,url:url})
                }
            })
        }
    })
}
//小按钮
// function showBtn(selecter){
    YNBrowser.track('.single-photo-detail-mobile-container', function(elt) {
        if(jQuery(elt).find('.yn-save-popup').length){
            return
        }
        var items=[];
        var desc=''
        var url=''
        var elmsImg=jQuery(elt).find('.photo-img-container>img')
        var descElm=jQuery(elt).find('.des-region')
        if(descElm.length){
            var textOne=descElm.find('.photo-title').text()
            var textTwo=descElm.find('.photo-desc').text()
            if(textOne&&textTwo){
                desc=textOne+"--"+textTwo
            }else if(textOne&&!textTwo){
                desc=textOne
            }else if(!textOne&&textTwo){
                desc=textTwo
            }
        }
        if(elmsImg.length){
            for(var i=0;i<elmsImg.length;i++){
                url=elmsImg[i].src
                if(url.indexOf('!p')>=0){
                    url=urlP5(url);
                }
                items.push({desc:desc,url:url});
            }
        }
        if(items){
           YNBrowser.showSavePopup({items:items},elt)
        }
    })
// }
function urlP5(url){
    //url变为!p5更加高清
    url=url.substring(0,url.length-3)+'!p5';
    return url;
}
//大按钮
showBtn('.activity_item')//首页--关注
showBtn('.graphic-txt-item')//首页--关注