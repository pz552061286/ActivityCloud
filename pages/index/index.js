//index.js
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
    loginModel: false,
    ownList: []
  },
  getList() {
    $http('/ActivityArchives/list', {
      openId: wx.getStorageSync('openId')
    }, res => {
      if (res.code == 200) {
        var pageData = []
        res.data.forEach(item => {
          item.labourUnionsSTR = item.labourUnions.join(' - ')
        })
        for (let index = 0; index < 10; index++) {
          pageData.push(res.data[0])
        }
        this.setData({
          pageData
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
      this.getList()

      this.autoLogin()

    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        mask: true,
      })
    }

  },
  tableSelect(e) {
    if (e.detail == 1) {
      this.getOwnList()
    }
    this.setData({
      currentIndex: e.detail,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //与我相关
  getOwnList() {
    $http('/ActivityArchives/relevantList', {
      openId: wx.getStorageSync('openId')
    }, res => {
      if (res.code == 200) {
        res.data.forEach(item => {
          item.labourUnionsSTR = item.labourUnions.join(" - ")
        })
        this.setData({
          ownList: res.data
        })
      }
    })
  },

  joinActivity(e) {
    wx.showModal({
      title: "温馨提示",
      content: "是否确认立即参与该活动？",
      success: res => {
        if (res.confirm) {
          var activityCode = e.currentTarget.dataset.data
          $http("/ActivityArchives/join", {
            activityCode,
            openId: wx.getStorageSync('openId')
          }, res => {
            if (res.code == 200) {
              this.getList()
              wx.showToast({
                title: res.msg,
                icon: "success",
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
  tohealthy(e) {
    console.log(this.data.currentIndex, 'cu');
    let val = e.currentTarget.dataset.val
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: `../healthLine/index?open=${val}&code=${code}`,
    })
  },
  autoLogin() {
    $http('/user/autoLogin', {
      openId: wx.getStorageSync('openId'),
    }, res => {
      app.login()
    })
  },

  onLoad: function () {
    if (wx.getStorageSync('openId')) {
      this.getList()
    }

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
  
  },
})