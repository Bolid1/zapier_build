var Application = function () {};

_.extend(Application.prototype, {
  delete_catch_hook: function (type, bundle) {
    type = this.convertEntityName(type, 'api_name');
    var result = {
      id: 0,
      url: URLParams.buildUrl(bundle.auth_fields.account, type + '/trash/'),
      subdomain: bundle.auth_fields.account
    }, data;

    if (bundle.request.content) {
      data = URLParams.parse(bundle.request.content);
      if (data && data[type] && data[type]['delete']) {
        data = data[type]['delete'];
        if (data[0] && data[0]['id']) {
          result.id = data[0]['id'];
          result.url += '?filter[ID][]=' + result.id;
        }
      }
    }

    return result;
  },

  deletePostPoll: function (type, bundle) {
    bundle.request.content = bundle.response.content;

    return this.delete_catch_hook(type, bundle);
  },

  pre_read_resource: function (type, bundle) {
    bundle.search_fields = bundle.read_context;

    return this.pre_search(type, bundle);
  },

  post_read_resource: function (type, bundle) {
    type = this.convertEntityName(type, 'many');
    var
      tmp,
      entities = [],
      content = {},
      api_name = this.convertEntityName(type, 'api_name');

    if (bundle.response.status_code == 204) {
      return {};
    }

    if (bundle.response.content) {
      /** @var {String} tmp */
      tmp = bundle.response.content;
      /** @var {Object} tmp */
      tmp = _.isString(tmp) ? JSON.parse(tmp) : tmp;
      if (tmp && tmp.response && tmp.response[api_name]) {
        entities = tmp.response[api_name];
      }
    }

    if (!entities[0]) {
      return {};
    }

    content[api_name] = {read: [entities[0]]};

    content = this.convertEntity('read', type, content);

    return this.convertForRead(type, content);
  },

  pre_search: function (type, bundle) {
    var
      search_fields = bundle.search_fields,
      avail_search_fields = _.keys(confSearches[type + '_search'].fields);

    _.each(this.getBaseFields(type), function (field) {
      avail_search_fields.push(field.key);
    });

    if (search_fields.element_type) {
      search_fields.type = this.convertEntityName(search_fields.element_type, 'single');

      if (type === 'note' || type === 'task') {
        search_fields.type = search_fields.type === 'lead' ? search_fields.type : 'contact';
      }
    }

    search_fields = _.pick(search_fields, avail_search_fields);

    bundle.request.params = _.extend(bundle.request.params, search_fields);
    return bundle.request;
  },

  post_search: function (type, bundle) {
    type = this.convertEntityName(type, 'many');
    var
      tmp,
      entities = [],
      api_name = this.convertEntityName(type, 'api_name');

    if (bundle.response.status_code == 204) {
      return [];
    }

    if (bundle.response.content) {
      /** @var {String} tmp */
      tmp = bundle.response.content;
      /** @var {Object} tmp */
      tmp = _.isString(tmp) ? JSON.parse(tmp) : tmp;
      if (tmp && tmp.response && tmp.response[api_name]) {
        entities = tmp.response[api_name];
      }
    }

    entities = _.sortBy(entities, 'last_modified').reverse();
    tmp = _.map(entities, function (entity) {
      var content = {};
      content[api_name] = {search: [entity]};
      return this.convertEntity('search', type, content);
    }, this);

    return tmp;
  },

  post_write: function (action, type, bundle) {
    type = this.convertEntityName(type, 'many');
    var tmp,
      api_name = this.convertEntityName(type, 'api_name'),
      result = {
        id: 0,
        subdomain: bundle.auth_fields.account
      };

    if (bundle.response.content) {
      /** @var {String} tmp */
      tmp = bundle.response.content;
      /** @var {Object} tmp */
      tmp = _.isString(tmp) ? JSON.parse(tmp) : tmp;
      if (tmp && tmp.response && tmp.response[api_name]) {
        tmp = tmp.response[api_name];
        if (tmp[action] && tmp[action][0] && tmp[action][0].id) {
          result.id = tmp[action][0].id;
        }
      }
    }

    if (result.id && (type === 'contacts' || type === 'leads' || type === 'companies')) {
      result.url = URLParams.buildUrl(bundle.auth_fields.account, type + '/detail/' + result.id);
    }

    return result;
  },

  pre_write: function (action, type, bundle) {
    var
      api_name = this.convertEntityName(type, 'api_name'),
      data = bundle.action_fields,
      request_data = {},
      base_fields;

    if (!data) {
      return bundle.request;
    }

    _.each(['date_create', 'complete_till'], function (key) {
      if (data[key]) {
        data[key] = CustomFields.convertDateToTimestamp(data[key]);
      }
    });

    if (action === 'add' && api_name === 'notes') {
      data.note_type = CustomFields.getNoteType('common', 'id');
    }

    if (action !== 'add') {
      data.last_modified = moment().format('X');
    }

    if (data.custom_fields) {
      data.custom_fields = CustomFields.convertToApi(type, data.custom_fields);
    }

    if (type === 'task' || type === 'note') {
      base_fields = CustomFields.getAdditionsFields('action_' + action, type);
      base_fields = _.map(base_fields, function (field) {
        return field.key;
      });
      base_fields.push('last_modified');
      data = _.pick(data, base_fields);
    }

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
          api_name: 'contacts',
          id: 1
        },
        {
          many: 'companies',
          single: 'company',
          api_name: 'contacts',
          id: 3
        },
        {
          many: 'leads',
          single: 'lead',
          api_name: 'leads',
          id: 2
        },
        {
          many: 'tasks',
          single: 'task',
          api_name: 'tasks',
          id: 4
        },
        {
          many: 'notes',
          single: 'note',
          api_name: 'notes',
          id: 5
        }
      ],
      result = false;

    entity = entity.toString();

    _.each(names, function (names_array) {
      if (result) {
        return;
      }

      var found = false;
      _.each(names_array, function (name) {
        if (name.toString() === entity) {
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
    if (entity === 'task' || entity === 'note') {
      return this.prepareFieldsFromAccountForAdditions(action, entity, content);
    }

    var account, tmp, users, statuses, pipelines,
      custom_fields;

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

    if (account.pipelines) {
      pipelines = {};
      _.each(account.pipelines, function (pipeline) {
        pipelines[pipeline.id] = pipeline.name;
      });
    }

    custom_fields = CustomFields.getBaseFields(action, entity, users, statuses, pipelines);

    if (account.custom_fields && action !== 'action_search') {
      tmp = account.custom_fields[this.convertEntityName(entity, 'many')];
      tmp = CustomFields.convertFromAccountInfo(tmp);
      _.each(tmp, function (field) {
        custom_fields.push(field);
      });
    }

    return custom_fields;
  },

  prepareFieldsFromAccountForAdditions: function (action, entity, content) {
    var account, users, tmp, types, entity_name;

    account = content ? JSON.parse(content) : null;
    if (!(account && account.response && account.response.account)) {
      return CustomFields.getAdditionsFields(action, entity);
    }

    account = account.response.account;
    entity_name = this.convertEntityName(entity, 'single', false);
    tmp = entity_name + '_types';
    if (entity_name === 'task' && account[tmp]) {
      types = {};
      _.each(account[tmp], function (type) {
        types[type.id] = type.name.toString().trim();
      });
    }

    if (account.users) {
      users = {};
      _.each(account.users, function (user) {
        users[user.id] = user.name;
      });
    }

    return CustomFields.getAdditionsFields(action, entity, users, types);
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
        'old_status_id',
        'element_id',
        'element_type',
        'note_type',
        'text',
        'editable'
      ];

    if (!content) {
      return entity;
    }

    if (_.isString(content)) {
      content = URLParams.parse(content);
    }

    if (!(content[this.convertEntityName(type, 'api_name')][action][0])) {
      return entity;
    }

    entity = content[this.convertEntityName(type, 'api_name')][action][0];

    result = _.pick(entity, fields);
    if (entity.tags) {
      result.tags = _.map(entity.tags, function (tag) {
        return tag.name;
      }).join(', ');
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

    result.custom_fields = CustomFields.convertFromApi(entity.custom_fields, action);

    return result;
  },

  getBaseFields: function (type) {
    var base_fields;
    switch (type) {
      case 'tasks':
      case 'notes':
        base_fields = CustomFields.getAdditionsFields('all', type);
        break;
      default:
        base_fields = CustomFields.getBaseFields('all', type);
        break;
    }
    return base_fields;
  },

  convertForRead: function (type, entity) {
    var base_fields = this.getBaseFields(type);

    _.each(base_fields, function (field) {
      if (typeof entity[field.key] === 'undefined') {
        return;
      }

      entity[field.label] = entity[field.key];

      delete entity[field.key];
    });

    _.each(entity.custom_fields, function (cf_value, cf_name) {
      entity['CF: ' + cf_name] = cf_value;
    });
    delete entity.custom_fields;


    return entity;
  },

  hooksPrePoll: function (action, entity, bundle) {
    return {
      url: bundle.request.url,
      method: bundle.request.method,
      auth: bundle.request.auth,
      headers: bundle.request.headers,
      params: _.extend(bundle.request.params, {type: 'query'}),
      data: bundle.request.data
    };
  }
});

Application = new Application();
