//app.js
import sendRunData from './utils/sendRun'
import login from './utils/login'
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
          this.Data.CustomBar = capsule.bottom + capsule.top - res.statusBarHeight;
        } else {
          this.Data.CustomBar = res.statusBarHeight + 50;
        }
        this.Data.windowWidth = res.windowWidth

      }
    })

  },
  Data: {
    userInfo: null,
    statusBarHeight: 0,
    baseUrl: '',
  },

  getOpenId: (code) => {
    return new Promise((resolve, reject) => {
      $http('/user/getOpenId', {
        code,
      }, res => {
        if (res.code == 200) {
          res.data = JSON.parse(res.data)
          wx.setStorageSync('openId', res.data.openid);
          resolve(res)
        } else {
          reject(res)
        }
      })
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
            login()
          }
        }
      })
    }
  },
  sendRunData,
  login
})