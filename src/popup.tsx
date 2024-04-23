import { Button, Grid, Input, Message, Tabs } from "@arco-design/web-react"
import React, { useEffect, useState } from "react"

import "@arco-design/web-react/dist/css/arco.css"

import { sleep } from "~utils/common"
import { CookieKeysEnum, Login_Status, OperationStatus } from "~utils/enum"

import "~popup.css"

const TabPane = Tabs.TabPane
const Row = Grid.Row
const Col = Grid.Col

const Popup = () => {
  const [SRE_COOKIE, setSRE_COOKIE] = useState({
    status: Login_Status[1],
    value: ""
  })
  const [PAAS_COOKIE, setPAAS_COOKIE] = useState({
    status: Login_Status[1],
    value: ""
  })
  const [MOCK_COOKIE, setMOCK_COOKIE] = useState({
    status: Login_Status[1],
    value: ""
  })
  const handleGetSRECookie = () => {
    chrome.runtime.sendMessage({ action: "SRE_GET_COOKIE" }, (response) => {
      setSRE_COOKIE(response.SRE_COOKIE)
    })
  }

  const handleGetPAASCookie = () => {
    chrome.runtime.sendMessage({ action: "PAAS_GET_COOKIE" }, (response) => {
      setPAAS_COOKIE(response.PAAS_COOKIE)
    })
  }

  const handleGetMOCKCookie = () => {
    chrome.runtime.sendMessage({ action: "MOCK_GET_COOKIE" }, (response) => {
      setMOCK_COOKIE(response.MOCK_COOKIE)
    })
  }

  const handleWriteSREToLocal = () => {
    chrome.runtime.sendMessage(
      {
        action: "RES_SET_COOKIE",
        payload: SRE_COOKIE.value
      },
      (response) => {
        if (response.type === OperationStatus[1]) {
          Message.success({
            content: "写入成功",
            duration: 1000,
            style: { top: "-35px" }
          })
        } else {
          Message.error("写入失败请重新登录")
          sleep(800).then(() => {
            chrome.tabs.create({
              url: CookieKeysEnum.SRE.test_env_url
            })
          })
        }
      }
    )
  }

  const handleWritePAASToLocal = () => {
    chrome.runtime.sendMessage(
      {
        action: "PAAS_SET_COOKIE",
        payload: PAAS_COOKIE.value
      },
      (response) => {
        if (response.type === OperationStatus[1]) {
          Message.success({
            content: "写入成功",
            duration: 1000,
            style: { top: "-35px" }
          })
        } else {
          Message.error("写入失败请重新登录")
          sleep(800).then(() => {
            chrome.tabs.create({
              url: CookieKeysEnum.PAAS.test_env_url
            })
          })
        }
      }
    )
  }

  const handleWriteMOCKToLocal = () => {
    chrome.runtime.sendMessage(
      {
        action: "MOCK_SET_COOKIE",
        payload: MOCK_COOKIE.value
      },
      (response) => {
        if (response.type === OperationStatus[1]) {
          Message.success({
            content: "写入成功",
            duration: 1000,
            style: { top: "-35px" }
          })
        } else {
          Message.error("写入失败请重新登录")
          sleep(800).then(() => {
            chrome.tabs.create({
              url: CookieKeysEnum.MOCK.test_env_url
            })
          })
        }
      }
    )
  }

  useEffect(() => {
    if (SRE_COOKIE.status === Login_Status[0]) {
      Message.error("未找到cookie，请重新登录")
      sleep(800).then(() => {
        chrome.tabs.create({
          url: CookieKeysEnum.MOCK.test_env_url
        })
      })
    }
  }, [SRE_COOKIE])

  useEffect(() => {
    if (PAAS_COOKIE.status === Login_Status[0]) {
      Message.error("未找到cookie，请重新登录")
      sleep(800).then(() => {
        chrome.tabs.create({
          url: CookieKeysEnum.MOCK.test_env_url
        })
      })
    }
  }, [PAAS_COOKIE])

  useEffect(() => {
    if (MOCK_COOKIE.status === Login_Status[0]) {
      Message.error("未找到cookie，请重新登录")
      sleep(800).then(() => {
        chrome.tabs.create({
          url: CookieKeysEnum.MOCK.test_env_url
        })
      })
    }
  }, [MOCK_COOKIE])

  return (
    <div className="alexyu-w-80 alexyu-h-full alexyu-px-2.5 alexyu-pb-4">
      <h3 className="alexyu-text-base alexyu-text-center alexyu-py-2.5">
        获取SRE & PAAS & MOCK cookie
      </h3>
      <Tabs>
        <TabPane title="SRE" key="SRE">
          <div className="alexyu-leading-8 pb-5">
            <Button long type="primary" onClick={handleGetSRECookie}>
              Get SRE Cookie
            </Button>
            <div>
              <div>key：{CookieKeysEnum.SRE.key}</div>
              <Row>
                <Col span={4}>value：</Col>
                <Col span={14}>
                  <Input value={SRE_COOKIE.value} />
                </Col>
                <Col span={6}>
                  <Button
                    type="text"
                    style={{ padding: "0 10px" }}
                    disabled={!SRE_COOKIE.value}
                    onClick={handleWriteSREToLocal}>
                    写入本地
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </TabPane>
        <TabPane title="PAAS" key="PAAS">
          <div className="alexyu-leading-8 pb-5">
            <Button long type="primary" onClick={handleGetPAASCookie}>
              Get PAAS Cookie
            </Button>
            <div>
              <div>key：{CookieKeysEnum.PAAS.key}</div>
              <Row>
                <Col span={4}>value：</Col>
                <Col span={14}>
                  <Input value={PAAS_COOKIE.value} />
                </Col>
                <Col span={6}>
                  <Button
                    type="text"
                    style={{ padding: "0 10px" }}
                    disabled={!PAAS_COOKIE.value}
                    onClick={handleWritePAASToLocal}>
                    写入本地
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </TabPane>
        <TabPane title="MOCK" key="MOCK">
          <div className="alexyu-leading-8 pb-5">
            <Button type="primary" long onClick={handleGetMOCKCookie}>
              Get MOCK Cookie
            </Button>
            <div>
              <div>key：{CookieKeysEnum.MOCK.key}</div>
              <Row>
                <Col span={4}>value：</Col>
                <Col span={14}>
                  <Input value={MOCK_COOKIE.value} />
                </Col>
                <Col span={6}>
                  <Button
                    type="text"
                    style={{ padding: "0 10px" }}
                    disabled={!MOCK_COOKIE.value}
                    onClick={handleWriteMOCKToLocal}>
                    写入本地
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Popup
