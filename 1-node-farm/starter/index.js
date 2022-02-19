/* Modulos Node precisam estar em variáveis e serem requiridos com require */

/* Modulo FS = file system, permite ler e alterar arquivos do sistema*/
const fs = require('fs')

/* Modulo http = inclui propriedades de internet, incluindo criar um site*/
const http = require('http')

////////////////////////////////////////////
//////////////////////////////////////////// FILES


/* Blocking synchronous way -- Código sincrono bloqueador */
/* readfileSync lê um arquivo de maneira sincronizada. precisa estar atribulado a uma variavel */

/* const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn) */

/* writeFileSync escreve o texto */

/* const textOut = `This is what we know about the avocado: ${textIn}.\n\n Created on: ${Date.now()}`
const output = fs.writeFileSync('./txt/output.txt', textOut)
console.log('shazam caraio') */

/* non-blocking asynchronous way, better way -- Código assincrono  não bloqueador, melhor jeito que sincrono */
/* Vai ler de maneira asincrona agora sem Sync.
Leitura assincrona significa que vai ler o start.txt no background e fazer outras coisas enquanto lê */
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  console.log(data)
})



/* TESTE COM DUAS CALLBACKS */

/* readfile vai ler start.txt e transformar ele em "data1" */
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    /* readfile utilizando `` e $ vai ler data 1 "read this" como texto e transformar em "data2" */
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        /* console.log data2 que é "readthis.txt" */
        console.log(data2)
    })
  })
  



/* TESTE COM TRÊS CALLBACKS, IF PRA ERRO E WRITE ASSINCRONO */

/* readfile vai ler start.txt e transformar ele em "data1" */
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('FUDEU BAHIA!!!')
    /* readfile utilizando `` e $ vai ler data 1 "read this" como texto e transformar em "data2" */
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
               /* console.log data2 que é "readthis.txt" */
               console.log(data2)
               /* callback em outra callback */
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=>{
            console.log(data3)
            /* writeFile assincrono = o nome do arquivo, o que será escrito, codificação do texto, erro de callback.
            Novamente usando `` e $ pra converter data em texto.
            \n = quebra de linha */
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err=>{
                console.log('SHAZAM CARAI')
            })
        })
    })
  })
  
  /* Como o código de cima foi assincrono, ele vai ler esse console log antes. */
  console.log('Will read this file')


////////////////////////////////////////////
//////////////////////////////////////////// SERVER
