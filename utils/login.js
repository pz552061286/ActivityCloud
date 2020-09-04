import sendRunData from './sendRun'
const login = () => {
  return new Promise((resolve) => {
    wx.login({
      success(res) {
        getApp().getOpenId(res.code).then(res => {
          wx.getWeRunData({
            success: (result) => {
              const encryptedData = result.encryptedData
              const iv = result.iv
              var session_key = res.data.session_key
              sendRunData(encryptedData, session_key, iv)
              resolve()
            },
            fail: res => {
              wx.showModal({
                title: '温馨提示',
                content: '获取微信步数失败，请进入设置开启微信步数权限',
                showCancel: false,
                success: res => {
                  wx.openSetting()
                }
              })
            }
          })
        })
      }
    })
  })
}

export default login