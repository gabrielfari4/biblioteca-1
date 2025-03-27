const fs = require('fs')

const caminhoArquivo = process.argv
const link = caminhoArquivo[2]

fs.readFile(link, 'utf-8', (erro, data) => {
    if (erro) throw Error
    console.log(data);
})

console.log(link)