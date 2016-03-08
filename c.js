var fs = require('fs');
var jade = require('react-jade');
var path = require('path');

var code = jade.compileFile(path.join(__dirname, 'app.jade'));
fs.writeFileSync('app.js', 'var React = require("react"); module.exports = ' + code);
