require("node-import");

_ = require("underscore");
$ = require("jquery");
moment = require("moment");
$.param = require("jquery-param");

var
  bundle,
  result,
  script = imports('./../result/script.js', {exec: false});

script.text += 'global.Zap = Zap;';
script.run();

var Zap = global.Zap;