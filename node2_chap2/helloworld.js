// // Write a message to the console.
// var msg = 'Hello World!';
// console.log(msg);

////////////////////////
////////////////////////

// const http = require('http')
// const port = process.env.PORT || 3000

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello world!')
// })

// server.listen(port, () => console.log(`server started on port ${port}; ` +
//   'press Ctrl-C to terminate....'))


///////////////////////////////
//////////////////////////////


// const http = require('http')
// const port = process.env.PORT || 3000

// const server = http.createServer((req,res) => {
//   // normalize url by removing querystring, optional
//   // trailing slash, and making it lowercase
//   const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
//   switch(path) {
//     case '':
//       res.writeHead(200, { 'Content-Type': 'text/plain' })
//       res.end('Homepage')
//       break
//     case '/about':
//       res.writeHead(200, { 'Content-Type': 'text/plain' })
//       res.end('About')
//       break
//     default:
//       res.writeHead(404, { 'Content-Type': 'text/plain' })
//       res.end('Not Found')
//       break
//   } })

// server.listen(port, () => console.log(`server started on port ${port}; ` +
//   'press Ctrl-C to terminate....'))


//////////////////////
//////////////////////
//////////////////////

const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

// helper function serveStaticFile, and fs.readFile is an asynchronous method for reading files
// fs.readFile uses callbacks, provide a function called a callback function - when work has been done, that CALLBACK function is invoked.
function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    //__dirname good to use for global / will resolve to directory executing script resides in
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      return res.end('500 - Internal Error')
    }
    res.writeHead(responseCode, { 'Content-Type': contentType })
    res.end(data)
  })
}

const server = http.createServer((req,res) => {
  // normalize url by removing querystring, optional trailing slash, and
  // making lowercase
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  switch(path) {
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html')
      break
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html')
      break
    case '/img/logo.png':
      serveStaticFile(res, '/public/img/logo.png', 'image/png')
      break
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404)
      break
  }
})

server.listen(port, () => console.log(`server started on port ${port}; ` +
  'press Ctrl-C to terminate....'))