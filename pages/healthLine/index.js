// pages/healthLine/index.js
var app = getApp()
var $http = require('../../utils/http').http
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultModel: false,
    pageData: null, //页面数据
    titleText: '', //标题名称
    count: 0, // 设置 计数器 初始为0
    activityCode: '',
    countTimer: null // 设置 定时器 初始为null
  },

  //提交任务
  subMit() {
    $http("/ActivityTask/submit", {
      openId: wx.getStorageSync('openId'),
      activityCode: this.data.activityCode,
      num: 1000
    }, res => {
      if (res.code == 200) {
        this.getList()
        wx.showToast({
          title: 'res.msg',
          icon: "success",
          duration: 2000
        })
      }
    })
  },





  //获取页面数据
  getList(cb) {
    $http("/ActivityArchives/detail", {
      openId: wx.getStorageSync('openId'),
      activityCode: this.data.activityCode,
    }, res => {
      if (res.code == 200) {
        this.setData({
          pageData: res.data,
          titleText: res.data.activityName
        })
        return typeof cb == 'function' && cb(res.data)
      }
    })
  },





  drawProgressbg: function (canvasId) {
    const arcRadius = this.data.windowWidth * 0.048 //半径

    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext(canvasId, this)
    ctx.setLineWidth(3); // 设置圆环的宽度
    ctx.setStrokeStyle('#fad6d6'); // 设置圆环的颜色
    ctx.setLineCap('round'); // 设置圆环端点的形状
    ctx.beginPath(); // 开始一个新的路径
    ctx.arc(arcRadius, arcRadius, arcRadius - 3, 0, 2 * Math.PI, false);
    // 设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); // 对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step, canvasId) {
    const arcRadius = this.data.windowWidth * 0.048 //半径
    var context = wx.createCanvasContext(canvasId, this);
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#eb5b5b");
    gradient.addColorStop("1", "#eb5b5b");
    // gradient.addColorStop("0.6", "black");
    context.setLineWidth(3);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(arcRadius, arcRadius, arcRadius - 3, Math.PI * 0.5, Math.PI / 2 + step * Math.PI);
    context.stroke();
    context.draw();
  },
  //打开规则说明弹窗
  toResult() {
    this.setData({
      resultModel: true
    })
  },
  // 关闭规则说明弹窗
  hideResultModal() {
    this.setData({
      resultModel: false
    })
  },
  //跳转到获奖名单页面
  toWinner() {
    wx.navigateTo({
      url: '../winnerList/index',
    })
  },
  //跳转排名情况
  toRank() {
    wx.navigateTo({
      url: '../ranking/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let val = options.open
    this.setData({
      resultModel: Boolean(Number(val)),
      activityCode: options.code,
      windowWidth: app.Data.windowWidth
    })

    this.getList(res => {
      var list = res.stepNumsDatas
      list.forEach((item, index) => {
        this.drawProgressbg('canvasProgressbg' + index);
        this.drawCircle(item.currentNum / item.num * 2, 'canvasProgress' + index);
      })
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