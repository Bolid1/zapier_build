var
  bundle = {
    "cleaned_request": {
      "querystring": {},
      "leads[delete][0][id]": "52379505",
      "account[subdomain]": "test",
      "leads[delete][0][type]": "lead"
    },
    "trigger_fields": {},
    "request": {
      "content": "contacts%5Bdelete%5D%5B0%5D%5Bid%5D=52379505&leads%5Bdelete%5D%5B0%5D%5Btype%5D=lead&account%5Bsubdomain%5D=test",
      "headers": {
        "Http-Host": "zapier.com",
        "Http-User-Agent": "amoCRM-WebHook-client/1.0",
        "Http-Connection": "close",
        "Http-X-Forwarded-Proto": "https",
        "Content-Length": "126",
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
      "link": "https://zapier.com/app/edit/7489755",
      "name": "Deleted lead in amoCRM",
      "user": {
        "timezone": "UTC"
      }
    }
  },
  result = {
    "url": "https://test.amocrm.com/leads/trash/?filter[ID][]=52379505",
    "subdomain": "test",
    "id": "52379505"
  };