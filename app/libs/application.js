var Application = function () {};

_.extend(Application.prototype, {
  delete_catch_hook: function (type, bundle) {
    type = this.convertEntityName(type, 'api_name');
    var result = {
      id: 0,
      url: URLParams.buildUrl(bundle.auth_fields.account, type + '/trash/'),
      subdomain: bundle.auth_fields.account
    };

    if (bundle.cleaned_request) {
      if (bundle.cleaned_request[type + '[delete][0][id]']) {
        result.id = bundle.cleaned_request[type + '[delete][0][id]'];
        result.url += '?filter[ID][]=' + result.id;
      }
    }

    return result;
  },

  post_write: function (action, type, bundle) {
    type = this.convertEntityName(type, 'many');
    var tmp,
      api_name = this.convertEntityName(type, 'api_name'),
      result = {
        id: 0,
        url: URLParams.buildUrl(bundle.auth_fields.account, type + '/detail/'),
        subdomain: bundle.auth_fields.account
      };

    if (bundle.response.content && _.isString(bundle.response.content)) {
      /** @var {String} tmp */
      tmp = bundle.response.content;
      /** @var {Object} tmp */
      tmp = JSON.parse(tmp);
      if (tmp && tmp.response && tmp.response[api_name]) {
        tmp = tmp.response[api_name];
        if (tmp[action] && tmp[action][0] && tmp[action][0].id) {
          result.id = tmp[action][0].id;
          result.url += result.id;
        }
      }
    }

    return result;
  },

  pre_write: function (action, type, bundle) {
    //bundle.request.method = 'POST';
    //bundle.request.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    var
      api_name = this.convertEntityName(type, 'api_name'),
      data = bundle.action_fields,
      request_data = {};

    if (!data) {
      console.log('Nothing to create');
      return bundle.request;
    }

    data.custom_fields = CustomFields.convertToApi(type, data.custom_fields);

    request_data[api_name] = {};
    request_data[api_name][action] = [data];

    bundle.request.data = JSON.stringify({request: request_data});

    return bundle.request;
  },

  subscribe_holder: function (type, bundle) {
    var result = {
      request: {webhooks: {}}
    };

    result.request.webhooks[type] = [
      {
        url: bundle.subscription_url,
        events: bundle.event
      }
    ];

    bundle.request.data = JSON.stringify(result);

    return bundle.request;
  },

  convertEntityName: function (entity, type, uc_first) {
    var
      names = [
        {
          many: 'contacts',
          single: 'contact',
          api_name: 'contacts'
        },
        {
          many: 'companies',
          single: 'company',
          api_name: 'contacts'
        },
        {
          many: 'leads',
          single: 'lead',
          api_name: 'leads'
        }
      ],
      result = false;

    _.each(names, function (names_array) {
      if (result) {
        return;
      }

      var found = false;
      _.each(names_array, function (name) {
        if (name === entity) {
          found = true;
        }
      });

      if (found) {
        result = names_array[type];
      }
    });

    result = result || '';
    if (result && uc_first) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
  },

  prepareFieldsFromAccount: function (action, entity, content) {
    var account, tmp, users, statuses,
      custom_fields = [];

    account = content ? JSON.parse(content) : null;
    if (!(account && account.response && account.response.account)) {
      return CustomFields.getBaseFields(action, entity);
    }

    account = account.response.account;

    if (account.users) {
      users = {};
      _.each(account.users, function (user) {
        users[user.id] = user.name;
      });
    }

    if (account.leads_statuses) {
      statuses = {};
      _.each(account.leads_statuses, function (status) {
        var pipeline = account.pipelines[status.pipeline_id];
        statuses[status.id] = (pipeline && pipeline.name ? pipeline.name + ': ' : '') + status.name;
      });
    }

    console.log('users');
    console.log(users);
    console.log('statuses');
    console.log(statuses);
    custom_fields = CustomFields.getBaseFields(action, entity, users, statuses);

    if (account.custom_fields) {
      tmp = account.custom_fields[this.convertEntityName(entity, 'many')];
      tmp = CustomFields.convertFromAccountInfo(tmp);
      _.each(tmp, function (field) {
        custom_fields.push(field);
      });
    }

    return custom_fields;
  },

  convertEntity: function (action, type, content) {
    var
      result,
      entity = {},
      fields = [
        'id',
        'name',
        'created_user_id',
        'modified_user_id',
        'pipeline_id',
        'linked_company_id',
        'responsible_user_id',
        'old_responsible_user_id',
        'group_id',
        'price',
        'status_id',
        'company_name',
        'old_status_id'
      ];

    if (!content) {
      return entity;
    }

    content = URLParams.parse(content);

    if (!(content[this.convertEntityName(type, 'api_name')][action][0])) {
      return entity;
    }

    entity = content[this.convertEntityName(type, 'api_name')][action][0];

    result = _.pick(entity, fields);
    if (entity.tags) {
      result.tags = _.reduce(entity.tags, function (memo, tag) {
        return (memo ? ', ' : '') + tag.name;
      }, '');
    }

    _.each(['date_create', 'last_modified'], function (field) {
      if (!entity[field]) {
        return;
      }

      var
        timestamp = parseInt(entity[field], 10),
        date = new Date();

      date.setTime(timestamp * 1000);

      result[field] = date.toLocaleString('en-US', {
        era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
    });

    result.custom_fields = CustomFields.convertFromApi(entity.custom_fields);

    return result;
  }
});

Application = new Application();