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
            elmsAdd=jQuery(elt).find('.photo_activity_item')
            url=urlP5(YNBrowser.bgImgUrl(jQuery(elt).find('.photo_activity_item__img.set_index_img1').css("backgroundImage")));
        }
        if(url){
            YNBrowser.showSaveButton(elmsAdd,{onClick: function() {
                    YNBrowser.save({desc:desc,url:url})
                }
            })
        }
    })
}
//大按钮
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
function urlP5(url){//url变为!p5更加高清
    url=url.substring(0,url.length-3)+'!p5';
    return url;
}
function smallBtn(selecter){//给图片加小logo 无desc
    YNBrowser.track(selecter, function(elt) {
        if(jQuery(elt).find('.yn-btn-save').length){
            return
        }
        var url=''
        var elmsImg=jQuery(elt).find('img')
        if(elmsImg.length){
            url=elmsImg.attr('data-original')
            if(url.indexOf('!p')>=0){
                url=urlP5(url);
            }
        }
        if(url){
            YNBrowser.showSaveButton(elt,{size: 'small',onClick: function() {
                    YNBrowser.save({url:url})
                }
            })
        }
    })
}
function bgBtn(selecter,bgClass,descClass){//单个背景图片作为url
    YNBrowser.track(selecter, function(elt) {
        if(jQuery(elt).find('.yn-btn-save').length){
            return
        }
        var desc=''
        var url=''
        var elmsImg=jQuery(elt).find(bgClass)
        if(elmsImg.length){
            url=YNBrowser.bgImgUrl(elmsImg.css("backgroundImage"))
            if(url.indexOf('!p')>=0){
                url=urlP5(url);
            }
        }
        if(descClass&&jQuery(elt).find(descClass).length){
            desc=jQuery(elt).find(descClass).text();
        }
        if(bgClass&&url){
            YNBrowser.showSaveButton(elt,{onClick: function() {
                    YNBrowser.save({desc:desc,url:url})
                }
            })
        }
    })
}
function showTip(selecter){//提示
    YNBrowser.track(selecter, function(elt) {
        if(jQuery.find('.yn-popup-layer.yn-optimized-tips').length){
            return 
        }
        YNBrowser.showOptimizedTips('页面已优化,点击图片保存至相册',elt)
    })
}

bgBtn('.galleries_layout','.image.copyright-contextmenu','.gallery_details__title')
smallBtn('.main_body_album  .grid-container .photo_thumbnail')
showBtn('.following_tab .activity_item')//首页--关注
showBtn('.following_tab .graphic-txt-item')//首页--关注
showTip('.logged_in_home_layout__content_region .activity_tab ');
showTip('.photo_grid_region .full-aspect-ratio-photo-grid')

