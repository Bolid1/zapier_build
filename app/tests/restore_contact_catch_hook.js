bundle = {
  "cleaned_request": {
    "contacts[restore][0][responsible_user_id]": "102525",
    "contacts[restore][0][id]": "1065",
    "contacts[restore][0][created_user_id]": "102525",
    "querystring": {},
    "account[subdomain]": "test000002",
    "contacts[restore][0][modified_user_id]": "102525",
    "contacts[restore][0][last_modified]": "1456827128",
    "contacts[restore][0][name]": "Some name",
    "contacts[restore][0][date_create]": "1456375650",
    "contacts[restore][0][type]": "contact"
  },
  "trigger_fields": {},
  "request": {
    "content": "contacts%5Brestore%5D%5B0%5D%5Bid%5D=1065&contacts%5Brestore%5D%5B0%5D%5Bname%5D=Some+name&contacts%5Brestore%5D%5B0%5D%5Bresponsible_user_id%5D=102525&contacts%5Brestore%5D%5B0%5D%5Bdate_create%5D=1456375650&contacts%5Brestore%5D%5B0%5D%5Blast_modified%5D=1456827128&contacts%5Brestore%5D%5B0%5D%5Bcreated_user_id%5D=102525&contacts%5Brestore%5D%5B0%5D%5Bmodified_user_id%5D=102525&contacts%5Brestore%5D%5B0%5D%5Btype%5D=contact&account%5Bsubdomain%5D=test000002",
    "headers": {
      "Http-Host": "zapier.com",
      "Http-User-Agent": "amoCRM-WebHook-client/1.0",
      "Http-Connection": "close",
      "Http-X-Forwarded-Proto": "https",
      "Content-Length": "463",
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
  "zap": {}
};

result = Zap.restore_contact_catch_hook(bundle);
if (!result) {
  console.error('Restore contact test failed');
} else {
  console.info('Restore contact test success');
}