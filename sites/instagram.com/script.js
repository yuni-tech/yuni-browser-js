// Instagram 的帖子
// 数据结构非常工整，各种信息都可以从这里获取 _sharedData.entry_data.PostPage[0].graphql.shortcode_media
// 多图 https://www.instagram.com/p/Bjt_vMAhiFy/
// 单张图 https://www.instagram.com/p/Bj9w3BTHawn/
// 单视频 https://www.instagram.com/p/BjpXwUZB2eq/
// if (location.pathname.startsWith('/p/')) {
//   // 媒体数据
//   var shortcode_media = _sharedData.entry_data.PostPage[0].graphql.shortcode_media

//   // 其中 shortcode_media.__typename 有三个值：GraphSidecar 表示多张图片视频，GraphVideo 表示单个视频，GraphImage 表示单张图片
//   var isMulti = (shortcode_media.__typename == 'GraphSidecar')
//   // 文件数
//   var filecount = (isMulti ? shortcode_media.edge_sidecar_to_children.edges.length : 1)
//   // 标题
//   var captionText = shortcode_media.edge_media_to_caption.edges[0].node.text

//   // 获取可下载文件地址
//   var urls = getUrlsFromNode(shortcode_media)
//   // 每个下载的文件，都用一样的标题
//   var downloadObjs = []
//   for(i=0; i<urls.length; i++) {
//     downloadObjs.push({'url': urls[i], 'desc': captionText})
//   }
//   console.info('下载列表：', downloadObjs)
//   var onClick = function() {
//     JSBridge.Browser.download(downloadObjs)
//   }
//   var title = '检测到 ' + filecount + ' 个文件'

//   // 添加下载工具
//   htmlTag = YNBrowser.showDownloadBtns(1, '', urls[0], title, onClick)
//   jQuery(htmlTag).appendTo('html')
// }

// // 获取可下载文件的地址
// function getUrlsFromNode(node) {
//   var urls = []
//   switch(node.__typename) {
//     case 'GraphImage': // 单张图
//       urls.push(node.display_url)
//       break
//     case 'GraphVideo': // 单个视频
//       urls.push(node.video_url)
//       break
//     case 'GraphSidecar': // GraphSidecar 多张图片视频，
//       // 里面的edge_sidecar_to_children.edges包含多个GraphImage或GraphVideo
//       edges = node.edge_sidecar_to_children.edges
//       for(i=0; i<edges.length; i++) {
//         subnode = edges[i].node
//         // 取出每一张的文件地址
//         if(subnode.__typename == 'GraphImage') {
//           urls.push(subnode.display_url)
//         } else if(subnode.__typename == 'GraphVideo') {
//           urls.push(subnode.video_url)
//         } else {
//           console.warn('unknown __typename:', subnode.__typename)
//         }
//       }
//       break
//     default:
//       console.info('Unknown media type: ' + node.__typename)
//   }
//   return urls
// }
YNBrowser.ready(function() {
    // 多图 https://www.instagram.com/p/Bjt_vMAhiFy/
    // 单张图 https://www.instagram.com/p/Bj9w3BTHawn/
    // 单视频 https://www.instagram.com/p/BjpXwUZB2eq/
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
      if(window.history&&window.history.length&&window.history.length!=getCookie('nowUrl')){
        window.location.reload(true);
      }
      if(!jQuery('article._8Rm4L.M9sTE.h0YNM.SgTZ1').length&&!jQuery('.Nnq7C.weEfm').length){
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
            desc=jQuery(".gElp9 span").text();
          }
          console.log(shortcode_media);
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
      }else if(jQuery('article._8Rm4L.M9sTE.h0YNM.SgTZ1').length||jQuery('.Nnq7C.weEfm').length){
        YNBrowser.showOptimizedTips("打开帖子保存图片或视频至相册")
      }
      if(jQuery(document).find('.not-logged-in').length){
        jQuery('.yn-popup-layer').css('bottom','0');
      }else if(jQuery(document).find('.logged-in').length){
        jQuery('.yn-popup-layer').css('bottom','43px');
      }
    })
})