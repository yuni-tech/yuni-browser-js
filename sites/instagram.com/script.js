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
    
    YNBrowser.track('._9eogI.E3X2T', function(elt) {
      if(!jQuery('article._8Rm4L.M9sTE.h0YNM.SgTZ1').length&&!jQuery('.Nnq7C.weEfm').length){
        if(jQuery('.yn-optimized-tips').length){//去除提示
          jQuery('.yn-optimized-tips').remove()
        }
        var url=''
        var desc=''
        YNBrowser.showSaveButton('.eLAPa .KL4Bh', {//图片
          onClick: function() {
              url=jQuery(elt).find('.KL4Bh>img')[0].src||''
              desc=jQuery(elt).find('.KL4Bh>img')[0].alt||''
              YNBrowser.save({
                url: url,
                desc: desc
              })
          }
        })
        YNBrowser.showSaveButton('.kPFhm', {//视频
          onClick: function() {
            if(jQuery('.kPFhm').find('video')[0].src.indexOf('blob:https://www.instagram.com/')>=0){
              //blob:https://www.instagram.com/开头的src替换为真正mp4路径
              if(jQuery(document).find("meta[property='og:video:secure_url']").length){
                url=jQuery(document).find("meta[property='og:video:secure_url']")[0].content
              }
            }else if(jQuery('.kPFhm').find('video')[0].src.indexOf('.mp4')>=0){
              //src包含MP4路径
              url=jQuery('.kPFhm').find('video')[0].src
            }
            if(jQuery(".gElp9").length&&jQuery(".gElp9 a[title='instagram']").length&&jQuery(".gElp9 span").length){
              desc=jQuery(".gElp9 span").text();
            }
            YNBrowser.save({
              url: url||'',
              desc: desc||''
            })
          }
        })
      }else if(jQuery('article._8Rm4L.M9sTE.h0YNM.SgTZ1').length||jQuery('.Nnq7C.weEfm').length){
        YNBrowser.showOptimizedTips("打开帖子保存图片或视频至相册")
        if(jQuery(document).find('.not-logged-in').length){
          jQuery('.yn-popup-layer.yn-optimized-tips').css('bottom','0');
        }else if(jQuery(document).find('.logged-in').length){
          jQuery('.yn-popup-layer.yn-optimized-tips').css('bottom','43px');
        }
      }
    })
})