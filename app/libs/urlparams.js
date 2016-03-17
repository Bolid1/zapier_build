var URLParams = function () {};

_.extend(URLParams.prototype, {
  parseValue: function (value) {
    try {
      value = decodeURIComponent(value);
    } catch (e) {
    }

    try {
      return JSON.parse(value).toString();
    } catch (e) {
      return value.toString();
    }
  },

  parseValues: function (value) {
    try {
      value = decodeURIComponent(value);
    } catch (e) {
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      return value.toString();
    }
  },

  parse: function (query) {
    var
      first_value,
      params = {};

    _.each(query.replace(/\+/g, ' ').split('&'), function (pair) {
      pair = pair.split('=');
      pair[0] = decodeURIComponent(pair[0]);

      if (typeof params[pair[0]] !== 'undefined') {
        if (params[pair[0]] instanceof Array) {
          params[pair[0]].push(this.parseValue(pair[1] || ''));
        } else {
          first_value = params[pair[0]].toString();
          params[pair[0]] = [first_value, this.parseValue(pair[1] || '')];
        }
      } else if (pair[0].indexOf('[', 1) > 0) {
        var second_pair = pair[0].split('[');
        second_pair[second_pair.length] = this.parseValue(pair[1]);
        var i = 0,
          f = function (p, sp) {
            if (i < sp.length - 1) {
              sp[i] = sp[i].replace(']', '');
              p[sp[i]] = p[sp[i]] || {};
              var o = p[sp[i]];
              i++;
              if (i == sp.length - 1) {
                p[sp[i - 1]] = sp[i];
              } else {
                f(o, sp);
              }
            }
          };

        f(params, second_pair);
      } else {
        params[pair[0]] = this.parseValues(pair[1] || '');
      }
    }, this);

    return params;
  },

  buildUrl: function (subdomain, path) {
    return 'https://' + subdomain + '.amocrm.com/' + path;
  }
});

URLParams = new URLParams();