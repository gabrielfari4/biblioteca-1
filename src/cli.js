// const fs = require('fs')
import fs from "fs";
// const trataErros = require('./erros/funcoesErro')
import trataErros from "./erros/funcoesErro.js";
import { contaPalavras } from "./index.js";
import { montaSaidaArquivo } from "./helpers.js";
import { Command } from 'commander';
import path from "path";
import chalk from "chalk";

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error(chalk.yellow('erro: favor inserir caminho de origem e destino'))
            program.help()
            return
        }

        const caminhoTexto = path.resolve(texto)
        const caminhoDestino = path.resolve(destino)

        try {
            processaArquivo(caminhoTexto, caminhoDestino)
            console.log(chalk.green('texto processado com sucesso'));
            
        } catch (error) {
            console.log('ocorreu um erro no processamento: ', error);
            
        }
    })

program.parse()

/* const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3]; */

function processaArquivo (texto, destino) {
    fs.readFile(texto, "utf-8", (erro, texto) => {
        try {
            if (erro) throw erro;
            const resultado = contaPalavras(texto);
            criaESalvaArquivos(resultado, destino);
        } catch (erro) {
            trataErros(erro);
        }
    })
}


/* const criaESalvaArquivos = async (listaPalavras, endereco) => {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado')
    } catch (error) {
        throw error
    }
} */

const criaESalvaArquivos = (listaPalavras, endereco) => {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);

    fs.promises
        .writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            console.log("Arquivo criado");
        })
        .catch((erro) => {
            throw erro;
        })
        .finally(() => {
            console.log("Operação finalizada");
        });
};
