bundle = {
  "cleaned_request": {
    "leads[responsible][0][custom_fields][0][name]": "Some text field",
    "leads[responsible][0][name]": "Some test lead",
    "leads[responsible][0][date_create]": "1456808154",
    "leads[responsible][0][old_responsible_user_id]": "102525",
    "leads[responsible][0][id]": "31926520",
    "querystring": {},
    "leads[responsible][0][pipeline_id]": "2116",
    "leads[responsible][0][last_modified]": "1456822527",
    "account[subdomain]": "test000002",
    "leads[responsible][0][custom_fields][0][values][0][value]": "some text",
    "leads[responsible][0][responsible_user_id]": "938348",
    "leads[responsible][0][created_user_id]": "102525",
    "leads[responsible][0][modified_user_id]": "102525",
    "leads[responsible][0][price]": "10000",
    "leads[responsible][0][status_id]": "10216994",
    "leads[responsible][0][custom_fields][0][id]": "1119321",
    "leads[responsible][0][account_id]": "10216991"
  },
  "zap": {},
  "request": {
    "content": "leads%5Bresponsible%5D%5B0%5D%5Bid%5D=31926520&leads%5Bresponsible%5D%5B0%5D%5Bname%5D=Some+test+lead&leads%5Bresponsible%5D%5B0%5D%5Bstatus_id%5D=10216994&leads%5Bresponsible%5D%5B0%5D%5Bprice%5D=10000&leads%5Bresponsible%5D%5B0%5D%5Bresponsible_user_id%5D=938348&leads%5Bresponsible%5D%5B0%5D%5Blast_modified%5D=1456822527&leads%5Bresponsible%5D%5B0%5D%5Bmodified_user_id%5D=102525&leads%5Bresponsible%5D%5B0%5D%5Bcreated_user_id%5D=102525&leads%5Bresponsible%5D%5B0%5D%5Bdate_create%5D=1456808154&leads%5Bresponsible%5D%5B0%5D%5Bpipeline_id%5D=2116&leads%5Bresponsible%5D%5B0%5D%5Baccount_id%5D=10216991&leads%5Bresponsible%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bid%5D=1119321&leads%5Bresponsible%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bname%5D=Some+text+field&leads%5Bresponsible%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bvalues%5D%5B0%5D%5Bvalue%5D=some+text&leads%5Bresponsible%5D%5B0%5D%5Bold_responsible_user_id%5D=102525&account%5Bsubdomain%5D=test000002",
    "headers": {
      "Http-Host": "zapier.com",
      "Http-User-Agent": "amoCRM-WebHook-client/1.0",
      "Http-Connection": "close",
      "Http-X-Forwarded-Proto": "https",
      "Content-Length": "956",
      "Http-Accept": "*/*",
      "Http-X-Forwarded-Port": "443",
      "Content-Type": "application/x-www-form-urlencoded",
      "Http-X-Forwarded-For": "80.250.213.62, 10.0.17.41"
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

result = Zap.responsible_lead_catch_hook(bundle);
if (!result) {
  console.error('Responsible lead test failed');
} else {
  console.info('Responsible lead test success');
}