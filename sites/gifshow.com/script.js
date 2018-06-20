function appendDownloadBtn(type, selector, pasrams, savedatas, title, onClick) {
  var htmlTag, className = YNBrowser.addClassName(type); //要添加的元素 class名称
  YNBrowser.trackDOMElements(selector, function(elements) {
      jQuery(elements).each(function(index, item) {
        console.log(item);
          var hasBtn = jQuery(item).find(className).length;
          var url='',desc='';
          if (hasBtn){ //查看大图特别处理
              //百度查看大图获取objurl的信息
              return
          } 
          if (!hasBtn) {
              //如果保存按钮不存在
              if (!savedatas) {
                url=jQuery(item).find('#video-player')[0].src;
                desc=jQuery(item).find('#video-player').attr('alt');
                savedatas=[{url:url,desc:desc}];
              }
              htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick); //添加元素
              jQuery(htmlTag).appendTo(item);
          }
          savedatas ='';
      });
  });
}
appendDownloadBtn(2, '#video-box') ;


