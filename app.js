//app.js
import {
  sendRunData
} from './utils/sendRun'
var $http = require('./utils/http').http
var _this;
App({
  onLaunch: function () {
    _this = this
    wx.getSystemInfo({
      success: res => {
        this.Data.StatusBar = res.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.Data.Custom = capsule;
          this.Data.CustomBar = capsule.bottom - capsule.top / 2 + 2;

        } else {
          this.Data.CustomBar = res.statusBarHeight + 50;
        }

        this.Data.statusBarHeight = res.statusBarHeight - 2
      }
    })


    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.getWeRunData({
        //   success(res) {
        //     console.log(res, 'res');
        //     // 拿 encryptedData 到开发者后台解密开放数据
        //     const encryptedData = res.encryptedData
        //     // 或拿 cloudID 通过云调用直接获取开放数据
        //     const cloudID = res.cloudID
        //   }
        // })
      }
    })
    // 获取用户信息

    // wx.getSetting({
    //   success: res => {
    //     console.log(res, 'getsetting');
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.Data.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

  },
  Data: {
    userInfo: null,
    statusBarHeight: 0,
    baseUrl: '',
  },

  getOpenId: (code) => {
    $http('/user/getOpenId', {
      code,
    }, res => {
      if (res.code == 200) {
        res.data = JSON.parse(res.data)
        wx.setStorageSync('openId', res.data.openid);
      }
    })
  },


  onShow() {

    if (!wx.getStorageSync('openId')) {
      wx.login({
        success: res => {
          if (res.code) {
            this.getOpenId(res.code)
          }
        }
      })
    }

    if (this.Data.userInfo) {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.werun']) {
            wx.showModal({
              title: '温馨提示',
              content: "请进入设置开启微信步数权限",
              showCancel: false,
              success: res => {
                wx.openSetting()
              }
            })
          } else {
            wx.getWeRunData({
              success: (result) => {
                const encryptedData = result.encryptedData
                const iv = result.iv
                wx.login({
                  success: res => {
                    if (res.code) {
                      $http('/user/getOpenId', { //通过code拿取session_key
                        code: res.code
                      }, res => {
                        if (res.code == 200) {
                          res.data = JSON.parse(res.data)
                          var session_key = res.data.session_key
                          wx.setStorageSync('openId', res.data.openid);
                          sendRunData(encryptedData, iv, session_key).then(res => {
                          })
                        }
                      }, 'get')
                    }
                  }
                })
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
          }
        }
      })
    }
  },
  sendRunData,
})