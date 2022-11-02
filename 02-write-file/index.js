const fs = require('fs')
const path = require('path')

const { stdin, stdout } = process
const file = path.join(__dirname, 'text.txt')
const output = fs.createWriteStream(file)

console.log('Привет! Это приложение по записи текста в файл. Введите текст в консоль:');

stdin.on('data', (chunk) => output.write(chunk));
process.on('SIGINT', () => {
  console.log(`Ввод окончен. Созданный текст лежит тут:\n${file}`)
  process.exit(0)
})
stdin.on('error', error => console.log('Error', error.message));


