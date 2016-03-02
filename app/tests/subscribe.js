bundle = {
  "target_url": "https://zapier.com/hooks/standard/e45b35c8c7594df6a600394f8894a0b1/",
  "auth_fields": {
    "login": "v.vargin@team.amocrm.com",
    "api_key": "0c0e8f9dedfd8d24c606bbac63827274",
    "account": "test000002"
  },
  "subscription_url": "https://zapier.com/hooks/standard/e45b35c8c7594df6a600394f8894a0b1/",
  "request": {
    "files": null,
    "url": "http://test000002.main2.amocrm2.saas.v.qsoft.ru/private/api/v2/json/webhooks/subscribe/?USER_LOGIN=v.vargin@team.amocrm.com&USER_HASH=0c0e8f9dedfd8d24c606bbac63827274",
    "headers": {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json"
    },
    "params": {
      "USER_LOGIN": "v.vargin@team.amocrm.com",
      "USER_HASH": "0c0e8f9dedfd8d24c606bbac63827274"
    },
    "data": "{\"subscription_url\": \"https://zapier.com/hooks/standard/e45b35c8c7594df6a600394f8894a0b1/\", \"target_url\": \"https://zapier.com/hooks/standard/e45b35c8c7594df6a600394f8894a0b1/\", \"event\": \"status_lead\"}",
    "method": "POST"
  },
  "trigger_fields": {},
  "event": "status_lead",
  "zap": {},
  "trigger_data": {}
};

result = Zap.pre_subscribe(bundle);
if (!result) {
  console.error('Pre subscribe test failed');
} else {
  console.info('Pre subscribe test success');
}