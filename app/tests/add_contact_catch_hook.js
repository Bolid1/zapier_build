bundle = {
  "cleaned_request": {
    "contacts[add][0][date_create]": "1456824964",
    "contacts[add][0][id]": "1112",
    "querystring": {},
    "account[subdomain]": "test000002",
    "contacts[add][0][name]": "wqds",
    "contacts[add][0][modified_user_id]": "102525",
    "contacts[add][0][responsible_user_id]": "102525",
    "contacts[add][0][type]": "contact",
    "contacts[add][0][last_modified]": "1456824964",
    "contacts[add][0][created_user_id]": "102525"
  },
  "zap": {},
  "request": {
    "content": "contacts%5Badd%5D%5B0%5D%5Bid%5D=1112&contacts%5Badd%5D%5B0%5D%5Bname%5D=wqds&contacts%5Badd%5D%5B0%5D%5Bresponsible_user_id%5D=102525&contacts%5Badd%5D%5B0%5D%5Bdate_create%5D=1456824964&contacts%5Badd%5D%5B0%5D%5Blast_modified%5D=1456824964&contacts%5Badd%5D%5B0%5D%5Bcreated_user_id%5D=102525&contacts%5Badd%5D%5B0%5D%5Bmodified_user_id%5D=102525&contacts%5Badd%5D%5B0%5D%5Btype%5D=contact&account%5Bsubdomain%5D=test000002",
    "headers": {
      "Http-Host": "zapier.com",
      "Http-User-Agent": "amoCRM-WebHook-client/1.0",
      "Http-Connection": "close",
      "Http-X-Forwarded-Proto": "https",
      "Content-Length": "426",
      "Http-Accept": "*/*",
      "Http-X-Forwarded-Port": "443",
      "Content-Type": "application/x-www-form-urlencoded",
      "Http-X-Forwarded-For": "80.250.213.62, 10.0.15.234"
    },
    "querystring": "",
    "method": "POST"
  },
  "auth_fields": {
    "login": "v.vargin@team.amocrm.com",
    "api_key": "0c0e8f9dedfd8d24c606bbac63827274",
    "account": "test000002"
  },
  "trigger_fields": {}
};

result = Zap.add_contact_catch_hook(bundle);
if (!result) {
  console.error('Add contact test failed');
} else {
  console.info('Add contact test success');
}