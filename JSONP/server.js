var http = require('http')
var fs = require('fs')
var url = require('url')
var port = 8080
var number = fs.readFileSync('./db', 'utf8')

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ''
    if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method

    console.log('HTTP 路径为\n' + path)
    if (path === '/style') {
        response.setHeader('Content-Type', 'text/css; charset=utf-8')
        response.write('body{background-color: #ddd;}h1{color: red;}')
        response.end()
    } else if (path === '/script') {
        response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
            // response.write('alert("这是JS执行的")')
        response.end()
    } else if (path === '/') {
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.write(`
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>jsonp</title>
                <style>
                    div {
                        text-align: center;
                        margin: 100px auto;
                    }
                </style>
            </head>

            <body>
                <div>
                    <span id="count">${number}</span>
                    <button id="add">点击</button>
                </div>
                <script>
                add.addEventListener('click', () => {
                    let script = document.createElement('script')
                    let sName = 'callback' + parseInt(Math.random() * 10000000, 10)
                    script.src = 'http://localhost:8080/add?callback=' + sName
                    window[sName] = (res) => {
                        if (res.success == true) {
                            count.innerText = res.count
                        }
        
                    }
                    document.body.appendChild(script)
                    script.onload = (e) => {
                        e.currentTarget.remove()
                        delete window[functionName]
                    }
                })
                </script>
            </body>

            </html>
        `)

        response.end()
    } else if (pathNoQuery === '/add') {
        response.setHeader('Content-Type', 'application/javascript')
        number = number - 0 + 1
        fs.writeFileSync('./db', number)
        let callbackName = queryObject.callback

        response.write(`
            ${callbackName}({
                "success" : true ,
                "count" : ${number}
            })
        `)
        response.end()

    } else {
        response.statusCode = 404
        response.end()
    }

})

server.listen(port)
console.log('监听成功')