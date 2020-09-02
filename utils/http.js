var baseUrl = "http://121.196.34.123:11017"

function http(url, data, cb, method = 'post') {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: baseUrl + url,
    method,
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: res => {
      wx.hideLoading()
      if (res.data.code != 200 && res.data.code != 1) {
        if (url == "/user/autoLogin") { //如果没有注册直接跳转注册界面
          wx.reLaunch({
            url: '/pages/login/index',
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg || '请求出错',
            showCancel: false
          })
        }


      }
      return typeof cb == "function" && cb(res.data)
    },
    fail: res => {
      wx.hideLoading()
      wx.showModal({
        title: '温馨提示',
        content: res.data.msg || '网络错误，请稍后重试',
        showCancel: false,
      })
      return typeof cb == "function" && cb(res.data)
    }
  })

}


module.exports = {
  http
}