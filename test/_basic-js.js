// Test: examples/basic-js.js
// Basic js example text
'use strict';

var should = require('should')
var exec   = require('child_process').exec

describe('example', function() {
  it('Basic js', function(done) {
  exec('node examples/basic-js.js', function (error, stdout, stderr) {
    if (error) throw error
      stdout.slice(0,-1).should.equal("undefined")
      stderr.should.equal('')
      done()
    })
  })
})
