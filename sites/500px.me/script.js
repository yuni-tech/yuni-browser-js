//小按钮 desc需要拼接
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
        elmsAdd=jQuery(elt).find('.photo_activity_item')
        if(elmsImg.length){
            if(elmsImg.attr('data-original')){
                url=elmsImg.attr('data-original')
            }else if(elmsImg.attr('src')){
                url=elmsImg.attr('src');
            }
            url=urlP5(url);
        }else if(jQuery(elt).find(".photo_activity_item__img.set_index_img1").length){
            url=urlP5(YNBrowser.bgImgUrl(jQuery(elt).find('.photo_activity_item__img.set_index_img1').css("backgroundImage")));
        }else if(jQuery(elt).find("img.photo_activity_item__img").length){
            url=jQuery(elt).find("img.photo_activity_item__img").attr('data-original')
            url=urlP5(url);
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
            url=urlP5(url);
            items.push({desc:desc,url:url});
        }
    }
    if(items){
        YNBrowser.showSavePopup({items:items},elt)
    }
})
function urlP5(url){//url变为!p5更加高清
    if(url&&url.indexOf('!')>=0){
        url=url.substring(0,url.length-3)+'!p5';
    }
    return url;
}
function smallBtn(selecter,pos,size){//给图片加小logo 无desc
    YNBrowser.track(selecter, function(elt) {
        if(jQuery(elt).find('.yn-btn-save').length){
            return
        }
        var url=''
        var elmsImg=jQuery(elt).find('img')
        if(elmsImg.length){
            url=elmsImg.attr('data-original')
            url=urlP5(url);
        }
        pos=pos||'right-top'
        size=size||'small'
        if(url){
            YNBrowser.showSaveButton(elt,{size: size,position:pos,onClick: function() {
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
            if(elmsImg.attr('data-original')){
                url=elmsImg.attr('data-original')
            }else{
                url=YNBrowser.bgImgUrl(elmsImg.css("backgroundImage"))
            }
            url=urlP5(url);
        }
        if(descClass&&jQuery(elt).find(descClass).length){
            desc=jQuery(elt).find(descClass).text();
        }
        if(url){
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
function imgTetxBtn(selecter,child,bgClass,descClass){//监听父元素变化,循环给子元素添加按钮
    YNBrowser.track(selecter, function(elt) {
        var childTag=jQuery(elt).find(child)
        if(jQuery(elt).find(child).length){
            for(i=0;i<jQuery(elt).find(child).length;i++){
                var desc=''
                var url=''
                if(jQuery(childTag[i]).find('.yn-btn-save').length){
                    continue
                }
                var elmsImg=jQuery(childTag[i]).find(bgClass)
                if(elmsImg.length){
                    if(elmsImg.attr('data-original')){
                        url=elmsImg.attr('data-original')
                    }else{
                        url=YNBrowser.bgImgUrl(elmsImg.css("backgroundImage"))
                    }
                    url=urlP5(url);
                }
                if(descClass&&jQuery(childTag[i]).find(descClass).length){
                    desc=jQuery(childTag[i]).find(descClass).text();
                }
                if(url){
                    YNBrowser.showSaveButton(jQuery(childTag[i]),{onClick: function() {
                            YNBrowser.save({desc:desc,url:url})
                        }
                    })
                }
            }
        }
    })
}
//大按钮 https://500px.me/community/v2/graphic/detail/017624d55e58ace5a00ad90d0c52cef3
YNBrowser.track('.graphic-content-container .graphic-main-content-region', function(elt) {
    if(jQuery(elt).find('.yn-save-popup').length){
        return
    }
    var items=[];
    var desc=''
    var url=''
    var elmsImg=jQuery(elt).find('.detail-photo img')
    var descElm=jQuery(elt).find('.detail-txt')
    var descElmTitle=jQuery('.graphic-content-container .graphic-title')
    if(descElm.length&&descElmTitle.length){
        var textOne=descElmTitle.text()
        var textTwo=descElm.text()
        desc=textOne+"--"+textTwo
    }
    if(jQuery('.graphic-content-container .head-img-mobile').length){
        url=YNBrowser.bgImgUrl(jQuery('.graphic-content-container .head-img-mobile').css('background-image'))
        url=urlP5(url);
        items.push({desc:desc,url:url});
    }
    if(elmsImg.length){
        for(var i=0;i<elmsImg.length;i++){
            url=elmsImg[i].src
            url=urlP5(url);
            items.push({desc:desc,url:url});
        }
    }
    if(items){
        YNBrowser.showSavePopup({items:items},elt)
    }
})
//首页
bgBtn('.galleries_layout','.image.copyright-contextmenu','.gallery_details__title')
smallBtn('.main_body_album  .grid-container .photo_thumbnail','right-bottom')//影集
showBtn('.following_tab .activity_item')//首页--关注
showBtn('.following_tab .graphic-txt-item')//首页--关注
showTip('.logged_in_home_layout__content_region .activity_tab ');
smallBtn('.photo_grid_region .full-aspect-ratio-photo-grid .photo_thumbnail','right-bottom')//我的转发/点赞
//个人中心
smallBtn('.lyby_userdetail .profile_body .photo_thumbnail','right-bottom')//代表作
bgBtn('.lyby_userdetail .setList .set_item','.top','.name')//影集
imgTetxBtn('.lyby_userdetail .cardLists','.card','.top-img','.title')//图文
// bgBtn('.lyby_userdetail .profile_header','.image')
//搜索区域
imgTetxBtn('.search_main_container .cardLists','.card','.top-img','.title')//图文
bgBtn('.search_main_container .galleries_body__grid .gallery_card_view','.top','.name')//影集
bgBtn('.search_main_container .lists','.top-img','.writing>h2')//图文
bgBtn('.search_main_container .user_item','.top')//背景
//兴趣部落
// https://500px.me/page/tribe/detail?tribeId=d008084a463d4d0eb6f80526f5f1abec&pagev=concentration
bgBtn('.tribe-detail-container .galleries_body__grid .gallery_card_view','.top','.name')//影集
showBtn('.tribe-detail-container .following_feed .activity_item')//精选
bgBtn('.search_main_container .quest_item','.top','.quest_card__quest_title')//活动
bgBtn('.tribe-detail-container .quest_item','.top','.quest_card__quest_title')//活动
imgTetxBtn('.tribe-detail-container .cardLists','.card','.top-img','.title')//活动
bgBtn('.tribe-detail-container .card-admin-container','.top')//背景
// 参赛
// https://500px.me/community/contest/131cee2ace4c4f729d43ae4ab8b0dad2/awards 已获奖
smallBtn('#profiles_show .profile_body .contest_prize_main>div','','normal')//影集
smallBtn('#profiles_show .profile_body .grid-container .photo_thumbnail')//全部作品
bgBtn('#profiles_show .profile_header','.image','.mask-content h3')//头部

bgBtn('.photo_grid_region_contest_v3 .quest_item','.top','.quest_card__quest_title')//活动列表  进行中,未进行,已结束

smallBtn('.contest_detail_main .profile_body .photo_thumbnail')//全部作品
bgBtn('.contest_detail_main .profile_header','.image','.mask-content h3')//头部

// https://500px.me/community/discover?t=story
bgBtn('.galleries_body__grid_region .gallery_card_view','.top','.name')//影集
bgBtn('.discovery-story-list-region .lists','.top-img','.writing>h2')//影集
imgTetxBtn('.discovery-story-list-region .cardLists','.card','.top-img','.title')//图文

smallBtn('.contest_detail_main div.imgs__item')//简介
imgTetxBtn('.contest_detail_main .prize-content-container .mobile-change','div.mobile','img')//最佳作品奖

