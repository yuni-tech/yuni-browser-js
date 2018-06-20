// if (!location.pathname.startsWith('/share/video')) {
//     return
// }

function appendDownloadBtn(type, selector, pasrams, savedatas, title, onClick) {
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        jQuery(elements).each(function(index, item) {
            var hasUrl=(jQuery(elements).find('video').css('display')=='none');
            console.log(hasUrl);
            var url='',desc='';
            var hasBtn = jQuery('html').find(className).length;
            if (hasBtn) {
                if(hasUrl){//ios
                    jQuery('html').find(className).css('display','none');
                }else{
                    jQuery('html').find(className).css('display','block');
                }
                return 
            }
            if (jQuery(item).find('video') && !jQuery('html').find(className).length && jQuery(item).find('video')[0]) {
                var url = jQuery(item).find('video')[0].src;
                if(jQuery(document).find('#pageletReflowVideo')){//android
                    desc=jQuery(document).find('#pageletReflowVideo .desc').text();
                }
                if(jQuery(item).find('#videoUser')){//ios
                    desc=jQuery(item).find('#videoUser .user-title').text();
                }
                savedatas=[{url:url,desc:desc}]
                htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
                jQuery(htmlTag).appendTo('html');
                url='';
                desc='';
                savedatas = '';
            }
        });
    });
}
jQuery('head').append('<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>');
jQuery('*').css('min-width', 0);
appendDownloadBtn(1, '#pageletReflowVideo .video-box'); //abdroid保存到相册
appendDownloadBtn(1, '#videoWrap'); //保存到ios