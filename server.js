// examples/basic-js.js
// Basic js
'use strict';

console.log('cwd:', cwd)

var logoImg  = require('./index')
  , express  = require('express')
  , app      = express()
  , convar   = require('convar')
  , pkg      = convar.package
  , port     = convar('port') || 3000
  , cwd      = process.cwd()
  , fs       = require('fs')
  , hogan    = require("hogan.js")
  , index    = fs.readFileSync(cwd + '/public/index.mustache', 'utf8')
  , readme   = fs.readFileSync(cwd + '/README.md', 'utf8')
  , template = hogan.compile(index)
;

pkg.readme = readme
app.set('title', pkg.name)
app.set('x-powered-by', pkg.name + '/' + pkg.version)

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url)
  next()
})

app.get('/favicon.ico', function(req, res) {
  res.status(404)
})

app.get('/', function(req, res) {
  var page = template.render(pkg)
  res.set('Content-Type', 'text/html')
  res.send(page)
})

app.use(logoImg)

app.use(express.static('public'))

app.get('*', function(req, res){
  console.log(req.url + ' not found')
  req.url = '/p:10~tc:60~fa:frown-o~bc:15~Not Found~/img.png'
  res.status(404)
  logoImg(req, res)
})

app.listen(port)
console.log(pkg.name + '/' + pkg.version, 'listening on', port)
