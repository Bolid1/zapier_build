var
  _ = require("underscore"),
  $ = require("jquery"),
  moment = require("moment"),
  bundle,
  result;

$.param = require("jquery-param");

function hasDifference(obj_1, obj_2) {
  var
    keys_1 = _.keys(obj_1),
    keys_2 = _.keys(obj_2),
    tmp_1, tmp_2,
    has_difference;

  if ((tmp_1 = _.difference(keys_1, keys_2)).length) {
    return {
      message: '_.difference(keys_1, keys_2).length',
      difference: tmp_1,
      keys_1: keys_1,
      keys_2: keys_2
    };
  }

  if ((tmp_2 = _.difference(keys_2, keys_1)).length) {
    return {
      message: '_.difference(keys_1, keys_2).length',
      difference: tmp_2,
      keys_1: keys_1,
      keys_2: keys_2
    };
  }

  if (keys_1.length !== keys_2.length) {
    return {
      message: 'keys_1.length !== keys_2.length',
      keys_1: keys_1,
      keys_2: keys_2
    };
  }

  obj_1 = _.clone(obj_1);
  obj_2 = _.clone(obj_2);


  has_difference = false;
  _.each(keys_1, function (key) {
    if (has_difference) {
      return;
    }

    has_difference = typeof obj_1[key] !== typeof obj_2[key];
    if (has_difference) {
      has_difference = {
        message: 'typeof obj_1[key] !== typeof obj_2[key]',
        key: key,
        obj_1: obj_1,
        obj_2: obj_2
      };
      return;
    }

    if (typeof obj_1[key] === 'string') {
      try {
        tmp_1 = JSON.parse(obj_1[key]);
        tmp_2 = JSON.parse(obj_2[key]);
      } catch (e) {
        tmp_1 = obj_1[key];
        tmp_2 = obj_2[key];
      }
      obj_1[key] = tmp_1;
      obj_2[key] = tmp_2;
    }

    if (_.isArray(obj_1[key]) || _.isObject(obj_1[key])) {
      has_difference = hasDifference(obj_1[key], obj_2[key]);
      return;
    }

    if (key === 'date_create' || key === 'last_modified') {
      // @TODO: Fix this
      return;
    }

    if (key.indexOf('Date of creation ') > -1) {
      // @TODO: Fix this
      return;
    }

    if (key.indexOf('Date when') > -1) {
      // @TODO: Fix this
      return;
    }

    has_difference = obj_1[key] !== obj_2[key];
    if (has_difference) {
      has_difference = {
        message: 'obj_1[key] !== obj_2[key]',
        key: key,
        obj_1: obj_1,
        obj_2: obj_2
      };
    }
  });

  return has_difference;
}
