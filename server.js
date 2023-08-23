const http = require("http");
const fs = require("fs");
const db = require("./db/db");
require("dotenv").config();

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
    `);
  console.log("Table created");
});
db.close();

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/login") {
    fs.createReadStream("public/login.html").pipe(res);
  } else if (req.method === "POST" && req.url === "/login/register") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log(chunk.toString());
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `${body}` }));
    });
  }
});

server.listen(PORT, () => {
  console.log("The server is on " + PORT);
});
