(function (global) {
  'use strict';

  var _ = require('underscore');

  var ZapBuilder = function () {

  };

  var mapFunctions = function (out) {
    return _.map(out, function (map) {
      return [
        '  ' + map.name + ': function (bundle) {',
        '  ' + (_.isArray(map.body) ? _.map(map.body, function (str) { return '  ' + str; }).join("\n") : '  ' + map.body),
        '  ' + '}'
      ].join("\n");
    }).join(",\n");
  };

  var getEntitiesHooks = function () {
    var out = [];

    _.each(['contact', 'lead', 'company'], function (entity) {
      var actions, action_name;

      actions = ['restore', 'add', 'update'];

      if (entity === 'lead') {
        actions.push('status');
        actions.push('responsible');
      }

      _.each(actions, function (action) {
        action_name = [action, entity, 'post_custom_trigger_fields'].join('_');

        out.push({
          name: action_name,
          body: "return Application.prepareFieldsFromAccount('hook_" + action + "', '" + entity + "', bundle.response.content);"
        });

        action_name = [action, entity, 'catch_hook'].join('_');

        out.push({
          name: action_name,
          body: "return Application.convertEntity('" + action + "', '" + entity + "', bundle.request.content);"
        });
      });


      action_name = ['delete', entity, 'catch_hook'].join('_');


      out.push({
        name: action_name,
        body: "return Application.delete_catch_hook('" + entity + "', bundle);"
      });

      _.each(['add', 'update'], function (action) {
        action_name = [entity, action, 'post_custom_action_fields'].join('_');
        out.push({
          name: action_name,
          body: "return Application.prepareFieldsFromAccount('action_" + action + "', '" + entity + "', bundle.response.content);"
        });

        _.each(['pre', 'post'], function (action_prefix) {
          action_prefix += '_write';
          action_name = [entity, action, action_prefix].join('_');
          out.push({
            name: action_name,
            body: "return Application." + action_prefix + "('" + action + "', '" + entity + "', bundle);"
          });
        });
      });
    });

    return mapFunctions(out);
  };

  var getSubscribes = function () {
    var out = [];

    _.each(['subscribe', 'unsubscribe'], function (action) {
      out.push({
        name: ['pre', action].join('_'),
        body: "return Application.subscribe_holder('" + action + "', bundle);"
      });
    });

    return mapFunctions(out);
  };

  ZapBuilder.make = function () {
    var out = [
      'var Zap;',
      'Zap = {',
      getEntitiesHooks() + ",\n",
      getSubscribes(),
      '};'
    ];

    return out.join("\n");
  };

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = ZapBuilder;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return ZapBuilder;
    });
  } else {
    global.ZapBuilder = ZapBuilder;
  }
}.call(this));
