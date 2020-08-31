//index.js
//获取应用实例
var $http = require('../../utils/http').http
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
        console.log(res, '页面列表');
        this.setData({
          pageData: res.data
        })
      }
    })
  },
  move(e) {},
  onGetUserInfo(e) {
    console.log(e, '=====e');
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
      wx.getWeRunData({
        success: (result) => {},
      })
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
      openId: 1,
    }, res => {
      console.log(res);

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
        console.log(res, 'getsetting');
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
    if (!app.Data.userInfo) {

    }
  },
})