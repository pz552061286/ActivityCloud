//index.js
//获取应用实例
var $http = require('../../utils/http').http
// import {
//   sendRunData
// } from '../../utils/sendRun'
const app = getApp()
var _this;

Page({
  data: {
    pageData: [],
    currentIndex: 0,
    scrollLeft: 0,
    titleBarHeight: 0,
    topNum: 0,
    loginModel: false
  },
  getList() {
    $http('/ActivityArchives/list', {}, res => {
      if (res.code == 200) {
        this.setData({
          pageData: res.data
        })
      }
    })
  },
  move(e) {},
  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      wx.showToast({
        title: '登录成功',
        icon: 'none',
        mask: true,
      })
      this.setData({
        loginModel: false
      })
      wx.showTabBar({
        animation: false,
      })
      app.Data.userInfo = e.detail.userInfo
      this.autoLogin()

    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        mask: true,
      })
    }

  },
  tabSelect(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  toPersonal() {
    wx.navigateTo({
      url: '../login/index',
    })
  },
  tohealthy() {
    wx.navigateTo({
      url: '../healthLine/index',
    })
  },
  autoLogin() {
    $http('/user/autoLogin', {
      openId: wx.getStorageSync('openId'),
    }, res => {
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
                    app.sendRunData(encryptedData, iv, session_key).then(res => {
                    })
                  }
                })
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
    })
  },

  onLoad: function () {
    this.getList()
    _this = this
    this.setData({
      topNum: app.Data.statusBarHeight
    })
    wx.showLoading({
      title: '加载中'
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.hideLoading()
              // 可以将 res 发送给后台解码出 unionId
              app.Data.userInfo = res.userInfo
              this.setData({
                loginModel: false
              })
              this.autoLogin()
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.hideLoading()
          wx.hideTabBar({
            animation: false,
          })
          this.setData({
            loginModel: true
          })

        }
      }
    })
  },
  onShow() {
    if (app.Data.userInfo) {
      // this.autoLogin()
    }
  },
})