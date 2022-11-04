const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, './files')
const dirCopy = path.join(__dirname, './files-copy')

function copyDir (dir, dirCopy) {
  fs.mkdir(dirCopy, { recursive: true }, error => {
    if (error) return console.error(error.message)
  })
  fs.readdir(dir, {withFileTypes: true}, (error, files) => {
    if (error) return console.error(error.message)
    files.forEach((file) => {
      let copiedFile = dir + '\\' + file.name.toString()
      let newFile = dirCopy + '\\' + file.name.toString()
      fs.copyFile(copiedFile, newFile, error => {
        if (error) return console.error(error.message)
      })
    })
    console.log('Копирование завершено');
  })
}

copyDir(dir, dirCopy)
