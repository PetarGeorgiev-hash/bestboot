const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.createReadStream("public/index.html").pipe(res);
  }
});

server.listen(PORT, () => {
  console.log("The server is on " + PORT);
});
