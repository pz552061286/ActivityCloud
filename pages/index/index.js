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

  onLoad: function () {
    _this = this
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          topNum: res.statusBarHeight - 2
        })
      }
    })
  },

})