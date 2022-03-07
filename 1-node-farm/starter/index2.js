/* API DE ABACATE */

/* 1. Require das ferramentas necessarias. 
1. filesystem
2. url
3. http*/

const fs = require("fs");
const url = require("url");
const http = require("http");

/* 2. Criar um servidor utilizando http e create server numa const
3. utilizar req url para capturar a url
4. iniciar o server utilizando um listen, porta, endereço e FA */

const server = http.createServer((req, res) => {
  const url = req.url;
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
