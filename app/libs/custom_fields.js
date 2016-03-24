var CustomFields = function () {};

_.extend(CustomFields.prototype, {
  _types: {
    1: {
      code: 'text',
      type: 'unicode'
    },
    2: {
      code: 'numeric',
      type: 'int'
    },
    3: {
      code: 'checkbox',
      type: 'bool'
    },
    4: {
      code: 'select',
      type: 'int'
    },
    5: {
      code: 'multiselect',
      type: 'int'
    },
    6: {
      code: 'date',
      type: 'datetime'
    },
    7: {
      code: 'url',
      type: 'unicode'
    },
    8: {
      code: 'multitext',
      type: 'unicode'
    },
    9: {
      code: 'textarea',
      type: 'text'
    },
    10: {
      code: 'radiobutton',
      type: 'int'
    },
    11: {
      code: 'streetaddress',
      type: 'text'
    },
    13: {
      code: 'smart_address',
      type: 'unicode'
    },
    14: {
      code: 'birthday',
      type: 'datetime'
    }
  },

  _note_types: {
    1: {
      id: 1,
      name: "",
      code: "DEAL_CREATED",
      editable: "N"
    },
    2: {
      id: 2,
      name: "",
      code: "CONTACT_CREATED",
      editable: "N"
    },
    3: {
      id: 3,
      name: "",
      code: "DEAL_STATUS_CHANGED",
      editable: "N"
    },
    4: {
      id: 4,
      name: "",
      code: "COMMON",
      editable: "Y"
    },
    5: {
      id: 5,
      name: "",
      code: "ATTACHEMENT",
      editable: "N"
    },
    6: {
      id: 6,
      name: "",
      code: "CALL",
      editable: "N"
    },
    7: {
      id: 7,
      name: "",
      code: "MAIL_MESSAGE",
      editable: "N"
    },
    8: {
      id: 8,
      name: "",
      code: "MAIL_MESSAGE_ATTACHMENT",
      editable: "N"
    },
    9: {
      id: 9,
      name: "",
      code: "EXTERNAL_ATTACH",
      editable: "N"
    },
    10: {
      id: 10,
      name: "",
      code: "CALL_IN",
      editable: "N"
    },
    11: {
      id: 11,
      name: "",
      code: "CALL_OUT",
      editable: "N"
    },
    12: {
      id: 12,
      name: "",
      code: "COMPANY_CREATED",
      editable: "N"
    },
    13: {
      id: 13,
      name: "",
      code: "TASK_RESULT",
      editable: "N"
    },
    99: {
      id: 99,
      name: "",
      code: "MAX_SYSTEM",
      editable: "N"
    },
    101: {
      id: 101,
      name: "Link",
      code: "DROPBOX",
      editable: "N"
    },
    102: {
      id: 102,
      name: "Incoming",
      code: "SMS_IN",
      editable: "N"
    },
    103: {
      id: 103,
      name: "Outgoing",
      code: "SMS_OUT",
      editable: "N"
    }
  },

  getType: function (type_id, prop) {
    var result = this._types;

    if (type_id) {
      result = typeof result[type_id] !== 'undefined' ? result[type_id] : null;
      if (prop) {
        result = typeof result[prop] !== 'undefined' ? result[prop] : null;
      }
    }

    return result;
  },

  getNoteType: function (type_id, prop) {
    var result = this._note_types;

    if (type_id) {
      if (_.isNumber(type_id)) {
        result = typeof result[type_id] !== 'undefined' ? result[type_id] : null;
      } else {
        result = _.findWhere(_.values(result), {code: type_id.toString().toUpperCase()});
      }

      if (result && prop) {
        result = typeof result[prop] !== 'undefined' ? result[prop] : null;
      }
    }

    return result;
  },

  getBaseFields: function (action, entity, users, statuses, pipelines) {
    var
      entity_name = Application.convertEntityName(entity, 'single', true),
      entity_name_lowercase = Application.convertEntityName(entity, 'single', false),
      zap_action,
      result,
      is_action_add;

    action = action.split('_');
    zap_action = action[0];
    action = action[1];

    result = [
      {
        type: 'int',
        key: 'responsible_user_id',
        label: 'Unique identified of a responsible user',
        choices: users ? users : undefined
      }
    ];

    if (zap_action === 'action' && action === 'search') {
      return result;
    }

    // Set base fields for all
    is_action_add = zap_action === 'action' && action === 'add';

    result = result.concat([
      {
        type: 'unicode',
        key: 'name',
        label: entity_name + ' name',
        required: is_action_add
      },
      {
        type: 'datetime',
        key: 'date_create',
        label: 'Date of creation of this ' + entity_name_lowercase
      }
    ]);

    if (!is_action_add) {
      result.push({
        type: 'int',
        key: 'id',
        label: 'Unique ' + entity_name_lowercase + ' identifier',
        required: true
      });
    }

    if (zap_action === 'hook') {
      result = result.concat([
        {
          type: 'datetime',
          key: 'last_modified',
          label: 'Date when ' + entity_name_lowercase + ' was modified'
        },
        {
          type: 'int',
          key: 'created_user_id',
          label: 'Unique identified of a user which has created this ' + entity_name_lowercase,
          choices: users ? users : undefined
        },
        {
          type: 'int',
          key: 'modified_user_id',
          label: 'Unique identified of a user which has modified this ' + entity_name_lowercase,
          choices: users ? users : undefined
        }
      ]);

      if (zap_action === 'hook' && entity_name_lowercase !== 'lead') {
        result.push({
          type: 'int',
          key: 'group_id',
          label: 'Unique identified of a group'
        });
      }

      if (zap_action === 'hook' && entity_name_lowercase !== 'lead' || zap_action === 'action') {
        result.push({
          type: 'unicode',
          key: 'tags',
          label: 'Tag names separated by commas'
        });
      }

      if (zap_action === 'hook' && entity_name_lowercase === 'contact') {
        result.push({
          type: 'int',
          key: 'linked_company_id',
          label: 'Unique identified of a linked company'
        });
      }

      if (zap_action === 'hook' && action === 'status') {
        result.push({
          type: 'int',
          key: 'old_status_id',
          label: 'Unique previous status identifier'
        });
      }

      if (zap_action === 'hook' && action === 'responsible') {
        result.push({
          type: 'int',
          key: 'old_responsible_user_id',
          label: 'Unique identified of a previous responsible user',
          choices: users ? users : undefined
        });
      }
    }

    if (entity_name_lowercase === 'contact') {
      result.push({
        type: 'unicode',
        key: 'company_name',
        label: 'Company name'
      });
    }

    if (entity_name_lowercase === 'lead') {
      result = result.concat([
        {
          type: 'int',
          key: 'price',
          label: 'Lead budget'
        },
        {
          type: 'int',
          key: 'status_id',
          label: 'Unique status identifier',
          choices: statuses ? statuses : undefined,
          required: is_action_add
        }
      ]);
    }

    if (zap_action === 'hook' || pipelines) {
      result.push({
        type: 'int',
        key: 'pipeline_id',
        label: 'ID of the pipeline in which ' + entity_name_lowercase + ' located' + (zap_action === 'action' ? ' (for closed statuses)' : ''),
        choices: pipelines
      });
    }

    return result;
  },

  getAdditionsFields: function (action, entity, users, types) {
    var
      entity_name = Application.convertEntityName(entity, 'single', true),
      entity_name_lowercase = Application.convertEntityName(entity, 'single', false),
      zap_action,
      result,
      is_action_add;

    action = action.split('_');
    zap_action = action[0];
    action = action[1];

    // Set base fields for all
    is_action_add = zap_action === 'action' && action === 'add';

    result = [
      {
        type: 'datetime',
        key: 'date_create',
        label: 'Date of creation of this ' + entity_name_lowercase
      },
      {
        type: 'int',
        key: 'responsible_user_id',
        label: 'Unique identified of a responsible user',
        choices: users ? users : undefined
      },
      {
        type: 'int',
        key: 'element_id',
        label: 'Unique identifier of the contact or lead (contact/lead must be indicated in element_type)',
        required: true
      },
      {
        type: 'int',
        key: 'element_type',
        label: 'Type of element to be linked',
        choices: {
          1: Application.convertEntityName('contact', 'single', true),
          2: Application.convertEntityName('lead', 'single', true),
          3: Application.convertEntityName('company', 'single', true)
        },
        required: true
      }
    ];

    if (!is_action_add) {
      result.push({
        type: 'int',
        key: 'id',
        label: 'Unique ' + entity_name_lowercase + ' identifier',
        required: true
      });
    }

    result.push({
      type: 'text',
      key: 'text',
      label: 'Text of ' + entity_name_lowercase,
      required: is_action_add || entity_name_lowercase === 'task'
    });

    if (entity_name_lowercase === 'task') {
      result = result.concat([
        {
          type: 'datetime',
          key: 'complete_till',
          label: 'A date by which the task must be completed. If time has value 23:59, then “All day” will be displayed in system interfaces instead of time.',
          required: is_action_add
        },
        {
          type: 'int',
          key: entity_name_lowercase + '_type',
          label: entity_name + ' type',
          choices: types ? types : undefined,
          required: is_action_add
        }
      ]);
    }

    return result;
  },

  convertFromApi: function (custom_fields, action) {
    var result = {};

    _.each(custom_fields, function (custom_field) {
      var cf_value, tmp;

      if (!custom_field.code) {
        custom_field.code = '';
      }

      switch (custom_field.code.toUpperCase()) {
        case 'SMART_ADDRESS':
          cf_value = {};
          _.each(custom_field.values, function (val) {
            cf_value[val.subtype] = val.value;
          });
          break;
        case 'PHONE':
        case 'EMAIL':
        case 'IM':
          cf_value = {};
          tmp = {};
          _.each(custom_field.values, function (val) {
            var option = val && val['enum'] ? val['enum'] : null;
            if (!option) {
              return;
            }

            if (!tmp[option]) {
              tmp[option] = [];
            }

            tmp[option].push(val.value);
          });

          _.each(tmp, function (value, key) {
            cf_value[key] = value.join(', ');
          });
          break;
        // case 'WEB':
        // case 'POSITION':
        // case 'ADDRESS':
        default:
          tmp = [];
          _.each(custom_field.values, function (val) {
            tmp.push((typeof val.value !== 'undefined' ? val.value : val));
          });
          cf_value = tmp.join(', ');
          break;
      }

      if (!cf_value) {
        return;
      }

      result[custom_field.id] = cf_value;
    }, this);

    return result;
  },

  convertFromAccountInfo: function (account_custom_fields) {
    var custom_fields = [];

    _.each(account_custom_fields, function (account_custom_field) {
      if (!(account_custom_field && account_custom_field.type_id)) {
        return;
      }

      var
        cf_type = this.getType(account_custom_field.type_id),
        cf_key = ['custom_fields', account_custom_field.id].join('__');

      if (!cf_type) {
        return;
      }

      switch (cf_type.code) {
        case 'radiobutton':
        case 'select':
          custom_fields.push({
            type: cf_type.type,
            key: cf_key,
            label: account_custom_field.name,
            choices: account_custom_field.enums
          });
          break;

        case 'multiselect':
          custom_fields.push({
            type: cf_type.type,
            key: cf_key,
            label: account_custom_field.name,
            choices: account_custom_field.enums,
            list: true
          });
          break;

        case 'multitext':
          _.each(account_custom_field.enums, function (enum_name, enum_id) {
            custom_fields.push({
              type: cf_type.type,
              key: [cf_key, enum_id].join('__'),
              label: [account_custom_field.name, enum_name].join(' '),
              list: true
            });
          });
          break;

        case 'url':
        case 'textarea':
        case 'streetaddress':
        case 'text':
        case 'numeric':
        case 'checkbox':
        case 'date':
        case 'birthday':
          custom_fields.push({
            type: cf_type.type,
            key: cf_key,
            label: account_custom_field.name
          });
          break;

        case 'smart_address':
          _.each(account_custom_field.subtypes, function (subtype) {
            custom_fields.push({
              type: cf_type.type,
              key: [cf_key, subtype.name].join('__'),
              label: subtype.title
            });
          });
          break;
      }
    }, this);

    return custom_fields;
  },

  convertToApi: function (type, custom_fields) {
    var result = [];

    _.each(custom_fields, function (custom_field, cf_id) {
      var values = [];

      if (_.isObject(custom_field)) {
        _.each(custom_field, function (enum_value, enum_id) {
          if (!_.isArray(enum_value)) {
            enum_value = [enum_value];
          }

          _.each(enum_value, function (value) {
            values.push({
              value: value,
              'enum': enum_id,
              subtype: enum_id
            });
          });
        });
      } else {
        values.push({
          value: _.isArray(custom_field) ? custom_field.join(', ') : custom_field
        });
      }

      result.push({
        id: cf_id,
        values: values
      });
    });

    return result;
  },

  convertDateToTimestamp: function (date) {
    if (!date) {
      return 0;
    }

    if (date.replace(/\D/g, '') == date) {
      return;
    }

    date = date.replace('datetime-', '');
    return moment(new Date(date)).format('X');
  }
});

CustomFields = new CustomFields();
