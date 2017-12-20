var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/



  
  console.log('HTTP 路径是\n' + path)
  if(path == '/index.html'){
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('<!DOCTYPE>\n<html> ' + 
      '<head>< <link rel="stylesheet" href="/style.css"> ' +
      '</head><body>' +
      '<h1>来饥人谷学前端吧</h1>' +
      '<script src="/script.js"></script>' +
      '</body></html>')
    response.end()
 } else if(path == '/style.css'){
     response.setHeader('Content-Type', 'text/css;  charset=utf-8')
     response.write('body{background-color: red;} h1{color:green}')
     response.end()
 } else if(path == '/script.js'){
     response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
     response.write('alert("来饥人谷学前端吧")')
     response.end()
 }  else{
   response.statusCode = 404
   response.end()
 }






  
  











  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
