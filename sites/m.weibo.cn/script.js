//9宫格批量保存
function appendDownloadBtn(type, selector,pasrams, savedatas, title, onClick) {
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        var urlTag=jQuery(elements).find(".m-auto-list>li")
        var n=urlTag.length;
        if(!n){
            return
        }
        if(n==1){
            type=1;
            className = YNBrowser.addClassName(1);
        }else{
            type=3;
            className = YNBrowser.addClassName(3);
        }
        var hasBtn = jQuery(elements).find(className).length;
        if (hasBtn) { return }
        savedatas=[]
        //如果保存按钮已经存在
        if (!hasBtn) {
            //如果保存按钮不存在
            urlTag.each(function(index, item) {
                var url='',desc='';
                var tag=jQuery(item).find('.f-bg-img').css("backgroundImage");
                tag = /^url\((['"]?)(.*)\1\)$/.exec(tag);
                tag = tag ? tag[2] : "";
                // orj360--缩略图   large--原图
                // url = tag.substring(5, tag.length - 2).replace(/\/orj360\//,'/large/'); 
                url = tag.replace(/\/orj360\//,'/large/'); 
                desc=jQuery('.weibo-text').text();
                savedatas.push({url:url,desc:desc});
            });
            title='检测到'+n+'个文件';
            htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
            jQuery(htmlTag).appendTo(elements);
        }
        savedatas =[];
    });
}
//9宫格查看单张大图
function appendDownloadBtnOne(type, selector, pasrams, savedatas, title, onClick) {
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        var hasBtn=jQuery(elements).find(className)
        var ariaNotHidden=jQuery(elements).find('aria-hidden','false');//查看大图时false为显示大图，true为关闭查看大图
        var pswpHidden=jQuery(elements).find('.pswp__ui--hidden').length;
        if(pswpHidden){//大图隐藏停止函数执行
            return;
        }
        var url='',desc='';
        function getTransform(item){//获取transform判断当前元素url
            return item.css('transform').replace(/[^0-9\-,]/g,'').split(',')[4];
        }
        var stylePar=getTransform(jQuery(jQuery(elements).find('.pswp__container')[0]))
        var styleChild=jQuery(elements).find('.pswp__item')
        styleChild.each(function(index,item){
            var imgTag=jQuery(item).find('img.pswp__img').not('.pswp__img--placeholder')
            if((getTransform(jQuery(item))==stylePar||getTransform(jQuery(item))==-stylePar)&&imgTag.length){
                url=imgTag[0].src;
                if(!jQuery(document).find('.wb-item-wrap').length){
                    desc=jQuery('.weibo-text').text();
                }
                // desc=jQuery('.weibo-text').text();
            }
        })
        savedatas=[{url:url,desc:desc}];
        if(hasBtn.length){
            if(ariaNotHidden){
                hasBtn.css('display','block');
                jQuery(elements).find(className+" .yuni-btn-icon").data('savedatas',savedatas);
            }else if(!ariaNotHidden){
                hasBtn.css('display','none');
            }
            return
        }else if(!hasBtn.length){
            if(!title){
                title='检测到1个文件';
            }
            if(url){
                htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
                jQuery(htmlTag).appendTo(elements);
            }
        }
        savedatas ='';
    });
}
//视频文件
function appendBtnToVideo(type, selector,title, pasrams, savedatas,  onClick){
    var htmlTag, className = YNBrowser.addClassName(type),desc=''; //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        if(jQuery(elements).find(className).length){
            return
        }else if(!jQuery(elements).find('video').length){
            //如果没有video标签不执行添加元素函数
            return
        }
        //有video
        var videoUrl=jQuery(elements).find('video')[0].src
        if(!jQuery(document).find('.wb-item-wrap').length){
            desc=jQuery('.weibo-text').text();
        }
        savedatas=[{url:videoUrl,desc:desc}]
        htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
        jQuery(htmlTag).appendTo(elements);
        savedatas=[];
    })
}
YNBrowser.showOptimizedTips();
appendDownloadBtn(3, '.lite-page-wrap');//九宫格
appendDownloadBtnOne(1, '.pswp');//大图
appendBtnToVideo(1, '.card-video','检测到1个视频文件')