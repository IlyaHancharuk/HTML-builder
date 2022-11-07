const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'secret-folder')

fs.readdir(dir, {withFileTypes: true}, (error, files) => {
  if (error) return console.error(error.message)
  files.forEach((file) => {
    let filePath = dir + '\\' + file.name.toString()
    let filename = path.basename(file.name.toString(), path.extname(file.name.toString()))
    let extname = path.extname(filePath)
    if (file.isFile()) {
      fs.stat(filePath, (error, stats) => {
        if (error) return console.error(error.message)
        let filesize = (stats.size / 1024).toFixed(3)
        console.log(`${filename} - ${extname} - ${filesize}kb`)
      })
    }
  })
})
