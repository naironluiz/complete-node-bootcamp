/* Modulos Node precisam estar em variáveis e serem requiridos com require */

/* Modulo FS = file system, permite ler e alterar arquivos do sistema*/
const fs = require("fs");

/* Modulo http = inclui propriedades de internet, incluindo criar um site*/
const http = require("http");

/* Modulo URL = pra roteamento e url */
const url = require("url");

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
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

/* TESTE COM DUAS CALLBACKS */

/* readfile vai ler start.txt e transformar ele em "data1" */
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  /* readfile utilizando `` e $ vai ler data 1 "read this" como texto e transformar em "data2" */
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    /* console.log data2 que é "readthis.txt" */
    console.log(data2);
  });
});

/* TESTE COM TRÊS CALLBACKS, IF PRA ERRO E WRITE ASSINCRONO */

/* readfile vai ler start.txt e transformar ele em "data1" */
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("FUDEU BAHIA!!!");
  /* readfile utilizando `` e $ vai ler data 1 "read this" como texto e transformar em "data2" */
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    /* console.log data2 que é "readthis.txt" */
    console.log(data2);
    /* callback em outra callback */
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      /* writeFile assincrono = o nome do arquivo, o que será escrito, codificação do texto, erro de callback.
            Novamente usando `` e $ pra converter data em texto.
            \n = quebra de linha */
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("SHAZAM CARAI");
      });
    });
  });
});

/* Como o código de cima foi assincrono, ele vai ler esse console log antes. */
console.log("Will read this file");

////////////////////////////////////////////
//////////////////////////////////////////// SERVER E ROUTING

//função de trocar templates
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  //organic é diferente porque é boolean
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not organic");

  return output;
};

//AULA DE API - USANDO SINCRONO COMO TOP LVL CODE PORQUE SÓ VAI SER CARREGADO UMA VEZ. JSON.PARSE = PARSE DE JSON
const dataJson = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(dataJson);
//AULA DE API - carregando os templates html de maneira sincrona = top lvl coding
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

/////////////////////////////////////////
/* 1. Criar o servidor usando o método "create server" e armazenando numa variavel
2. inserir um request e um response (req, res)
3. fazer a função de callback que utilizara a response (res) */
const server = http.createServer((req, res) => {
  /* "end" é outro método que manda uma mensagem de response*/
  //4. armazenar url (req.url) numa variavel
  const pathName = req.url;

  //5. cadeia de if e elses pra transitar pelas urls e ter diferentes resultados
  //OVERVIEW PAGE
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    //pegar cada elemento do JSON array utilizando map e colocar no lugar dos placeholders chamando a função replaceTemplate dentro da função/metodo map
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempProduct);

    //API PAGE
  } else if (pathName === "/api") {
    //isso é boa prática i guess. Writehead = dizer ao browser o que estamos escrevendo e mandando
    res.writeHead(200, { "Content-type": "application/json" });
    //poderia ser res.end(productData)
    res.end(dataJson);

    //NOT FOUND
  } else {
    res.end("<h1>P A G E  N O T  F O U N D</h1>");
  }
});

/* server listen = primeiro a porta, depois o endereço de ip e depois a função */
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
