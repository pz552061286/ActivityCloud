//logs.js
var app = getApp()
var $http = require('../../utils/http').http
Page({
  data: {
    loginModel: false,
    userInfo: {},
    list: []
  },
  move() {},
  toDetail(e) {
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../healthLine/index?code=' + code,
    })
  },
  getList() {
    $http('/ActivityArchives/joinRecord', {
      openId: wx.getStorageSync('openId')
    }, res => {
      if (res.code == 200) {
        this.setData({
          list: res.data
        })
      }
    }, 'get')
  },


  onLoad: function () {
    this.getList()
    this.setData({
      userInfo: app.Data.userInfo
    })
  },
  onShow() {

  },
})