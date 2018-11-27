YNBrowser.auto.trackSingleVideo('#app .video>video>source')
// 9宫格批量保存
function appendDownloadBtn(type, selector, pasrams, savedatas, title, onClick) {
    let htmlTag
    let className = YNBrowser.addClassName(type) // 要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, elements => {
        let urlTag = jQuery(elements).find('.reflow-content img')
        let n = urlTag.length
        if (!n) {
            return
        }
        if (n == 1) {
            type = 1
            className = YNBrowser.addClassName(1)
        } else {
            type = 3
            className = YNBrowser.addClassName(3)
        }
        let hasBtn = jQuery(elements).find(className).length
        if (hasBtn) {
            return
        }
        savedatas = []
        // 如果保存按钮已经存在
        if (!hasBtn) {
            // 如果保存按钮不存在
            urlTag.each((index, item) => {
                let url = '',
                    desc = ''
                // 微博结构变化
                let img = jQuery(item).attr('src')
                if (img && typeof img === 'string') {
                    url = img
                }
                if (url.startsWith('//')) {
                    url = 'http:' + url
                }
                // orj360--缩略图   large--原图
                desc = jQuery('.reflow-content .words').text()
                savedatas.push({ url, desc })
            })
            title = '检测到' + n + '个文件'
            htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick) // 添加元素
            jQuery(htmlTag).appendTo(elements)
        }
        url = ''
        desc = ''
        savedatas = ''
    })
}
appendDownloadBtn(3, '#app') // 九宫格