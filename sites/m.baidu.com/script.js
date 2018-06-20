function appendDownloadBtn(type, selector, hideTag, pasrams, savedatas, title, onClick) {
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        jQuery(elements).each(function(index, item) {
            var hasBtn = jQuery(item).find(className).length;
            //如果保存按钮已经存在
            var currentTarget = jQuery(item).find('.current img'); //当前图片
            //热门推荐查看大图的desc
            if(selector=='.c-album-slider'&&jQuery(item).next('.c-album-text').length){
                desc=jQuery(item).next('.c-album-text').text().replace(/[\r\n\s+]/g,"");
            }
            if (hasBtn && currentTarget.length) { //查看大图特别处理
                //百度查看大图获取objurl的信息
                var objurl='',desc='';
                if (!savedatas) {
                    if (currentTarget[0].dataset.objurl) {
                        objurl = currentTarget[0].dataset.objurl;
                    } else if (currentTarget[0].src) {
                        objurl = currentTarget[0].src;
                    }
                    savedatas=[{url:objurl,desc:desc}];
                }
                jQuery(item).find(className+' .yuni-btn-icon').data("savedatas", savedatas);
                if (jQuery(item).find('.current ' + hideTag).length) { //下拉显示详细信息时收起保存到相册按钮 更多推荐时
                    jQuery(item).find(className)[0].style['display'] = 'none';
                } else {
                    jQuery(item).find(className)[0].style['display'] = 'block';
                }
            } else if (hasBtn) { return }
            if (!hasBtn) {
                //如果保存按钮不存在
                if (!savedatas) {
                    var url='',desc='';
                    //热门推荐的desc
                    if(jQuery(item).prev('.hotPicTitle').length){
                        //去掉回车换行空格
                        desc=jQuery(item).prev('.hotPicTitle').text().replace(/[\r\n\s+]/g,"");
                    }
                    //图片热搜榜的desc
                    if(selector=='div.waterfallRight>a'||selector=='div.waterfallLeft>a'&&jQuery(item).find('span').length){
                        desc=jQuery(item).find('span').text().replace(/[\r\n\s+]/g,"");
                    }
                    //热门推荐查看大图的desc
                    if (currentTarget.length) { //查看大图特别处理
                        //百度查看大图获取objurl的信息
                        if (currentTarget[0].dataset.objurl) {
                            url = currentTarget[0].dataset.objurl;
                        } else if (currentTarget[0].src) {
                            url = currentTarget[0].src;
                        }
                    } else if (jQuery(item).find('img').length) { //未传递url获取第一个img类型url
                        url = jQuery(item).find('img')[0].src;
                    } else if (jQuery(item).css("backgroundImage")) { //未传递url获取自身背景图片
                        url = (jQuery(item).css("backgroundImage")).substring(5, (jQuery(item).css("backgroundImage")).length - 2)
                    } else if (jQuery(item).find('.img-item').length && jQuery(jQuery(item).find('.img-item')[0]).css("backgroundImage")) {
                        url = (jQuery(item).find('.img-item')[0].css("backgroundImage")).substring(5, (jQuery(item).find('.img-item')[0].css("backgroundImage")).length - 2) 
                    }
                    if(selector=='.c-album-slider'&&jQuery(item).next('.c-album-text').length){
                        desc=jQuery(item).next('.c-album-text').text().replace(/[\r\n\s+]/g,"");
                    }
                    savedatas=[{url:url,desc:desc}];
                }
                htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
                jQuery(htmlTag).appendTo(item);
            }
            savedatas ='';
        });
        if (jQuery('.sfc-image-content-mediacy').length) { //m.baidu.com查看大图
            watchAttr('.sfc-image-content-mediacy');
        }
        if (jQuery('.c-album-slider').length) { //http://image.baidu.com/第一张左滑dom结构无变化
            watchAttr('.c-album-slider');
        }
    });
}
//监听属性变化 m.baidu.com查看大图
function watchAttr(selecter, callback, option) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (!callback) {
        callback = function(mutations) {
            mutations.forEach(function(mutation) {
                if (jQuery(mutation.target).hasClass('current')) {
                    var currentTarget = jQuery(mutation.target).find('img'),
                        objurl,savedatas,desc;
                    //热门推荐查看大图的desc
                    if(selecter=='.c-album-slider'&&jQuery(selecter).next('.c-album-text').length){
                        desc=jQuery(selecter).next('.c-album-text').text().replace(/[\r\n\s+]/g,"");
                    }
                    if (currentTarget.length) {
                        if (currentTarget[0].dataset.objurl) {
                            objurl = currentTarget[0].dataset.objurl;
                        } else if (currentTarget[0].src) {
                            objurl = currentTarget[0].src;
                        }
                        savedatas=[{url:objurl,desc:desc}]
                        jQuery(selecter).find('.yuni-btn-icon').data("savedatas", savedatas);
                    }
                }
            });
        };
    }
    var mo = new MutationObserver(callback);
    if (!option) {
        var option = {
            // 'childList': true, //childList属性只观察子节点的新建与删除,子节点本身的任何变化都不会去理会 
            'subtree': true, //subtree属性让观察行为进行"递归",这时,以target节点为根节点的整棵DOM树发生的变化都可能会被观察到
            'attributes': true, //监听属性变化
            'attributeFilter': ["class"], //过滤器
        };
    }
    mo.observe(jQuery(selecter)[0], option);
}
//http://image.baidu.com/channelgif/detail?word=%E8%90%8C%E5%AE%A0&pn=35&spn=0 gif查看大图
function appendToGif(type, selector, pasrams, savedatas, title, onClick) { //image查看gif
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var callback = function(mutations) {
            mutations.forEach(function(mutation) {
                var desc=jQuery(selector).find('.gif-detailpage-picdesc').text()
                savedatas = [{url:mutation.target.src,desc:desc}]
                    //如果保存按钮已经存在
                var item = jQuery('.gif-detail-slider');
                var hasBtn = item.find(className).length;
                if (hasBtn) { //查看大图特别处理
                    item.find('.yuni-btn-icon').data("savedatas", savedatas);
                } else if (!hasBtn) {
                    //如果保存按钮不存在
                    htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
                    jQuery(htmlTag).appendTo(item);
                }
                savedatas = '' //url置空
            })
        };
        var mo = new MutationObserver(callback);
        var option = {
            // 'childList': true, //childList属性只观察子节点的新建与删除,子节点本身的任何变化都不会去理会 
            'subtree': true, //subtree属性让观察行为进行"递归",这时,以target节点为根节点的整棵DOM树发生的变化都可能会被观察到
            'attributes': true, //监听属性变化
            'attributeFilter': ["src"], //过滤器
        };
        mo.observe(jQuery('.gif-detail-item')[1], option);
        //刷新或者点击后退再进来img没有变化
        var item = jQuery('.gif-detail-slider');
        var hasBtn = item.find(className).length;
        if (!hasBtn && jQuery(jQuery('.gif-detail-item')[1]).find('img')[1] && jQuery(jQuery('.gif-detail-item')[1]).find('img')[1].src) {
            var url = jQuery(jQuery('.gif-detail-item')[1]).find('img')[1].src
            var desc=jQuery(selector).find('.gif-detailpage-picdesc').text()
            savedatas = [{url:url,desc:desc}]
            htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
            jQuery(htmlTag).appendTo(item);
        }
    });
}
//左右两列布局 监听父级元素  循环给子元素加按钮
function appendToVertical(type, selector, childTag, pasrams, savedatas, title, onClick) {
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        jQuery(elements).each(function(i, element) {
            jQuery(element).find(childTag).each(function(index, item) {
                var hasBtn = jQuery(item).find(className).length;
                if (hasBtn) { return }
                var url='',desc='';
                if(selector=='.sfc-image-content-feedscover'&&jQuery(element).find('.sfc-image-content-feeds-wrap').length){
                    //百度搜索上的精选图集
                    desc=jQuery(element).find('.sfc-image-content-feeds-wrap').text().replace(/[\r\n\s+]/g,"");
                }
                if(selector=='.atlas-list-view'&&jQuery(item).parents('.box').prev('h3').length){
                    //http://image.baidu.com/wisehomepage/feeds/atlas?word=%E8%90%8C%E5%AE%A0&reqfdi=0&fmpage=result&pos=pstab&uistyle=2&pn=0&rn=10&index=1
                    desc=jQuery(item).parents('.box').prev('h3').text().replace(/[\r\n\s+]/g,"");
                }
                if (jQuery(item).find('img').length) {
                    url = jQuery(item).find('img')[0].src;
                } else if (jQuery(item).css("backgroundImage")) { //未传递url获取自身背景图片
                    url = (jQuery(item).css("backgroundImage")).substring(5, (jQuery(item).css("backgroundImage")).length - 2)
                }
                savedatas=[{url:url,desc:desc}]
                htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
                jQuery(htmlTag).appendTo(item);
                savedatas = ''
                    //监听图片替换
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                var callback = function(mutations) {
                    mutations.forEach(function(mutation) {
                        var hasBtn = jQuery(item).find(className).length;
                            //如果保存按钮已经存在
                        if (hasBtn) { //查看大图特别处理
                            savedatas=[{url:mutation.target.src,desc:''}]
                            jQuery(item).find(className).data("savedatas", savedatas);
                        }
                        savedatas='' //savedatas置空
                    })
                    return
                };
                var mo = new MutationObserver(callback);
                var option = {
                    // 'childList': true, //childList属性只观察子节点的新建与删除,子节点本身的任何变化都不会去理会 
                    'subtree': true, //subtree属性让观察行为进行"递归",这时,以target节点为根节点的整棵DOM树发生的变化都可能会被观察到
                    'attributes': true, //监听属性变化
                    'attributeFilter': ["src"], //过滤器
                };
                mo.observe(jQuery(item).find('img')[0], option)
            });
        })
    });
}

function appendBigAbout(type, selector, hideTag, pasrams, savedatas, title, onClick) {
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        jQuery(elements).each(function(index, item) {
            var hasBtn = jQuery(item).find(className).length;
            //如果保存按钮已经存在
            if (hasBtn) { //查看大图特别处理
                jQuery(item).find(className).data("savedatas", savedatas);
                if (jQuery(item).find(hideTag).length) {
                    jQuery(item).find(className)[0].style['display'] = 'block';
                } else {
                    jQuery(item).find(className)[0].style['display'] = 'none';
                }
            }
            // else if (hasBtn) { return }
            if (!hasBtn) {
                htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
                jQuery(htmlTag).appendTo(jQuery(item).find('.sfc-image-content-mediacy-imgbox-scale'));
            }
            savedatas = ''
        });
    });
}

function initPage() {
    // image.baidu.com
    appendDownloadBtn(2, '.imgitem');
    appendDownloadBtn(2, 'div.hotPicImg');
    appendDownloadBtn(2, 'div.waterfallLeft>a');
    appendDownloadBtn(2, 'div.waterfallRight>a');
    appendDownloadBtn(1, '.mediacysearch'); //http://image.baidu.com/search/wiseala?tn=wiseindex&active=1&ie=utf8&fmpage=index&pos=listimg&word=%E5%8C%97%E5%A0%82%E5%A2%A8%E6%9F%93&cate=1&pn=1&adtype=&adid=&rpn=-1&spn=&gsm=78&simid=0%2C0&u=853026532&di=30039241790&os=2315413515%2C2736488154&adpicid=&pi=&bdtype=11&objurl=http%3A%2F%2Fimg2015.zdface.com%2F20180503%2F12316fce294794ff01dcf059d86afa52.jpg
    //有desc
    setTimeout(function(){//延迟一秒以免加载不到desc
        appendDownloadBtn(1, '.c-album-slider', '.c-album-advice');
    },1000)
    appendDownloadBtn(2, '.items'); //age.baidu.com/channelgif/tag?fr=searchresult&frword=萌宠&word=萌宠
    appendToGif(1, '#app .detail-page', ['bottom105']); //http://image.baidu.com/channelgif/detail?word=%E8%90%8C%E5%AE%A0&pn=9&spn=0
    appendToVertical(2, '#app .channel-page', '.waterlayout .img'); //动图频道 http://image.baidu.com/channelgif/result?word=%E8%90%8C%E5%AE%A0
    appendToVertical(2, '#app .result-page', '.waterlayout .img');
    appendDownloadBtn(2, '.feedbannerContainer .img'); //精选图集
    appendToVertical(2, '.imglist', '.waterfall-wrap'); //gif
    //m.baidu.com
    appendDownloadBtn(2, '.contentImg');

    appendDownloadBtn(2, '.img-wrap');
    appendDownloadBtn(2, '.sfc-image-content-resutl-tpl-sets-left');
    appendDownloadBtn(2, '.sfc-image-content-resutl-tpl-sets-right-top');
    appendDownloadBtn(2, '.sfc-image-content-resutl-tpl-sets-right-bot');
    appendToVertical(2, '.sfc-image-content-waterfall', '.sfc-image-content-resutl-tpl-single-img'); //阅读模式
    appendToVertical(2, '.sfc-image-content-waterfall', '.sfc-image-content-resutl-tpl-sets-top'); //阅读模式
    appendToVertical(2, '.sfc-image-content-waterfall', '.sfc-image-content-tpl-sets-bottom-left'); //阅读模式
    appendToVertical(2, '.sfc-image-content-waterfall', '.sfc-image-content-tpl-sets-bottom-right'); //阅读模式
    appendToVertical(2, '.sfc-image-content-waterfall', '.sfc-image-content-resutl-tpl-sets-left'); //阅读模式
    appendToVertical(2, '.sfc-image-content-waterfall', '.sfc-image-content-resutl-tpl-sets-right-top'); //阅读模式
    appendToVertical(2, '.sfc-image-content-waterfall', '.sfc-image-content-resutl-tpl-sets-right-bot'); //阅读模式

    // atlas-list-view desc--ok
    appendToVertical(2, '.atlas-list-view', '.box .img-holder', ['small']);
    appendToVertical(2, '.atlas-list-view', '.box .img');

    appendToVertical(2, '.sfc-image-content-feedscover', '.sfc-image-content-feeds-wrap');
    //百度搜索无desc
    appendToVertical(2, '.sfc-image-content-waterfall-vertical-list', '.sfc-image-content-norcell');
    //查看大图 无desc
    appendDownloadBtn(1, '.sfc-image-content-mediacy-slider-inner', '.sfc-image-content-mediacy-item-bgc'); //current 下的img sfc-image-content-mediacy-info--其他内容
    //无desc
    YNBrowser.trackDOMElements('.sfc-image-content-mediacy-item-bgc', function(elements) {//查看大图的附带查看关联图
        jQuery(elements).on('click', '.c-img-x', function(e) {
            var url = (jQuery(e.currentTarget).css("backgroundImage")).substring(5, (jQuery(e.currentTarget).css("backgroundImage")).length - 2)
            savedatas=[{url:url,desc:''}];
            appendBigAbout(2, '.sfc-image-content-mediacy-imgcontainer-box', '.sfc-image-content-mediacy-imgbox-scale', '', savedatas);
        })
    })
}
initPage(); //函数调用