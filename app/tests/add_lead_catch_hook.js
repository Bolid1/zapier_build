bundle = {
  "cleaned_request": {
    "leads[add][0][last_modified]": "1456824464",
    "leads[add][0][custom_fields][0][values][0][value]": "asdfdsf",
    "leads[add][0][responsible_user_id]": "102525",
    "leads[add][0][status_id]": "10216993",
    "leads[add][0][created_user_id]": "102525",
    "leads[add][0][account_id]": "10216991",
    "account[subdomain]": "test000002",
    "querystring": {},
    "leads[add][0][name]": "qaz",
    "leads[add][0][custom_fields][0][id]": "1119321",
    "leads[add][0][id]": "31926529",
    "leads[add][0][custom_fields][0][name]": "Some text field",
    "leads[add][0][modified_user_id]": "102525",
    "leads[add][0][price]": "24234",
    "leads[add][0][pipeline_id]": "2116",
    "leads[add][0][date_create]": "1456824464"
  },
  "trigger_fields": {},
  "request": {
    "content": "leads%5Badd%5D%5B0%5D%5Bid%5D=31926529&leads%5Badd%5D%5B0%5D%5Bname%5D=qaz&leads%5Badd%5D%5B0%5D%5Bstatus_id%5D=10216993&leads%5Badd%5D%5B0%5D%5Bprice%5D=24234&leads%5Badd%5D%5B0%5D%5Bresponsible_user_id%5D=102525&leads%5Badd%5D%5B0%5D%5Blast_modified%5D=1456824464&leads%5Badd%5D%5B0%5D%5Bmodified_user_id%5D=102525&leads%5Badd%5D%5B0%5D%5Bcreated_user_id%5D=102525&leads%5Badd%5D%5B0%5D%5Bdate_create%5D=1456824464&leads%5Badd%5D%5B0%5D%5Bpipeline_id%5D=2116&leads%5Badd%5D%5B0%5D%5Baccount_id%5D=10216991&leads%5Badd%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bid%5D=1119321&leads%5Badd%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bname%5D=Some+text+field&leads%5Badd%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bvalues%5D%5B0%5D%5Bvalue%5D=asdfdsf&account%5Bsubdomain%5D=test000002",
    "headers": {
      "Http-Host": "zapier.com",
      "Http-User-Agent": "amoCRM-WebHook-client/1.0",
      "Http-Connection": "close",
      "Http-X-Forwarded-Proto": "https",
      "Content-Length": "765",
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

result = Zap.add_lead_catch_hook(bundle);
if (!result) {
  console.error('Add lead test failed');
} else {
  console.info('Add lead test success');
}