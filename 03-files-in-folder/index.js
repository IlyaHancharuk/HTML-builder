const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'secret-folder')

fs.readdir(dir, {withFileTypes: true}, (error, files) => {
  if (error) return console.error(error.message)
  files.forEach((file) => {
    let filePath = path.join(dir, file.name.toString())
    let fileName = path.basename(filePath, path.extname(filePath))
    let extName = path.extname(filePath)
    if (file.isFile()) {
      fs.stat(filePath, (error, stats) => {
        if (error) return console.error(error.message)
        let fileSize = (stats.size / 1024).toFixed(3)
        console.log(`${fileName} - ${extName} - ${fileSize}kb`)
      })
    }
  })
})
