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

  getBaseFields: function (action, entity) {
    var
      entity_name = Application.convertEntityName(entity, 'single', true),
      entity_name_lowercase = Application.convertEntityName(entity, 'single', false),
      zap_action,
      result;

    action = action.split('_');
    zap_action = action[0];
    action = action[1];

    // Set base fields for all
    result = [
      {
        type: 'unicode',
        key: 'name',
        label: entity_name + ' name'
      },
      {
        type: 'unicode',
        key: 'date_create',
        label: 'Date of creation of this ' + entity_name_lowercase
      },
      {
        type: 'int',
        key: 'responsible_user_id',
        label: 'Unique identified of a responsible user'
      },
      {
        type: 'unicode',
        key: 'last_modified',
        label: 'Date when ' + entity_name_lowercase + ' was modified'
      }
    ];

    if (!(zap_action === 'action' && action === 'add')) {
      result.push({
        type: 'int',
        key: 'id',
        label: 'Unique ' + entity_name_lowercase + ' identifier'
      });
    }

    if (zap_action === 'hook') {
      result = result.concat([
        {
          type: 'int',
          key: 'created_user_id',
          label: 'Unique identified of a user which has created this ' + entity_name_lowercase
        },
        {
          type: 'int',
          key: 'modified_user_id',
          label: 'Unique identified of a user which has modified this ' + entity_name_lowercase
        }
      ]);

      if (entity_name_lowercase !== 'lead') {
        result = result.concat([
          {
            type: 'int',
            key: 'group_id',
            label: 'Unique identified of a group'
          },
          {
            type: 'unicode',
            key: 'tags',
            label: 'Tag names separated by commas'
          }
        ]);
      }

      if (entity_name_lowercase === 'contact') {
        result.push({
          type: 'int',
          key: 'linked_company_id',
          label: 'Unique identified of a linked company'
        });
      }

      if (action === 'status' && entity_name_lowercase === 'lead') {
        result.push({
          type: 'int',
          key: 'old_status_id',
          label: 'Unique previous status identifier'
        });
      }

      if (action === 'responsible') {
        result.push({
          type: 'int',
          key: 'old_responsible_user_id',
          label: 'Unique identified of a previous responsible user'
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
          key: 'pipeline_id',
          label: 'ID of the pipeline in which ' + entity_name_lowercase + ' located'
        },
        {
          type: 'unicode',
          key: 'price',
          label: 'Lead budget'
        },
        {
          type: 'int',
          key: 'status_id',
          label: 'Unique status identifier'
        }
      ]);
    }

    return result;
  },

  convertFromApi: function (custom_fields) {
    var result = {};

    _.each(custom_fields, function (custom_field) {
      var cf_value, tmp;

      if (!custom_field.code) {
        custom_field.code = '';
      }

      switch (custom_field.code) {
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
        console.error('Custom field has no type_id key');
        console.error(account_custom_field);
        return;
      }

      var
        cf_type = this.getType(account_custom_field.type_id),
        cf_key = ['custom_fields', account_custom_field.id].join('__');

      if (!cf_type) {
        console.error('Undefined cf_type');
        console.error(account_custom_field);
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
          values.push({
            value: enum_value,
            enum: enum_id,
            subtype: enum_id
          });
        });
      } else {
        values.push({
          value: custom_field
        });
      }

      result.push({
        id: cf_id,
        values: values
      });
    });

    return result;
  }
});

CustomFields = new CustomFields();