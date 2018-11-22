// 9宫格批量保存
function appendDownloadBtn(type, selector, pasrams, savedatas, title, onClick) {
    let htmlTag
    let className = YNBrowser.addClassName(type) // 要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, elements => {
        let urlTag = jQuery(elements).find('.m-auto-list>li')
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
                let tag = YNBrowser.bgImgUrl(
                    jQuery(item)
                        .find('.f-bg-img')
                        .css('backgroundImage')
                )
                let img = jQuery(item)
                    .find('.m-img-box img')
                    .attr('src')
                if (img && typeof img === 'string') {
                    url = img
                } else if (tag && typeof tag === 'string') {
                    url = tag
                }
                if (url.startsWith('//')) {
                    url = 'http:' + url
                }
                // orj360--缩略图   large--原图
                url = url.replace(/\/orj360\//, '/large/')
                desc = jQuery('.weibo-text').text()
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
// 9宫格查看单张大图
function appendDownloadBtnOne(type, selector, pasrams, savedatas, title, onClick) {
    let htmlTag
    let className = YNBrowser.addClassName(type) // 要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, elements => {
        let hasBtn = jQuery(elements).find(className)
        let ariaNotHidden = jQuery(elements).attr('aria-hidden') // 查看大图时false为显示大图，true为关闭查看大图
        if (ariaNotHidden == 'true') {
            // 大图隐藏停止函数执行
            return
        }
        let url = '',
            desc = ''
        function getTransform(item) {
            // 获取transform判断当前元素url
            return parseInt(
                item
                    .css('transform')
                    .replace(/[^0-9\-,]/g, '')
                    .split(',')[4]
            )
        }
        let stylePar = getTransform(jQuery(jQuery(elements).find('.pswp__container')[0]))
        let styleChild = jQuery(elements).find('.pswp__item')
        styleChild.each((index, item) => {
            // 找到高清图不是缩略图 '.pswp__img--placeholder'为缩略图
            let imgTag = jQuery(item)
                .find('img.pswp__img')
                .not('.pswp__img--placeholder')
            if (!url && getTransform(jQuery(item)) + stylePar == '0' && imgTag.length) {
                url = imgTag[0].src
            }
        })
        savedatas = [{ url, desc }]
        if (hasBtn.length) {
            hasBtn.css('display', 'block')
            jQuery(elements)
                .find(className + ' .yuni-btn-icon')
                .data('savedatas', savedatas)
            return
        } else if (!hasBtn.length) {
            if (!title) {
                title = '检测到1个文件'
            }
            if (url) {
                htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick) // 添加元素
                jQuery(htmlTag).appendTo(elements)
            }
        }
        url = ''
        desc = ''
        savedatas = ''
    })
}
// 视频文件
function appendBtnToVideo(type, selector, title, pasrams, savedatas, onClick) {
    let htmlTag
    let className = YNBrowser.addClassName(type) // 要添加的元素 class名称
    YNBrowser.trackDOMElements(selector, elements => {
        let videoUrl = jQuery(elements).find('video')[0].src
        let hasBtn = jQuery(elements).find(className)
        if (hasBtn.length) {
            return
        } else if (!videoUrl && !(typeof videoUrl === 'string')) {
            // 如果没有video标签不执行添加元素函数
            return
        }
        // 有video
        if (videoUrl) {
            let desc = ''
            savedatas = [{ url: videoUrl, desc }]
            htmlTag = YNBrowser.showDownloadBtns(type, pasrams, savedatas, title, onClick) // 添加元素
            jQuery(htmlTag).appendTo(elements)
        }
        url = ''
        desc = ''
        savedatas = ''
    })
}
YNBrowser.showOptimizedTips()
appendDownloadBtn(3, '.lite-page-wrap') // 九宫格
appendDownloadBtnOne(1, '.pswp') // 大图
// appendBtnToVideo(1, '.card-video', '检测到1个视频文件')
appendBtnToVideo(1, '.video-player', '检测到1个视频文件') // 微博视频新结构
