export const CookieKeysEnum = {
  SRE: {
    key: "__AUTHZ_SSO_TICKET__",
    qa_domain: ".tcshuke.com",
    local_url: "http://dev.flatjs.com",
    test_env_url: "https://alert.tcshuke.com/pages/main",
    test_api_url: "https://alert.tcshuke.com/workBench/list"
  },
  PAAS: {
    key: "orion_sso_token",
    qa_domain: ".qa.itcjf.com",
    local_url: "http://dev.flatjs.com",
    test_env_url: "https://ops.qa.itcjf.com/pages/main/workflow/center/apply",
    test_api_url: "https://ops.qa.itcjf.com/wf/v1/workflow/modeltype?subquery=y"
  },
  MOCK: {
    key: "orion_sso_token",
    qa_domain: ".stable.tcshuke.com",
    local_url: "http://dev.flatjs.com",
    test_env_url: "http://mockcloud.stable.tcshuke.com/pages/mock-http",
    test_api_url: "http://mockcloud.stable.tcshuke.com/api/tree/list"
  }
}

export const Login_Status = {
  0: "unLogin",
  1: "login"
}

export const OperationStatus = {
  0: "error",
  1: "success"
}
