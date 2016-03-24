var
  _ = require('underscore'),
  file_system = require('fs'),
  current_dir = __dirname,
  ZapBuilder = require(current_dir + '/zap_builder'),
  libs_dir = current_dir + '/libs',
  tests_dir = current_dir + '/tests',
  new_tests_dir = current_dir + '/../tests',
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

console.log('===== new tests =====');
_.each(['company', 'contact', 'lead', 'note', 'task'], function (entity) {
  _.each(['action', 'hook'], function (type) {
    var test_dir = [new_tests_dir, entity, type].join('/');
    console.log(test_dir);
    if (!file_system.existsSync(test_dir)) {
      return;
    }

    _.each(file_system.readdirSync(test_dir), function (file_name) {
      var
        test_data = JSON.parse(file_system.readFileSync([test_dir, file_name].join('/'), 'utf8')),
        action_name = [],
        test_result,
        result = '',
        action = file_name.replace('.json', '').split('_'),
        is_search = action[0] === 'search',
        is_custom = action[1] && action[1] === 'custom',
        diff;

      switch (true) {
        case type === 'hook':
          action_name = [action.join('_'), entity, 'catch_hook'];
          break;
        case type === 'action':
          action_name = [entity];
          if (is_custom) {
            action_name.push(action[0]);
            action_name.push('post_custom');
            action_name.push(is_search ? 'search' : 'action');
            action_name.push('fields');
          } else {
            action_name.push(action.join('_'));
            action_name.push(is_search ? 'search' : 'write');
          }
          break;
      }

      action_name = action_name.length ? action_name.join('_') : null;
      if (!(action_name && Zap[action_name])) {
        return;
      }

      result += 'Zap.' + action_name;
      try {
        test_result = Zap[action_name](test_data.bundle);
      } catch (ex) {
        console.error(result + ' error!');
        return;
      }

      if (is_custom) {
        test_data.bundle.data = file_system.readFileSync([new_tests_dir, 'accounts_current.json'].join('/'), 'utf8');
      }

      result += ' worked... ';

      diff = hasDifference(test_data.result, test_result);
      if (diff) {
        result += ' failed!';
        console.error(result, diff);
      } else {
        result += ' success!';
        console.log(result);
      }

    });
  });


});
