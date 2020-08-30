// pages/login/login.js
var app = getApp()
var $http = require('../../utils/http').http
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 0,
    picker: ['洪星帮', '东兴帮', '斧头帮'],
    pickerIndex: null,
    yzmtext: '获取验证码',
    yzmFlag: true,
    name: null,
    tel: null,
    verificationCode: null,
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  telInput(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  yzmInput(e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },

  //注册
  register() {
    if (!this.data.tel || !this.data.name || !this.data.verificationCode) {
      wx.showToast({
        title: '请完整填入选项',
        icon: 'none',
        duration: 2000
      })
      return
    }
    $http('/user/register', {
      openId: 1,
      tel: this.data.tel,
      verificationCode: this.data.verificationCode,
      name: this.data.name,
      icon: app.Data.userInfo.avatarUrl,
    }, res => {
      if (res.code == 200) {
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })






  },
  //选择工会
  PickerChange(e) {
    this.setData({
      pickerIndex: e.detail.value
    })
  },
  //获取验证码
  getYzm() {
    if (!this.data.yzmFlag) {
      return
    }
    if (!this.data.tel) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    $http('/user/getVerificationCode', {
      tel: this.data.tel
    }, res => {
      if (res.code == 200) {
        wx.showToast({
          title: "获取成功",
          icon: 'success',
          duration: 2000
        })
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
      }
    })


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