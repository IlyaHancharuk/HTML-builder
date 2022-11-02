const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname)

function read (dir) {
  fs.readdir(dir, {withFileTypes: true}, (error, files) => {
    if (error) return console.error(`1 ${error.message}`)
    /* console.log(files); */
    files.forEach((file) => {
      let filePath = dir + '\\' + file.name.toString()
      let filename = path.basename(file.name.toString(), path.extname(file.name.toString()))
      let extname = path.extname(filePath)
      if (file.isFile() || extname) {
        fs.stat(filePath, (error, stats) => {
          if (error) return console.error(`2 ${error.message}`)
          stats = stats
          let filesize = (stats.size / 1024).toFixed(3)
          console.log(`${filename} - ${extname} - ${filesize}kb`)
        })
        return
      } else if (file.isDirectory() && !extname) {
        dir = dir + '\\' + file.name.toString()
        read(dir)
      }
    })
  })
}
read(dir)


