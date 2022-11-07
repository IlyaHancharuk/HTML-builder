const fs = require('fs')
const path = require('path')

const { stdin } = process
const file = path.join(__dirname, 'text.txt')
const output = fs.createWriteStream(file)

console.log('Привет! Это приложение по записи текста в файл. Введите текст в консоль:');

stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    getExitMessage()
  } else {
    output.write(chunk)
  }
})

process.on('SIGINT', () => getExitMessage())

stdin.on('error', error => console.log('Error', error.message));

function getExitMessage() {
  console.log(`Ввод окончен. Созданный текст лежит тут:\n${file}`)
  process.exit(0)
}

