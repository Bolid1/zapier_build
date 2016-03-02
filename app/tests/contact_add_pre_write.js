bundle = {
  "auth_fields": {
    "login": "v.vargin@team.amocrm.com",
    "api_key": "0c0e8f9dedfd8d24c606bbac63827274",
    "account": "test000002"
  },
  "request": {
    "files": {},
    "url": "http://test000002.main2.amocrm2.saas.v.qsoft.ru/private/api/v2/json/contacts/set/",
    "headers": {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json"
    },
    "params": {
      "USER_LOGIN": "v.vargin@team.amocrm.com",
      "USER_HASH": "0c0e8f9dedfd8d24c606bbac63827274"
    },
    "data": "{\"name\": \"gfg\", \"custom_fields\": {\"1119037\": {\"2568237\": \"other@mail.com\"}, \"1119035\": \"CEO\"}}",
    "method": "POST"
  },
  "action_fields": {
    "name": "gfg",
    "custom_fields": {
      "1119037": {
        "2568237": "other@mail.com"
      },
      "1119035": "CEO"
    }
  },
  "action_fields_full": {
    "custom_fields__1119037__2568237": "other@mail.com",
    "name": "gfg",
    "custom_fields__1119035": "CEO"
  },
  "meta": {
    "frontend": true
  },
  "action_fields_raw": {
    "custom_fields__1119037__2568237": "other@mail.com",
    "name": "{{7556965__text}}",
    "custom_fields__1119035": "CEO"
  },
  "url_raw": "http://{{account}}.main2.amocrm2.saas.v.qsoft.ru/private/api/v2/json/contacts/set/",
  "zap": {
    "live": false,
    "link": "https://zapier.com/app/edit/7556965",
    "name": "Create Contact",
    "user": {
      "timezone": "UTC"
    }
  }
};

result = Zap.contact_add_pre_write(bundle);
if (!result) {
  console.error('Contact add test failed');
} else {
  console.info('Contact add test success');
}