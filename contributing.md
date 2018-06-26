# 如何参与开发

## 流程

> 以下假设有一个叫`zzmingo`用户参与

### Fork/PullRequest

首先需要了解`Github Fork/PullRequest`方式参与源代码协作，步骤如下：


1. Fork本项目`yuni-tech/yuni-browser-js`到你自己的库中，会自动创建`zzmingo/yuni-browser-js`项目
2. 添加或修改代码后提交到`zzmingo/yuni-browser-js`
3. 向`yuni-tech/yuni-browser-js`的`develop`分支提交`Pull Request`
4. 等待我们的审核，审核通过后会进行合并


### 编写代码前的准备

1. git clone zzmingo/yuni-browser-js
2. cd local/path/to/yuni-browser-js
3. npm install

### 安装chrome开发插件

1. 打开chrome的扩展程序管理器：chrome://extensions/
2. 右上角开启`开发者模式`
3. 点击`加载已解压的扩展程序`
4. 定位到`local/path/to/yuni-browser-js/chrome-dev-plugin`

> 到这里准备工作完成

### 针对某个特定网站优化

假设有一个网站为 `https://[host]/[path]...` 其中`host`为域名部分，`path`为路径

> 比如：https://cn.bing.com/images/...

1. 在sites文件创建[host]文件夹，比如 `cn.bing.com`
2. 创建两个文件 `style.css`、`script.js`
3. `style.css` 用于优化网站内容样式
4. `script.js` 用于实现在DOM元素中添加保存资源和优化功能

### 使用开发服务器

1. `npm run serve` 启动开发服务器
2. 使用chrome打开对应的网站，如： `https://cn.bing.com/images/...`
3. 更改 `style.css`、`script.js`，刷新浏览器查看变化

### 例子

启动开发服务器后，可以打开`examples`下的页面查看效果

* http://localhost:15069/examples/single-image.html
* http://localhost:15069/examples/video.html
* http://localhost:15069/examples/imagelist.html
* http://localhost:15069/examples/just-tips.html

在`sites/localhost` 查看 `style.css`、`script.js` 所完成的相关功能

### 关于https

原因：有些网站是https的要想加载localhost的代码必须要求localhost开启https服务器，并且是使用可信证书

做法：让你的开发机子完全信任`certificate/localhost.cer`证书

具体步骤(macOS)：
1. 找到项目中的`certificate/localhost.cer`文件，双击，输入密码，进入钥匙串访问。
2. 在窗口的左侧栏选中`系统`，左侧栏下方选中`证书`，右侧就会出现本机中的证书列表，找到localhost并双击，进入证书详情。
3. 进入证书的详情后，展开一个`信任`列表，把 `使用此证书时`设为始终信任。


## 说明

* 目前只接收`sites`文件夹下创建网站相关的代码，即`style.css`、`script.js`

## API

以下API在开发和正式环境中由与你内部库提供，包含一些必要的函数和一些辅助快捷开发的函数

### YNBrowser.save(options)

调用`与你客户端`上传资源到相册的功能

Code:

```js
// 假设得到以下数据
var url = "https://..../beauty.jpg"
var desc = "一张美丽的图片"
var url2 = "https://..../man.jpg"
var desc2 = "这是一个坚强男人"

// 单个图片url
YNBrowser.save(url)
YNBrowser.save({ url: url })

// 带上描述
YNBrowser.save({
  url: url,
  desc: desc
})

// 多张图片url
YNBrowser.save([url, url2])

// 多张图片，并且带上描述
YNBrowser.save([{
  url: url,
  desc: desc
}, {
  url: url2,
  desc: desc2
}])
```

### YNBrowser.track(selector, callback)

跟踪某些元素的出现，如果已经出现立即调用 callback

参数说明：
* selector：css选择器，比如：.cn-bing .image-container
* callback: 当有相应的元素出现时会调用，第一参数为对应的元素

Code: 

```js
YNBrowser.track('.cell', function(elt) {
  console.log(elt) // 满足.cell选择器的elt出现了
})
```

### YNBrowser.showSaveButton(elt, options, onClick)

向某个元素添加`与你保存按钮`

参数说明:
* elt: 向哪个元素添加保存按钮
* options: 可选，参数
  * options.size small/normal/large 默认为normal
  * options.position left-top/right-top/left-bttom/right-bottom 默认为right-top
  * options.onClick 这个参数与onClick一样，但优先使用第三个参数onClick
* onClick: 可选，当点击时调用，通常这里处理保存图片的操作

```js
YNBrowser.showSaveButton(elt, function() {
  console.log('点击了保存')
})

YNBrowser.showSaveButton(elt, {
  size: 'large',
  position: 'left-bottom',
  onClick: function() {
    console.log('点击了保存')
  }
})
```

### YNBrowser.showSavePopup(options)

显示保存popup

参数说明:
* options.title: 可选，要显示的提示文案
* options.items: 要保存的内容，与`YNBrowser.save(options)`中的options参数一致

```js
YNBrowser.showSavePopup({
  items: [url]
})

YNBrowser.showSavePopup({
  items: [{
    url: url,
    desc: desc
  }]
})
```

### YNBrowser.showOptimizedTips(title)

显示网页已被优化的提示

参数说明：
* title: 可选，自定义提示文案

```js
YNBrowser.showOptimizedTips("网站已优为适合移动设备")
```

## 高级API

高级API基于上面的API提供更方便的一键式调用

### YNBrowser.auto.trackSingleImage(selector)

在单图页面，自动跟踪指定图片，并显示底部下载保存界面

参数说明：
* selector: img标签的选择器

```js
YNBrowser.auto.trackSingleImage('.content .center .large-img')
```

### YNBrowser.auto.trackSingleVideo(selector)

在单图页面，自动跟踪指定图片，并显示底部下载保存界面

参数说明：
* selector: video标签的选择器

```js
YNBrowser.auto.trackSingleVideo('.video-container > .main-video')
```

### YNBrowser.auto.trackMultipleImages(options)

在多图页面，自动跟踪指定的某些图片，并显示保存按钮

参数说明：
* options: 参数对象
* options.selector 跟踪哪些元素
* options.findUrl {String/Function} 如果查找有图片url的元素，通常是指如何找img标签
* options.attr 通过findUrl查找到的元素，取哪一个属性的值作为url，如果是img标签，通常是src

```js
YNBrowser.auto.trackMultipleImages({
  selector: '.cell',
  findUrl: 'img', // optinal
  attr: 'src' // optional
})
```


