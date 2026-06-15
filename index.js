// get http module
const http = require("node:http");

const fs = require("fs");
const homePage = fs.readFileSync("./views/index.html", "utf8");

const server = http.createServer((req, res) => {
  console.log("Request: ", req.url);
  if (req.url === "/") {
    res.write(homePage);
  } else if (req.url === "/about") {
    res.write("<h1>About page</h1>");
  } else {
    res.statusCode = 404;
    res.write("<h1>Not Found Page</h1>");
  }
  res.end();
});

server.listen(3001, "localhost", () => {
  console.log("listening on port 3001");
});
