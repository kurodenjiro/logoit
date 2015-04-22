// LogoIt - Logo Image Builder - Copyright (C) 2015 by yieme - All Rights Reserved - License: MIT
;(function() {
  'use strict';

  var hogan        = require("hogan.js")
    , fs           = require('fs')
    , _            = require('lodash')
    , S            = require('string')
    , SEPERATOR    = '&&'
    , SELF_LOGO    = 'b:yellow&&gf:Lobster&&f:b&&mc:100&&o:0.3&&p:0&&i:nodejs&&tc:50&&o:1&&p:5&&fa:photo&&bc:35&&p:10&&LogoIt&&/logoit.png'
    , INVALID_IMG  = 'b:white&&tc:46&&p:12&&fa:picture-o&&bc:14&&p:10&&gf:Share Tech Mono&&Invalid Image&&tc:70&&p:1&&c:990000&&o:0.6&&fa:ban&&/img.png'
    , SIZE         = 256
    , MAXSIZE      = 1024
    , PADDING      = 5
    , PERCENT      = 50
    , paddingCalc  = function paddingCalc(size, padding)         { return Math.round(size * padding / 100) }
    , heightCalc   = function heightCalc(size, padding, percent) { return Math.round(size * percent / 100) }
    , template     = {}
    , templateList = ['body', 'span', 'google_font']
    , images       = require('./images.json')

  // load and compile templates
  for (var i=0; i<templateList.length; i++) {
    var name = templateList[i]
    var filetext = _.trim(fs.readFileSync('layers/' + name + '.mustache', 'utf8'))
    template[name] = hogan.compile(filetext)
  }

  function build_image(req, res, next) {
    var requrl   = req.url.substr(1)
      , url      = (requrl == 'logoit.png') ? SELF_LOGO : requrl
      , part     = S(url).replaceAll('%20', ' ').s.split(SEPERATOR)
      , isImage  = url.indexOf('.png') > 1 || url.indexOf('.jpg') > 1
      , state    = {
          size   : SIZE,
          style  : 'position:absolute; top:0; left:0; border:0; margin:0; padding:0; line-height:100%',
          zindex : 1,
          pct    : PERCENT,
          height : heightCalc(SIZE, PADDING, PERCENT),
          top    : 0,
          left   : 0,
          padding: paddingCalc(SIZE, PADDING),
          lang   : 'en',
          text   : '',
          fa     : '', // fontawesome icons
          dev    : '', // devicons
          flag   : '', // flag icons
          fi     : '', // foundation icons
          md     : '', // material design icons
          img    : '',
          align  : 'left'
        }
      , current  = template.body
      , page     = ''
      , lastcalc = 'tl'
    ;

    if (!isImage) {
      if (next) {
        next()
        return
      }
      part = INVALID_IMG.split(SEPERATOR)
      console.log('invalid image', req.url)
    }

    function isColor(color) {
      // colors: http://www.w3schools.com/cssref/css_colornames.asp
      var colors = { red:1, yellow:1, bisque:1, purple:1, salmon:1, sienna:1, silver:1, tan:1, tomato:1, violet:1 }
      return (color && (color.length == 3 || color.length == 6) && !colors[color])
    }

    function recalc(op) {
      op = op || lastcalc
      lastcalc    = op
      var size    = state.size
        , padding = state.padding
        , height  = heightCalc(size, padding, state.pct)
        , usable  = size - padding * 2

      state.height  = height
      switch (op.substr(0,1)) { // t=top, m=middle, b=bottom
        case 't': state.top = padding; break
        case 'm': state.top = Math.round((usable / 2) - (height / 2)) + padding; break
        case 'b': state.top = padding + usable - height; break
      }
      switch (op.substr(1,1)) { // l=left, c=center, r=right
        case 'l':
          state.align = 'left'
          state.left  = padding
        break
        case 'c':
          state.align = 'center'
          state.left  = 0
        break
        case 'r':
          state.align = 'right'
          state.left  = 0-padding
        break
      }
    }

    function renderLayer() {
      page = page + current.render(state)
      state.zindex = state.zindex + 1
      state.text = ''
      state.fa   = '' // font awesome
      state.dev  = '' // devicons
      state.flag = '' // flag icons
      state.md   = '' // material design icons
      state.fi   = '' // foundation icons
      state.img  = ''
    }

    function newLayer(op, pct) {
      renderLayer()
      current = template.span
      if (pct && parseInt(pct) > 0 && parseInt(pct) <= 100) {
        state.pct = parseInt(pct)
        recalc(op)
      }
      state.style = state.style + ';background-color:transparent'
    }

    function add(layer) {
      var part  = layer.split(':')
        , op    = part[0]
      part.shift()
      var param = part.join(':')
      if (op == 'f') {
        switch (param) {
          case 'b': param = 'font-weight:bold'; break
          case 'i': param = 'font-style:italic'; break
        }
      }

      switch (op) {
        case 'b':
          if (isColor(param)) param = '#' + param
          param = 'background-color:' + param
        break
        case 'c':
          if (isColor(param)) param = '#' + param
          param = 'color:' + param
        break
        case 'o':  param = 'opacity:' + param; break
        case 'gf':
          var link = template.google_font.render({name: param})
          page = page.replace('</head>', link)
          param = 'font-family:' + param
        break
        case 'ff': param = 'font-family:' + param; break
        case 'fw': param = 'font-weight:' + param; break
        case 'fs': param = 'font-style:' + param; break
      }

      if (op.substr(0,1) == '/' && op.indexOf('.png') > 1) op = '/img.png'
      if (op.substr(0,1) == '/' && op.indexOf('.jpg') > 1) op = '/img.jpg'
      switch (op) {
        case 'l':
          if (param && param.length == 2) state.lang = param
        break
        case 's': case 'b': case 'c': case 'o': case 'ff': case 'fw': case 'fs': case 'f': case 'gf':
          state.style = state.style + ';' + param
          newLayer('tl')
        break
        case 'fa':
          var fa = param.split(',')
          fa = fa.join(' fa-')
          state.fa = '<i class="fa fa-' + fa + '"></i>'
        break
        case 'dev':
          var dev = param.split(',')
          dev = dev.join(' devicons-')
          state.dev = '<span class="devicons devicons-' + dev + '"></span>'
        break
        case 'flag':
          var flag = param.split(',')
          flag = flag.join(' flag-icon-')
          state.flag = '<span class="flag-icon flag-icon-' + flag + '"></span>'
        break
        case 'md':
          var md = param.split(',')
          md = md.join(' md-')
          state.md = '<i class="md md-' + md + '"></i>'
        break
        case 'fi':
          var fi = param.split(',')
          fi = fi.join(' fi-')
          state.fi = '<i class="fi fi-' + fi + '"></i>'
        break
        case 'i':
          if (images[param]) param = images[param]
          state.img = '<img src="'+param+'" height="'+state.height+'" width="'+state.height+'">'
        break
        case 'tl': case 'tc': case 'tr': case 'ml': case 'mc': case 'mr': case 'bl': case 'bc': case 'br':
          newLayer(op, param)
        break
        case '/img.png': case '/img.jpg':
          renderLayer()
          var code = (isImage) ? 200 : 404
          res.status(code).send(page)
        break
        case 'p':
          var percent = parseInt(param)
          if (percent >=0 && percent <= 999) {
            state.padding = paddingCalc(state.size, percent)
            recalc()
          }
        break
        default: state.text = S(op).replaceAll('%20', ' ').s
      }
    }

    var size = parseInt(part[0])
    if (size && size > 1 && size <= MAXSIZE) {
      part[0] = ''
      state.size = size
      state.padding = paddingCalc(size, state.pct)
      recalc()
    }
    for (var i=0; i < part.length; i++) {
      add(part[i])
    }
  }


  if (typeof exports === 'object') module.exports = build_image // support CommonJS
  // else if (typeof define === 'function' && define.amd) define(function() { return Logo.img }) // support AMD
  // else this.LogoIt = LogoIt // support browser
})();
