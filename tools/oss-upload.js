const fs = require('fs')
const path = require('path')
const glob = require('glob')
const OSS = require('ali-oss')
const co = require('co')

const basePath = path.resolve(__dirname, '../sites')
const files = glob.sync(path.resolve(basePath, '**/*.*'))

const tasks = []

files.forEach(file => {
  const name = path.join('browser', path.relative(basePath, file))
  if (fs.statSync(file).isDirectory()) {
    return
  }
  tasks.push({
    name,
    file
  })
})

console.log(`start uploading to [${process.env.OSS_REGION}:${process.env.OSS_BUCKET}], task count: ${tasks.length}`)

const client = new OSS({
  region: process.env.OSS_REGION,
  bucket: process.env.OSS_BUCKET,
  accessKeyId: process.env.OSS_APPID,
  accessKeySecret: process.env.OSS_APP_SECRET,
})

co(function* () {
  let uploads = tasks.slice(0)
  while(uploads.length > 0) {
    let item = uploads.shift()
    console.log('uploading ' + item.name)
    var result = yield client.put(item.name, item.file)
    console.log('upload success: ' + result.name)
  }
  console.log('upload completed !')
}).catch(function (err) {
  console.error('upload error: ')
  console.error(err)
})








