const http = require('http');
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("loading: %s", req.url);
  if (req.url == "/") {
    fs.readFile('index.html', function(err, html) {
      if (err) {
        throw err;
      }
      res.writeHead(200, { 'Content-Type': 'text / html' });
      res.write(html);
      res.end();
    });
  } else if (req.url == "/styles/body.css") {
    fs.readFile('styles/body.css', function(err, body) {
      if (err) {
        throw err;
      }
      res.writeHead(200, { 'Content-Type': 'text / css' });
      res.write(body);
      res.end();
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// http.createServer((req, res) => {
//     console.log(req.url)
//     if (req.url === "/") {
//         fs.readFile('index.html', (err, html) => {
//             if (err) {
//                 throw err;
//             }
//             res.setHeader('Content-type', 'text/html');
//             res.write(html);
//             res.statusCode = 200;
//             res.end();
//         });
//     }
//     else if (req.url == '/style.css') {
//         res.setHeader('Content-type', 'text/css');
//         res.write(fs.readFileSync('style.css'));
//         res.end();
//     } else {
//         res.write("invalid request")
//         res.end();
//     }
// }).listen(3000);
