// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 0,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
    pickerIndex: null,
    yzmtext: '获取验证码',
    yzmFlag: true
  },

  PickerChange(e) {
    this.setData({
      pickerIndex: e.detail.value
    })
  },
  getYzm() {
    if (!this.data.yzmFlag) {
      return
    }
    this.setData({
      yzmtext: '60 s',
      yzmFlag: false
    })
    var num = 60
    var timer = setInterval(() => {
      num--;
      this.setData({
        yzmtext: num + ' s'
      })
      if (num == 0) {
        clearInterval(timer)
        this.setData({
          yzmtext: '获取验证码',
          yzmFlag: true
        })
      }
    }, 1000)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      statusBarHeight: app.Data.statusBarHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})