/* API DE ABACATE */

/* 1. Require das ferramentas necessarias. 
1. filesystem
2. url
3. http*/

const fs = require("fs");
const url = require("url");
const http = require("http");

/* 2. TOP LEVEL CODE = SÓ VAI RODAR UMA VEZ
- capturar o arquivo Json onde estão as informações
- parsear para o futuro utilizando JSON.parse
- chamar os templates de html. só precisa chamar eles uma vez */
const dataJson = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(dataJson);
//TEMPLATES
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

/* 3. Criar um servidor utilizando http e create server numa const
4. utilizar req url para capturar a url
5. iniciar o server utilizando um listen, porta, endereço e FA */

const server = http.createServer((req, res) => {
  const pathName = req.url;

  /* 6. iniciar o routing utilizando ifs/else 
  - fazer um writehead mandando um codigo de 3 digitos pro browser e o tipo do conteudo
  - o arquivo jeson será lido em /api*/

  //OVERVIEW
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    //PRODUTO
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application-json" });
    res.end(dataJson);
    //404
  } else {
    res.writeHead(404);
    res.end("<h1>P A G E   N O T    F O U N D</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Requests on 8000");
});
