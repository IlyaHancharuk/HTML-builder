const fs = require('fs')
const path = require('path')

const projectDist = path.join(__dirname, 'project-dist')
const assets = path.join(__dirname, 'assets')
const dirCopy = path.join(__dirname, 'project-dist','assets')
const styles = path.join(__dirname, 'styles')
const bundle = path.join(__dirname, 'project-dist/style.css')
const output = fs.createWriteStream(bundle)

fs.mkdir(projectDist, { recursive: true }, error => {
  if (error) return console.error(error.message)
})

fs.readdir(styles, (error, files) => {
  if (error) return console.error(error.message)
  files.forEach((file) => {
    let filePath = path.join(styles, file.toString())
    let extName = path.extname(filePath)
    if (extName === '.css') {
      const input = fs.createReadStream(filePath)
      input.on('data', chunk => {
        output.write(chunk.toString() + '\n')
      })
      input.on('error', error => console.log('Error', error.message))
    }
  })
})

fs.access(dirCopy, error => {
  if(!error) {
    fs.rm(dirCopy, { recursive: true }, error => {
      if (error) return console.error(error.message)
      copyDir(assets, dirCopy)
    })
  } else {
    copyDir(assets, dirCopy)
  }
})
createHtmlBuild()

function createHtmlBuild() {
  const input = fs.createReadStream(path.join(__dirname, 'template.html'))
  const output = fs.createWriteStream(path.join(projectDist, 'index.html'))
  let str = ''
  input.on('data', chunk => {
    str = chunk.toString()

    function mapper(elem) {
      return`{{${elem}}}`
    }

    const components = path.join(__dirname, 'components')

    fs.readdir(components, { withFileTypes: true }, (error, component) => {
      if (error) return console.error(error.message)
      const temps = []
      component.forEach(temp => {
        const fileName = temp.name.match(/([\w]*\.)*/)[0].replace('.', '')
        temps.push(mapper(fileName))
      })

      component.forEach((htmlItem, index) => { 
        const readStream = fs.createReadStream(path.join(components, htmlItem.name.toString()))
        readStream.on('data', chunk => {
          str = str.replace(temps[index], chunk)
          console.log(temps[index]);
          console.log(chunk.toString());
          if(!temps.find(temp => str.includes(temp))) {
            output.write(str)
          }
        })
      })
    })
  })
}






function copyDir(assets, dirCopy) {
  fs.mkdir(dirCopy, { recursive: true }, error => {
    if (error) return console.error(error.message)
  })
  
  fs.readdir(assets, {withFileTypes: true}, (error, files) => {
    if (error) return console.error(error.message)
    files.forEach((file) => {
      if ((!file.isDirectory())) {
        let copiedFile = path.join(assets, file.name.toString())
        let newFile = path.join(dirCopy, file.name.toString())
        fs.copyFile(copiedFile, newFile, error => {
          if (error) return console.error(error.message)
        })
      } else {
        let deepDir = path.join(assets, file.name.toString())
        let deepDirCopy = path.join(dirCopy, file.name.toString())
        fs.mkdir(deepDirCopy, { recursive: true }, error => {
          if (error) return console.error(error.message)
        })
        copyDir(deepDir, deepDirCopy)
      }
    })
  })
}
