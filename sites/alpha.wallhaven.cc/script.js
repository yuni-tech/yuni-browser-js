(function() {
    // wallhaven没有针对手机排版，注入优化
    // $('head').append('<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>');
    $('*').css('min-width', 0);

    // 在缩略图页面 toplist/random 等
    var thumbsContainer = document.querySelector('.thumbs-container');
    if (thumbsContainer) {
        $('#searchbar').css('position', 'fixed').css('display', '-webkit-box');
        $('#header').css('position', 'fixed');
    }

    // 在单图浏览页面
    if (location.pathname.startsWith('/wallpaper/')) {
        $('#header').hide();
        $('#searchbar').hide();

        $('body').append('<div class="yuni-download-tool"><button class="yuni-download-btn">下载到与你相册</button></div>')
        var downloadBtn = $('.yuni-download-btn')
        downloadBtn.click(function() {
            ({
                // 图片URL格式：//wallpapers.wallhaven.cc/wallpapers/full/wallhaven-212126.jpg
                url: 'https:' + $('#wallpaper').attr('src')
            }).then((resp) => {})
            YNBrowser.clickAnalysis(location.hostname);
        })
    }

})();