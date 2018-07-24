const path = require('path')
const fs = require('fs')

const fileMap = {
  "sites/inject.js": [
    "source/inject.js/compareVersion.js",
    "source/inject.js/jsbridge.js",
    "source/inject.js/core.js",
    "source/inject.js/dom.js",
    "source/inject.js/auto.js",
    "source/inject.js/legacy.js",
    "source/inject.js/longpress.js",
  ],
  "sites/inject.css": [
    "source/inject.css/button.css",
    "source/inject.css/popup.css",
    "source/inject.css/legacy.css"
  ]
}

for(var target in fileMap) {
  let content = ""
  let targetPath = path.resolve(__dirname, '..', target)
  fileMap[target].forEach(file => {
    let sourcePath = path.resolve(__dirname, '..', file)
    content += "\n\r" + fs.readFileSync(sourcePath, 'utf8')
  })
  fs.writeFileSync(targetPath, content, 'utf8')
}