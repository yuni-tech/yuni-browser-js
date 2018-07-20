YNBrowser.ready(function() {
    function getCookie(cname){//获取cookies
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++){
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
      }
      return "";
    }
    if(window.history&&window.history.length){
      document.cookie="nowUrl="+window.history.length
    }else{
      document.cookie="nowUrl=0"
    }
    YNBrowser.track('._9eogI.E3X2T', function(elt) {
      if(window.history&&window.history.length&&window.history.length!=getCookie('nowUrl')){//进入新页面触发
        window.location.reload(true);
      }
      window.onpopstate = function (event) {//点击浏览器前进或者后退触发 第一次进来不触发
        window.location.reload(true);
      };
      if(jQuery('article._8Rm4L.M9sTE.h0YNM.SgTZ1').length||jQuery('.Nnq7C.weEfm').length){
        YNBrowser.showOptimizedTips("打开帖子保存图片或视频至相册")
      }else if(!jQuery('article._8Rm4L.M9sTE.h0YNM.SgTZ1').length&&!jQuery('.Nnq7C.weEfm').length&&!jQuery('.PUHRj.H_sJK').length){
        if(jQuery('.yn-optimized-tips').length){//去除提示
          jQuery('.yn-optimized-tips').remove()
        }
        var url=''
        var desc=''
        var shortcode_media=''
        var msg=[]
        if(_sharedData&&_sharedData.entry_data&&_sharedData.entry_data.PostPage){
          shortcode_media = _sharedData.entry_data.PostPage[0].graphql.shortcode_media
          if(jQuery(".gElp9").length&&jQuery(".gElp9 a[title='instagram']").length&&jQuery(".gElp9 span").length){
            desc=jQuery(jQuery(".gElp9")[0]).text().replace(/instagram/,'instagram  ')
          }
          if(shortcode_media.__typename =='GraphSidecar'){//多图 或多视频，或视频图片混杂
            var childSlides=shortcode_media.edge_sidecar_to_children
            var childSlide=childSlides.edges
            if(childSlides&&childSlide&&childSlide.length){
              for(var i=0;i<childSlide.length;i++){
                if(childSlide[i].node.is_video){
                  url=childSlide[i].node.video_url//视频文件
                }else{
                  url=childSlide[i].node.display_url
                }
                msg.push({url:url,desc:desc})
              }
              msg={title:"检查到"+childSlide.length+"个文件",items:msg}
            }
          }else{//单图或者单视频
            if(shortcode_media.is_video){
              url=shortcode_media.video_url||''
            }else{
              url=shortcode_media.display_url||''
            }
            msg={items: [{url: url,desc: desc}]}
          }
          YNBrowser.showSavePopup(msg)
        }
        // QBXjJ M9sTE h0YNM  SgTZ1
        if(location.pathname.indexOf(/p/)>=0&&!jQuery('.yn-popup-layer').length){
          window.location.reload(true);
        }
      }
      if(jQuery(document).find('.not-logged-in').length){
        jQuery('.yn-popup-layer').css('bottom','0');
      }else if(jQuery(document).find('.logged-in').length){
        jQuery('.yn-popup-layer').css('bottom','43px');
      }
    })
})