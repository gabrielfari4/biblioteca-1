const fs = require('fs')

const caminhoArquivo = process.argv
const link = caminhoArquivo[2]

fs.readFile(link, 'utf-8', (erro, texto) => {
    if (erro) throw Error
    verificaPalavrasDuplicadas(texto)
})

const verificaPalavrasDuplicadas = (texto) => {
    const listaPalavras = texto.split(' ');
    const resultado = {};
    listaPalavras.forEach(palavra => {
        resultado[palavra] = (resultado[palavra] || 0) + 1
    });
    console.log(resultado)
}