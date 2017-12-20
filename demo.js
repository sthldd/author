var fs = require('fs')
if (fs.existsSync()) {
    console.log('error: dir exists')
    process.exit(1)
} else {
var dirName = process.argv[2]

process.chdir("/Users/Administrator/Desktop") 
fs.mkdirSync("./" + dirName) 
process.chdir("./" + dirName) 
fs.mkdirSync('css') 
fs.mkdirSync('js') 

fs.writeFileSync("./index.html", "<!DOCTYPE>\n<title>Hello</title\n><h1>Hi</h1>")
fs.writeFileSync("css/style.css", "h1{color: red;}")
fs.writeFileSync("./js/main.js", 'var string = "Hello World"\nalert(string)')
console.log('success')
process.exit(0)

}
