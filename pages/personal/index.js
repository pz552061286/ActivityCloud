//logs.js
var app = getApp()
Page({
  data: {
    loginModel: false,
    userInfo: {}
  },
  move() {},
  // onGetUserInfo(e) {
  //   console.log(e, '=====e');
  //   if (e.detail.userInfo) {
  //     wx.showToast({
  //       title: '获取成功',
  //       icon: 'none',
  //       mask: true,
  //     })
  //     this.setData({
  //       loginModel: false
  //     })
  //     app.Data.userInfo = e.detail.userInfo
  //   } else {
  //     wx.showToast({
  //       title: '获取失败',
  //       icon: 'none',
  //       mask: true,
  //     })
  //   }

  // },
  onLoad: function () {
    this.setData({
      userInfo: app.Data.userInfo
    })
  },
  onShow() {
    // console.log(app.Data.userInfo, '---userinfo');
    // this.setData({
    //   loginModel: app.Data.userInfo ? false : true
    // })
  },
})