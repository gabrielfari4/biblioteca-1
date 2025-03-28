const filtraOcorrencias = (paragrafo) => {
    return Object.keys(paragrafo).filter((palavra) => paragrafo[palavra] > 1)
}

const montaSaidaArquivo = (listaPalavras) => {
    let textoFinal = ''
    listaPalavras.forEach((paragrafo, index) => {
        const duplicadas = filtraOcorrencias(paragrafo).join(', ');
        textoFinal += `palavras duplicadas no parágrafo ${index + 1}: ${duplicadas} \n`
    })
    return textoFinal;
}

export { montaSaidaArquivo };