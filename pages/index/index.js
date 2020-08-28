//index.js
//获取应用实例
const app = getApp()
var _this;

Page({
  data: {
    currentIndex: 0,
    scrollLeft: 0,
    titleBarHeight: 0,
    topNum: 0
  },
  tabSelect(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log(this.data.currentIndex);

  },
  toPersonal() {
    wx.navigateTo({
      url: '../login/index',
    })
  },

  onLoad: function () {
    _this = this
    this.setData({
      topNum: app.Data.statusBarHeight
    })
  },

})