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
    has_difference;

  if (_.difference(keys_1, keys_2).length) {
    return true;
  }


  has_difference = false;
  _.each(keys_1, function (key) {
    if (has_difference) {
      return;
    }

    has_difference = typeof obj_1[key] !== typeof obj_2[key];
    if (has_difference) {
      return;
    }

    if (_.isArray(obj_1[key]) || _.isObject(obj_1[key])) {
      has_difference = hasDifference(obj_1[key], obj_2[key]);
      return;
    }

    if (key === 'date_create' || key === 'last_modified') {
      // @TODO: Fix this
      return;
    }

    has_difference = obj_1[key] !== obj_2[key];
  });

  return has_difference;
}
