// logo.img - Logo Image Builder - Copyright (C) 2015 by yieme - All Rights Reserved - License: MIT

;(function() {
  'use strict';

  // res.type('png');                // => image/png:
  // res.set('Content-Type', 'text/plain');

  function build_image(req, res, next) {
    var url      = req.url
      , tail3    = url.substr(-3)
      , tail4    = url.substr(-4)
      , tail5    = url.substr(-5)
      , part     = url.split('/')
      , isImage  = ((tail4 == '.png') || (tail4 == '.ico') || (tail4 == '.svg') || (tail4 == '.gif'))
      , isStatic = ((tail3 == '.js') || (tail4 == '.css') || (tail4 == '.htm') || (tail5 == '.html') || isImage || url == '/')

    if (isStatic) {
        next();
    } else {
      part.shift()
      console.log('parts:', part)
      var json=JSON.stringify(part)
      res.status(200).send('OK: ' + json  + '. length: ' + part.length)
    }
  }


  if (typeof exports === 'object') module.exports = build_image // support CommonJS
  // else if (typeof define === 'function' && define.amd) define(function() { return Logo.img }) // support AMD
  // else this.Logo.img = Logo.img // support browser
})();
