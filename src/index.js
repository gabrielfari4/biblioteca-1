const fs = require('fs')

const caminhoArquivo = process.argv
const link = caminhoArquivo[2]

fs.readFile(link, 'utf-8', (erro, texto) => {
    if (erro) {
        console.log(erro.code)
        return
    }
    contaPalavras(texto)
})

const contaPalavras = (texto) => {
    const paragrafos = extraiParagrafos(texto)
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificaPalavrasDuplicadas(paragrafo);
    })
    console.log(contagem);
}

const extraiParagrafos = (texto) => {
    return texto.toLowerCase().split('\n');
}

const limpaPalavras = (palavra) => {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}

const verificaPalavrasDuplicadas = (texto) => {
    const listaPalavras = texto.split(' ');
    const resultado = {};
    listaPalavras.forEach(palavra => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra)
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
        }
    });
    return resultado;
}