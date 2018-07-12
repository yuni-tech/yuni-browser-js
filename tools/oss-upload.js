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

function uploadNext(uploads, complete) {
  let item = uploads.shift()
  if (!item) {
    complete()
    return
  }
  console.log('uploading ' + item.name)
  client.put(item.name, item.file).then(result => {
    console.log('upload result: ' + result.name + ' ' + result.res.status)
    if (result.res.status != 200) {
      complete(new Error('status not 200'))
      return
    }
    setTimeout(() => {
      uploadNext(uploads, complete)
    }, 200)
  }).catch(error => {
    complete(error)
  })
}

uploadNext(tasks.slice(0), (error) => {
  if (error) {
    console.log('upload error: ')
    console.log(error)
  }
  setTimeout(() => {
    console.log('upload complete!')
  }, 5000)
})








