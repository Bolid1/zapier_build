var
  bundle = {
    "cleaned_request": {
      "contacts[add][0][responsible_user_id]": "298923",
      "contacts[add][0][id]": "52379505",
      "contacts[add][0][created_user_id]": "298923",
      "querystring": {},
      "account[subdomain]": "test",
      "contacts[add][0][date_create]": "1457002089",
      "contacts[add][0][modified_user_id]": "261002",
      "contacts[add][0][last_modified]": "1457105741",
      "contacts[add][0][name]": "Some name",
      "contacts[add][0][group_id]": "35540",
      "contacts[add][0][type]": "company"
    },
    "trigger_fields": {},
    "request": {
      "content": "contacts%5Badd%5D%5B0%5D%5Bid%5D=52379505&contacts%5Badd%5D%5B0%5D%5Bname%5D=%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F+%D1%82%D0%B5%D1%81%D1%82+%D0%BA%D0%BE%D0%BC&contacts%5Badd%5D%5B0%5D%5Bresponsible_user_id%5D=298923&contacts%5Badd%5D%5B0%5D%5Bgroup_id%5D=35540&contacts%5Badd%5D%5B0%5D%5Bdate_create%5D=1457002089&contacts%5Badd%5D%5B0%5D%5Blast_modified%5D=1457105741&contacts%5Badd%5D%5B0%5D%5Bcreated_user_id%5D=298923&contacts%5Badd%5D%5B0%5D%5Bmodified_user_id%5D=261002&contacts%5Badd%5D%5B0%5D%5Btype%5D=company&account%5Bsubdomain%5D=test",
      "headers": {
        "Http-Host": "zapier.com",
        "Http-User-Agent": "amoCRM-WebHook-client/1.0",
        "Http-Connection": "close",
        "Http-X-Forwarded-Proto": "https",
        "Content-Length": "601",
        "Http-Accept": "*/*",
        "Http-X-Forwarded-Port": "443",
        "Content-Type": "application/x-www-form-urlencoded",
        "Http-X-Forwarded-For": "89.108.117.233, 10.0.15.167"
      },
      "querystring": "",
      "method": "POST"
    },
    "auth_fields": {
      "login": "v.vargin@team.amocrm.com",
      "api_key": "9292ec5cdb8d5d48bb307cd83c6a0d02",
      "account": "test"
    },
    "zap": {
      "live": false,
      "link": "https://zapier.com/app/edit/7489817",
      "name": "Added company in amoCRM",
      "user": {
        "timezone": "UTC"
      }
    }
  },
  result = {
    "modified_user_id": "261002",
    "responsible_user_id": "298923",
    "date_create": "Thu Mar 03 2016 10:48:09 GMT+0000 (UTC)",
    "last_modified": "Fri Mar 04 2016 15:35:41 GMT+0000 (UTC)",
    "created_user_id": "298923",
    "group_id": "35540",
    "id": "52379505",
    "custom_fields": {},
    "name": "Some company name"
  };