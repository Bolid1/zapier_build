bundle = {
  "cleaned_request": {
    "leads[update][0][custom_fields][0][id]": "1119321",
    "leads[update][0][status_id]": "10216994",
    "leads[update][0][price]": "1000",
    "querystring": {},
    "leads[update][0][created_user_id]": "102525",
    "leads[update][0][date_create]": "1456808154",
    "account[subdomain]": "test000002",
    "leads[update][0][custom_fields][0][values][0][value]": "some text",
    "leads[update][0][last_modified]": "1456820780",
    "leads[update][0][name]": "Some test lead",
    "leads[update][0][account_id]": "10216991",
    "leads[update][0][responsible_user_id]": "938348",
    "leads[update][0][custom_fields][0][name]": "Some text field",
    "leads[update][0][id]": "31926520",
    "leads[update][0][pipeline_id]": "2116",
    "leads[update][0][modified_user_id]": "102525"
  },
  "zap": {},
  "request": {
    "content": "leads%5Bupdate%5D%5B0%5D%5Bid%5D=31926520&leads%5Bupdate%5D%5B0%5D%5Bname%5D=Some+test+lead&leads%5Bupdate%5D%5B0%5D%5Bstatus_id%5D=10216994&leads%5Bupdate%5D%5B0%5D%5Bprice%5D=1000&leads%5Bupdate%5D%5B0%5D%5Bresponsible_user_id%5D=938348&leads%5Bupdate%5D%5B0%5D%5Blast_modified%5D=1456820780&leads%5Bupdate%5D%5B0%5D%5Bmodified_user_id%5D=102525&leads%5Bupdate%5D%5B0%5D%5Bcreated_user_id%5D=102525&leads%5Bupdate%5D%5B0%5D%5Bdate_create%5D=1456808154&leads%5Bupdate%5D%5B0%5D%5Bpipeline_id%5D=2116&leads%5Bupdate%5D%5B0%5D%5Baccount_id%5D=10216991&leads%5Bupdate%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bid%5D=1119321&leads%5Bupdate%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bname%5D=Some+text+field&leads%5Bupdate%5D%5B0%5D%5Bcustom_fields%5D%5B0%5D%5Bvalues%5D%5B0%5D%5Bvalue%5D=some+text&account%5Bsubdomain%5D=test000002",
    "headers": {
      "Http-Host": "zapier.com",
      "Http-User-Agent": "amoCRM-WebHook-client/1.0",
      "Http-Connection": "close",
      "Http-X-Forwarded-Proto": "https",
      "Content-Length": "819",
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

result = Zap.update_lead_catch_hook(bundle);
if (!result) {
  console.error('Update lead test failed');
} else {
  console.info('Update lead test success');
}