var
  pre_subscribe_bundle = {
    "target_url": "https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/",
    "auth_fields": {
      "login": "v.vargin@team.amocrm.com",
      "api_key": "9292ec5cdb8d5d48bb307cd83c6a0d02",
      "account": "test"
    },
    "subscription_url": "https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/",
    "request": {
      "files": null,
      "url": "https://test.amocrm.com/private/api/v2/json/webhooks/subscribe/",
      "headers": {
        "X-Hook-Test": "true",
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
      "params": {
        "USER_LOGIN": "v.vargin@team.amocrm.com",
        "USER_HASH": "9292ec5cdb8d5d48bb307cd83c6a0d02"
      },
      "data": "{\"subscription_url\": \"https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/\", \"target_url\": \"https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/\", \"event\": \"delete_company\"}",
      "method": "POST"
    },
    "trigger_fields": {},
    "event": "delete_company",
    "zap": {
      "live": false,
      "link": "https://zapier.com/app/edit/7489755",
      "name": "Deleted company in amoCRM",
      "user": {
        "timezone": "UTC"
      }
    },
    "trigger_data": {}
  },
  pre_subscribe_result = {
    "files": null,
    "url": "https://test.amocrm.com/private/api/v2/json/webhooks/subscribe/",
    "headers": {
      "X-Hook-Test": "true",
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json"
    },
    "params": {
      "USER_LOGIN": "v.vargin@team.amocrm.com",
      "USER_HASH": "9292ec5cdb8d5d48bb307cd83c6a0d02"
    },
    "data": "{\"request\":{\"webhooks\":{\"subscribe\":[{\"url\":\"https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/\",\"events\":\"delete_company\"}]}}}",
    "method": "POST"
  },
  pre_unsubscribe_bundle = {
    "target_url": "https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/",
    "auth_fields": {
      "login": "v.vargin@team.amocrm.com",
      "api_key": "9292ec5cdb8d5d48bb307cd83c6a0d02",
      "account": "test"
    },
    "subscription_url": "https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/",
    "request": {
      "files": null,
      "url": "https://test.amocrm.com/private/api/v2/json/webhooks/unsubscribe/",
      "headers": {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
      "params": {
        "USER_LOGIN": "v.vargin@team.amocrm.com",
        "USER_HASH": "9292ec5cdb8d5d48bb307cd83c6a0d02"
      },
      "data": "{\"subscription_url\": \"https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/\", \"target_url\": \"https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/\"}",
      "method": "POST"
    },
    "trigger_fields": {},
    "subscribe_data": {
      "response": {
        "webhooks": {
          "subscribe": [
            {
              "url": "https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/",
              "result": true
            }
          ]
        },
        "server_time": 1457094644
      }
    },
    "event": "delete_company",
    "zap": {
      "live": false,
      "link": "https://zapier.com/app/edit/7489755",
      "name": "Deleted company in amoCRM",
      "user": {
        "timezone": "UTC"
      }
    },
    "trigger_data": {}
  },
  pre_unsubscribe_result = {
    "files": null,
    "url": "https://test.amocrm.com/private/api/v2/json/webhooks/unsubscribe/",
    "headers": {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json"
    },
    "params": {
      "USER_LOGIN": "v.vargin@team.amocrm.com",
      "USER_HASH": "9292ec5cdb8d5d48bb307cd83c6a0d02"
    },
    "data": "{\"request\":{\"webhooks\":{\"unsubscribe\":[{\"url\":\"https://zapier.com/hooks/standard/4d7202ca81ea4d1c80cacfbc23f7c954/\",\"events\":\"delete_company\"}]}}}",
    "method": "POST"
  },
  post_custom_trigger_fields_bundle = {
    "raw_url": "https://{{account}}.amocrm.com/private/api/v2/json/accounts/current/",
    "auth_fields": {
      "login": "v.vargin@team.amocrm.com",
      "api_key": "9292ec5cdb8d5d48bb307cd83c6a0d02",
      "account": "test"
    },
    "request": {
      "url": "https://test.amocrm.com/private/api/v2/json/accounts/current/",
      "auth": null,
      "headers": {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
      "params": {
        "USER_LOGIN": "v.vargin@team.amocrm.com",
        "USER_HASH": "9292ec5cdb8d5d48bb307cd83c6a0d02"
      },
      "data": null,
      "method": "GET"
    },
    "trigger_fields": {},
    "response": {
      "content": "{\"response\":{\"account\":{\"id\":\"9931843\",\"name\":\"test\",\"subdomain\":\"test\",\"currency\":\"LVL\",\"paid_from\":false,\"paid_till\":false,\"timezone\":\"Europe\\/Moscow\",\"language\":\"en\",\"date_pattern\":\"d.m.Y H:i\",\"date_format\":\"d.m.Y\",\"time_format\":\"H:i:s\",\"country\":\"lv\",\"unsorted_on\":\"Y\",\"limits\":{\"users_count\":false,\"contacts_count\":false,\"active_deals_count\":false},\"users\":[{\"id\":\"654094\",\"mail_admin\":\"A\",\"name\":\"Stanislav Yupatov\",\"last_name\":null,\"login\":\"supatov@team.amocrm.com\",\"photo_url\":null,\"phone_number\":\"\",\"language\":\"en\",\"group_id\":35540,\"rights_lead_add\":\"A\",\"rights_lead_view\":\"A\",\"rights_lead_edit\":\"A\",\"rights_lead_delete\":\"A\",\"rights_lead_export\":\"A\",\"rights_contact_add\":\"A\",\"rights_contact_view\":\"A\",\"rights_contact_edit\":\"A\",\"rights_contact_delete\":\"A\",\"rights_contact_export\":\"A\",\"rights_company_add\":\"A\",\"rights_company_view\":\"A\",\"rights_company_edit\":\"A\",\"rights_company_delete\":\"A\",\"rights_company_export\":\"A\",\"unsorted_access\":\"Y\",\"is_admin\":\"Y\"},{\"id\":\"620487\",\"mail_...",
      "status_code": 200,
      "headers": {
        "content-encoding": "gzip",
        "transfer-encoding": "chunked",
        "set-cookie": "session_id=s5d7o8ponc6n4t7359a18q3mjlm33pni8b84glk3jv3laguc31t1; path=/; domain=.amocrm.com, BITRIX_SM_LOGIN=v.vargin%40team.amocrm.com; expires=Sat, 06-Feb-2021 12:35:51 GMT; path=/; domain=.amocrm.com, BITRIX_SM_SALE_UID=0; expires=Mon, 27-Feb-2017 12:35:51 GMT; path=/; domain=.amocrm.com, user_lang=en; expires=Thu, 04-Mar-2021 12:35:51 GMT; path=/; domain=.amocrm.com",
        "expires": "Thu, 19 Nov 1981 08:52:00 GMT",
        "server": "nginx",
        "connection": "keep-alive",
        "pragma": "no-cache",
        "cache-control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
        "date": "Fri, 04 Mar 2016 12:35:51 GMT",
        "p3p": "policyref=\"/bitrix/p3p.xml\", CP=\"NON DSP COR CUR ADM DEV PSA PSD OUR UNR BUS UNI COM NAV INT DEM STA\"",
        "content-type": "application/json; charset=\"utf-8\""
      }
    },
    "zap": {
      "live": false,
      "link": "https://zapier.com/app/edit/7489817",
      "name": "Restore company in amoCRM",
      "user": {
        "timezone": "UTC"
      }
    }
  },
  hooks_company_post_custom_trigger_fields_result = [
    {
      "type": "unicode",
      "key": "name",
      "label": "Company name"
    },
    {
      "type": "datetime",
      "key": "date_create",
      "label": "Date of creation of this company"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "responsible_user_id",
      "label": "Unique identified of a responsible user"
    },
    {
      "type": "datetime",
      "key": "last_modified",
      "label": "Date when company was modified"
    },
    {
      "type": "int",
      "key": "id",
      "label": "Unique company identifier"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "created_user_id",
      "label": "Unique identified of a user which has created this company"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "modified_user_id",
      "label": "Unique identified of a user which has modified this company"
    },
    {
      "type": "int",
      "key": "group_id",
      "label": "Unique identified of a group"
    },
    {
      "type": "unicode",
      "key": "tags",
      "label": "Tag names separated by commas"
    }
  ],
  hooks_contact_post_custom_trigger_fields_result = [
    {
      "type": "unicode",
      "key": "name",
      "label": "Contact name"
    },
    {
      "type": "datetime",
      "key": "date_create",
      "label": "Date of creation of this contact"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "responsible_user_id",
      "label": "Unique identified of a responsible user"
    },
    {
      "type": "datetime",
      "key": "last_modified",
      "label": "Date when contact was modified"
    },
    {
      "type": "int",
      "key": "id",
      "label": "Unique contact identifier"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "created_user_id",
      "label": "Unique identified of a user which has created this contact"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "modified_user_id",
      "label": "Unique identified of a user which has modified this contact"
    },
    {
      "type": "int",
      "key": "group_id",
      "label": "Unique identified of a group"
    },
    {
      "type": "unicode",
      "key": "tags",
      "label": "Tag names separated by commas"
    },
    {
      "type": "int",
      "key": "linked_company_id",
      "label": "Unique identified of a linked company"
    },
    {
      "type": "unicode",
      "key": "company_name",
      "label": "Company name"
    }
  ],
  hooks_lead_post_custom_trigger_fields_result = [
    {
      "type": "unicode",
      "key": "name",
      "label": "Lead name"
    },
    {
      "type": "datetime",
      "key": "date_create",
      "label": "Date of creation of this lead"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "responsible_user_id",
      "label": "Unique identified of a responsible user"
    },
    {
      "type": "datetime",
      "key": "last_modified",
      "label": "Date when lead was modified"
    },
    {
      "type": "int",
      "key": "id",
      "label": "Unique lead identifier"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "created_user_id",
      "label": "Unique identified of a user which has created this lead"
    },
    {
      "choices": {
        "654094": "Stanislav Yupatov",
        "517237": "Olga",
        "242836": "Test",
        "620487": "mnechiporuk@team.amocrm.com",
        "298923": "Helen",
        "504141": "Michel",
        "281868": "dkrasnorutsky@team.amocrm.com",
        "471574": "Olga Malgina",
        "609921": "Smith",
        "261002": "Antonio"
      },
      "type": "int",
      "key": "modified_user_id",
      "label": "Unique identified of a user which has modified this lead"
    },
    {
      "type": "int",
      "key": "pipeline_id",
      "label": "ID of the pipeline in which lead located"
    },
    {
      "type": "int",
      "key": "price",
      "label": "Lead budget"
    },
    {
      "choices": {
        "142": "Pipeline: Closed - won",
        "143": "Pipeline: Closed - lost",
        "9931858": "Pipeline: Contract Negotiation",
        "9931849": "Pipeline: Initial Contactwq",
        "9931855": "Pipeline: Negotiation",
        "9931852": "Pipeline: ewrtytewqerty",
        "10099317": "Pipeline: Agreement signed"
      },
      "type": "int",
      "key": "status_id",
      "label": "Unique status identifier"
    }
  ],
  action_lead_add_fields = [
    {
      "required": true,
      "type": "unicode",
      "key": "name",
      "label": "Lead name"
    },
    {
      "type": "datetime",
      "key": "date_create",
      "label": "Date of creation of this lead"
    },
    {
      "label": "Unique identified of a responsible user",
      "type": "int",
      "key": "responsible_user_id",
      "choices": {
        "261002": "dfsd"
      }
    },
    {
      "require": false,
      "type": "datetime",
      "key": "last_modified",
      "label": "Date when lead was modified"
    },
    {
      "type": "int",
      "key": "price",
      "label": "Lead budget"
    },
    {
      "require": true,
      "label": "Unique status identifier",
      "type": "int",
      "key": "status_id",
      "choices": {
        "142": "Pipeline: Closed - won",
        "143": "Pipeline: Closed - lost",
        "10450261": "Pipeline: Initial Contact",
        "10450267": "Pipeline: Negotiation",
        "10450264": "Pipeline: Offer made",
        "10450270": "Pipeline: Contract Negotiation"
      }
    },
    {
      "require": true,
      "label": "ID of the pipeline in which lead located",
      "type": "int",
      "key": "pipeline_id",
      "choices": {
        "112177": "Pipeline"
      }
    }
  ],
  action_note_add_fields = [
    {
      "type": "datetime",
      "key": "date_create",
      "label": "Date of creation of this note"
    },
    {
      "label": "Unique identified of a responsible user",
      "type": "int",
      "key": "responsible_user_id",
      "choices": {
        "261002": "dfsd"
      }
    },
    {
      "required": true,
      "type": "int",
      "key": "element_id",
      "label": "Unique identifier of the contact or lead (contact/lead must be indicated in element_type)"
    },
    {
      "required": true,
      "type": "int",
      "label": "Type of element to be linked",
      "key": "element_type",
      "choices": {
        "1": "Contact",
        "3": "Company",
        "2": "Lead"
      }
    },
    {
      "required": true,
      "type": "text",
      "key": "text",
      "label": "Text of note"
    }
  ];