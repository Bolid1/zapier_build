(function (global) {
  'use strict';

  var _ = require('underscore');

  var ZapBuilder = function () {

  };

  var mapFunctions = function (out) {
    return _.map(out, function (map) {
      return [
        '  ' + map.name + ': function (bundle) {',
        (_.isArray(map.body) ? _.map(map.body, function (str) { return '    ' + str; }).join("\n") : '    ' + map.body),
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

        action_name = [action, entity, 'pre_poll'].join('_');
        out.push({
          name: action_name,
          body: "return Application.hooksPrePoll('" + action + "', '" + entity + "', bundle);"
        });

        action_name = [action, entity, 'post_poll'].join('_');
        out.push({
          name: action_name,
          body: "return [Application.convertEntity('" + action + "', '" + entity + "', bundle.response.content)];"
        });
      });

      actions = {
        catch_hook: 'delete_catch_hook',
        post_poll: 'deletePostPoll',
        pre_poll: 'hooksPrePoll'
      };

      _.each(actions, function (method, action) {
        var method_args = [
          "'" + entity + "'",
          'bundle'
        ];

        if (action.toString() === 'pre_poll') {
          method_args.unshift("'delete'");
        }

        var body_value = "Application." + method + "(" + method_args.join(', ') + ")";


        if (action.toString() === 'post_poll') {
          body_value = "[" + body_value + "]";
        }

        action_name = ['delete', entity, action].join('_');

        out.push({
          name: action_name,
          body: "return " + body_value + ";"
        });
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

      _.each(['search'], function (action) {
        action_name = [entity, action, 'post_custom_' + action + '_fields'].join('_');
        out.push({
          name: action_name,
          body: "return Application.prepareFieldsFromAccount('action_" + action + "', '" + entity + "', bundle.response.content);"
        });

        _.each(['pre', 'post'], function (action_prefix) {
          action_prefix += '_' + action;
          action_name = [entity, action, action_prefix].join('_');
          out.push({
            name: action_name,
            body: "return Application." + action_prefix + "('" + entity + "', bundle);"
          });
        });
      });
    });

    return mapFunctions(out);
  };

  var getAdditions = function () {
    var
      out = [],
      action_name;

    _.each(['task', 'note'], function (entity) {
      _.each(['add', 'update'], function (action) {

        action_name = [entity, action, 'post_custom_action_fields'].join('_');

        out.push({
          name: action_name,
          body: "return Application.prepareFieldsFromAccountForAdditions('action_" + action + "', '" + entity + "', bundle.response.content);"
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

      _.each(['search'], function (action) {
        action_name = [entity, action, 'post_custom_' + action + '_fields'].join('_');
        out.push({
          name: action_name,
          body: "return Application.prepareFieldsFromAccount('action_" + action + "', '" + entity + "', bundle.response.content);"
        });

        _.each(['pre', 'post'], function (action_prefix) {
          action_prefix += '_' + action;
          action_name = [entity, action, action_prefix].join('_');
          out.push({
            name: action_name,
            body: "return Application." + action_prefix + "('" + entity + "', bundle);"
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
      [
        getSubscribes(),
        getEntitiesHooks(),
        getAdditions()
      ].join(",\n"),
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
