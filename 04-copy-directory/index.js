const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, './files')
const dirCopy = path.join(__dirname, './files-copy')

fs.access(dirCopy, error => {
  if(!error) {
    fs.rm(dirCopy, { recursive: true }, error => {
      if (error) return console.error(error.message)
      copyDir(dir, dirCopy)
    })
  } else {
    copyDir(dir, dirCopy)
  }
  console.log('Копирование завершено')
})

function copyDir(dir, dirCopy) {
  fs.mkdir(dirCopy, { recursive: true }, error => {
    if (error) return console.error(error.message)
  })
  
  fs.readdir(dir, {withFileTypes: true}, (error, files) => {
    if (error) return console.error(error.message)
    files.forEach((file) => {
      if ((!file.isDirectory())) {
        let copiedFile = dir + '\\' + file.name.toString()
        let newFile = dirCopy + '\\' + file.name.toString()
        fs.copyFile(copiedFile, newFile, error => {
          if (error) return console.error(error.message)
        })
      } else {
        let deepDir = path.join(dir, file.name.toString())
        let deepDirCopy = path.join(dirCopy, file.name.toString())
        fs.mkdir(deepDirCopy, { recursive: true }, error => {
          if (error) return console.error(error.message)
        })
        copyDir(deepDir, deepDirCopy)
      }
    })
  })
}