// examples/basic-js.js
// Basic js
'use strict';

var logoImg  = require('../index')
  , express  = require('express')
  , app      = express()
  , convar   = require('convar')
  , appPack  = convar.package
  , title    = appPack.name + '/' + appPack.version
  , port     = convar('port') || 3000
  , cwd      = process.cwd()
  , fs       = require('fs')
  , hogan    = require("hogan.js")
  , indexhjs = fs.readFileSync(cwd + '/public/index.hjs', 'utf8')
  , template = hogan.compile(indexhjs)
  , pageData = JSON.parse(JSON.stringify(appPack))
;

pageData.title = title
app.set('title', title)
app.set('x-powered-by', title)

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url)
  next()
})

app.get('/', function(req, res) {
  var page = template.render(pageData)
  res.set('Content-Type', 'text/html')
  res.send(page)
})

app.use(express.static(cwd + '/public'))
app.use(logoImg)

app.listen(port)
console.log(title,'listening on', port)
console.log(cwd)
