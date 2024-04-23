import { CookieKeysEnum, Login_Status } from "~utils/enum"
import { RequestFetch } from "~utils/request"

let SRE_COOKIE = {
  status: Login_Status[1],
  value: ""
}
let PAAS_COOKIE = { status: Login_Status[1], value: "" }

let MOCK_COOKIE = { status: Login_Status[1], value: "" }

const SET_SRE_COOKIE_VAL = (callback?) => {
  chrome.cookies.getAll(
    {
      domain: CookieKeysEnum.SRE.qa_domain,
      name: CookieKeysEnum.SRE.key
    },
    function (cookie) {
      if (
        Array.isArray(cookie) &&
        cookie.length > 0 &&
        cookie.some((item) => item.domain === CookieKeysEnum.SRE.qa_domain)
      ) {
        const cookieVal = cookie.find(
          (item) => item.domain === CookieKeysEnum.SRE.qa_domain
        )
        SRE_COOKIE.status = Login_Status[1]
        SRE_COOKIE.value = cookieVal.value
      } else {
        SRE_COOKIE.status = Login_Status[0]
        SRE_COOKIE.value = ""
      }
      callback && callback()
    }
  )
}

const SET_PAAS_COOKIE_VAL = (callback?) => {
  chrome.cookies.getAll(
    {
      domain: CookieKeysEnum.PAAS.qa_domain,
      name: CookieKeysEnum.PAAS.key
    },
    function (cookie) {
      if (
        Array.isArray(cookie) &&
        cookie.length > 0 &&
        cookie.some((item) => item.domain === CookieKeysEnum.PAAS.qa_domain)
      ) {
        const cookieVal = cookie.find(
          (item) => item.domain === CookieKeysEnum.PAAS.qa_domain
        )
        PAAS_COOKIE.status = Login_Status[1]
        PAAS_COOKIE.value = cookieVal.value
      } else {
        PAAS_COOKIE.status = Login_Status[0]
        PAAS_COOKIE.value = ""
      }
      callback && callback()
    }
  )
}

const SET_MOCK_COOKIE_VAL = (callback?) => {
  chrome.cookies.getAll(
    {
      domain: CookieKeysEnum.MOCK.qa_domain,
      name: CookieKeysEnum.MOCK.key
    },
    function (cookie) {
      console.log("cookie1 :>> ", cookie)
      if (
        Array.isArray(cookie) &&
        cookie.length > 0 &&
        cookie.some((item) => item.domain === CookieKeysEnum.MOCK.qa_domain)
      ) {
        const cookieVal = cookie.find(
          (item) => item.domain === CookieKeysEnum.MOCK.qa_domain
        )
        MOCK_COOKIE.status = Login_Status[1]
        MOCK_COOKIE.value = cookieVal.value
      } else {
        MOCK_COOKIE.status = Login_Status[0]
        MOCK_COOKIE.value = ""
      }
      callback && callback()
    }
  )
}

SET_SRE_COOKIE_VAL()
SET_PAAS_COOKIE_VAL()
SET_MOCK_COOKIE_VAL()

chrome.runtime.onMessage.addListener(
  ({ action, payload }, sender, sendResponse) => {
    switch (action) {
      case "SRE_GET_COOKIE":
        GET_SRE_COOKIE().then(sendResponse)
        break
      case "PAAS_GET_COOKIE":
        GET_PAAS_COOKIE().then(sendResponse)
        break
      case "MOCK_GET_COOKIE":
        GET_MOCK_COOKIE().then(sendResponse)
        break
      case "RES_SET_COOKIE":
        SET_SRE_COOKIE(payload).then(sendResponse).catch(sendResponse)
        break
      case "PAAS_SET_COOKIE":
        SET_PAAS_COOKIE(payload).then(sendResponse).catch(sendResponse)
        break
      case "MOCK_SET_COOKIE":
        SET_MOCK_COOKIE(payload).then(sendResponse).catch(sendResponse)
        break
      default:
        break
    }
    return true
  }
)

function GET_SRE_COOKIE() {
  return new Promise((resolve) => {
    SET_SRE_COOKIE_VAL(() => {
      resolve({ SRE_COOKIE })
    })
  })
}

function GET_PAAS_COOKIE() {
  return new Promise((resolve) => {
    SET_PAAS_COOKIE_VAL(() => {
      resolve({ PAAS_COOKIE })
    })
  })
}

function GET_MOCK_COOKIE() {
  return new Promise((resolve) => {
    SET_MOCK_COOKIE_VAL(() => {
      resolve({ MOCK_COOKIE })
    })
  })
}

function SET_SRE_COOKIE(msg) {
  return new Promise((resolve, reject) => {
    chrome.cookies.set(
      {
        url: CookieKeysEnum.SRE.local_url,
        name: CookieKeysEnum.SRE.key,
        value: msg
      },
      async () => {
        try {
          const res = await RequestFetch(CookieKeysEnum.SRE.test_api_url)
          if (!res.code || res.code !== "0000") {
            throw new Error("error")
          }
          resolve({ type: "success" })
        } catch (error) {
          reject({ type: "error" })
        }
      }
    )
  })
}

function SET_PAAS_COOKIE(msg) {
  return new Promise((resolve, reject) => {
    chrome.cookies.set(
      {
        url: CookieKeysEnum.PAAS.local_url,
        name: CookieKeysEnum.PAAS.key,
        value: msg
      },
      async () => {
        try {
          const res = await RequestFetch(CookieKeysEnum.PAAS.test_api_url)
          if (!res.code || res.code !== "0000") {
            throw new Error("error")
          }
          resolve({ type: "success" })
        } catch (error) {
          reject({ type: "error" })
        }
      }
    )
  })
}

function SET_MOCK_COOKIE(msg) {
  return new Promise((resolve, reject) => {
    chrome.cookies.set(
      {
        url: CookieKeysEnum.MOCK.local_url,
        name: CookieKeysEnum.MOCK.key,
        value: msg
      },
      async () => {
        try {
          const res = await RequestFetch(
            CookieKeysEnum.MOCK.test_api_url,
            "POST",
            {
              treeType: 2,
              parentId: null,
              collectorFlag: false
            }
          )
          if (!res.code || res.code !== "0000") {
            throw new Error("error")
          }
          resolve({ type: "success" })
        } catch (error) {
          reject({ type: "error" })
        }
      }
    )
  })
}
