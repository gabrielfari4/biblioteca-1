// const fs = require('fs')
import fs from 'fs'
// const trataErros = require('./erros/funcoesErro')
import trataErros from './erros/funcoesErro.js'
import { contaPalavras } from './index.js'

const caminhoArquivo = process.argv
const link = caminhoArquivo[2]
const endereco = caminhoArquivo[3]

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro
        const resultado = contaPalavras(texto)
        criaESalvaArquivos(resultado, endereco)        
    } catch (erro) {
        trataErros(erro)
    }
})

const criaESalvaArquivos = async (listaPalavras, endereco) => {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado')
    } catch (error) {
        throw error
    }
}