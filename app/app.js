var
  _ = require('underscore'),
  file_system = require('fs'),
  current_dir = __dirname,
  ZapBuilder = require(current_dir + '/zap_builder'),
  libs_dir = current_dir + '/libs',
  tests_dir = current_dir + '/tests',
  out = [],
  out_tests = [],
  out_folder = '/../result',
  out_file = out_folder + '/script.js';

_.each(file_system.readdirSync(libs_dir), function (lib_name) {
  out.push(file_system.readFileSync(libs_dir + '/' + lib_name, 'utf8'));
});

out.push(ZapBuilder.make());

file_system.writeFileSync(current_dir + out_file, ['"use strict";'].concat(out).join("\n\n"));

// test
out_tests = [];
_.each(file_system.readdirSync(tests_dir), function (lib_name) {
  out_tests.push(file_system.readFileSync(tests_dir + '/' + lib_name, 'utf8'));
});

out_tests = [out_tests[0]].concat(out, out_tests.slice(1)).join("\n\n");
eval(out_tests);
