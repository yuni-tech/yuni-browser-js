function appendDownloadBtn(type, selector, pasrams, savedatas, title, onClick) {
    var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, function(elements) {
        jQuery(elements).each(function(index, item) {
            var hasBtn = jQuery(item).find(className).length;
            //如果保存按钮已经存在
            if (hasBtn) { return }
            if (!hasBtn) {
                var url='',desc='';
                //如果保存按钮不存在
                if (!savedatas) {
                    if (jQuery(item).find('a.iusc') && jQuery(item).find('a.iusc').attr('m')) {
                        url = JSON.parse(jQuery(item).find('a.iusc').attr('m')).murl //获取url
                        savedatas=[{url:url,desc:desc}];
                    }
                }
                htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
                jQuery(htmlTag).appendTo(jQuery(item).find('.img_cont'));
            }
            savedatas = ''
        });
    });
}
appendDownloadBtn(2, 'li[data-idx]',['small']); //https://cn.bing.com/images/search?q=%e8%8b%b9%e6%9e%9cWWDC+2018%e5%bc%80%e5%8f%91%e8%80%85%e5%a4%a7%e4%bc%9a&FORM=HDRSC2
// appendDownloadBtn(1, '#detail_img'); //https://cn.bing.com/images/search?q=%e8%8b%b9%e6%9e%9cWWDC+2018%e5%bc%80%e5%8f%91%e8%80%85%e5%a4%a7%e4%bc%9a&FORM=HDRSC2