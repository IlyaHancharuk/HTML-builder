const fs = require('fs')
const path = require('path')

const styleDir = path.join(__dirname, './styles')
const bundle = path.join(__dirname, 'project-dist/bundle.css')
const output = fs.createWriteStream(bundle)

fs.readdir(styleDir, (error, files) => {
  if (error) return console.error(error.message)
  let arr = []
  files.forEach((file) => {
    let filePath = styleDir + '\\' + file.toString()
    let extName = path.extname(filePath)
    if (extName === '.css') {
      const input = fs.createReadStream(filePath)
      input.on('data', chunk => {
        output.write(chunk.toString() + '\n')
      })
      input.on('error', error => console.log('Error', error.message))
    }
  })
  console.log('Билд завершен!')
})