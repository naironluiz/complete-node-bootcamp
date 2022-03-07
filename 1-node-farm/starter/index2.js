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
- parsear para o futuro utilizando JSON.parse */
const dataJson = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(dataJson);

/* 3. Criar um servidor utilizando http e create server numa const
4. utilizar req url para capturar a url
5. iniciar o server utilizando um listen, porta, endereço e FA */

const server = http.createServer((req, res) => {
  const pathName = req.url;

  /* 6. iniciar o routing utilizando ifs/else 
  - fazer um writehead mandando um codigo de 3 digitos pro browser e o tipo do conteudo*/

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application-json" });
    res.end(dataJson);
  } else {
    res.writeHead(404);
    res.end("<h1>P A G E   N O T    F O U N D</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
