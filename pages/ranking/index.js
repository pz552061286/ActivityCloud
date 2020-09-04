// pages/ranking/index.js
var app = getApp()
var $htpp = require("../../utils/http").http
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    bushu: 20000,
    guiding: 60000,
    bgImg: 'data:image/jpeg;base64,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',
    weekRankList: [],
    monthRankList: [],
  },
  //周排行

  getWeekRanking() {
    $htpp('/Ranking/thisWeekRanking', {
      openId: wx.getStorageSync('openId')
    }, res => {
      if (res.code == 200) {
        this.setData({
          weekRankList: res.data
        })
      }
    })
  },

  //月排行

  getMonthRanking() {
    $htpp('/Ranking/thisMonthRanking ', {
      openId: wx.getStorageSync('openId')
    }, res => {
      if (res.code == 200) {
        this.setData({
          monthRankList: res.data
        })
      }
    })
  },




  tabSelect(e) {
    clearInterval(this.countTimer);
    this.setData({
      count: 0
    })
    this.countInterval('canvasProgress')
    var currentIndex = e.currentTarget.dataset.index
    this.setData({
      currentIndex,
      bushu: currentIndex == 1 ? 52474 : 20000
    })
  },






  drawProgressbg: function (canvasId) {
    const arcRadius = (68 / 375) * this.data.windowWidth //半径
    console.log(arcRadius,'arcRadius');
    
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext(canvasId, this)
    ctx.setLineWidth(6); // 设置圆环的宽度
    ctx.setStrokeStyle('#de3333'); // 设置圆环的颜色
    ctx.setLineCap('round'); // 设置圆环端点的形状
    ctx.beginPath(); // 开始一个新的路径
    ctx.arc(arcRadius, arcRadius, arcRadius - 6, 0, 2 * Math.PI, false);
    // 设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); // 对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step, canvasId) {
    const arcRadius = (68 / 375) * this.data.windowWidth //半径

    var context = wx.createCanvasContext(canvasId, this);
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#ffd200");
    gradient.addColorStop("1", "#ffd200");
    // gradient.addColorStop("0.6", "black");
    context.setLineWidth(8);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(arcRadius, arcRadius, arcRadius - 6, -Math.PI * 0.5, -Math.PI / 2 + step * Math.PI);
    context.stroke();
    context.draw();
  },
  countInterval: function (canvasId) {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {

      if (this.data.count <= this.data.bushu) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(this.data.count / this.data.guiding * 2, canvasId)
        this.data.count += 1000;
      } else {
        clearInterval(this.countTimer);
        //规定1000步  走了500步
        // 500 / 1000 = 0.5   1000 /1000=1
        // 用走的步数 除以 规定步数 *2



      }
    }, 80)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowWidth: app.Data.windowWidth
    })
    this.getWeekRanking()
    this.getMonthRanking()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.drawProgressbg();
    // this.drawCircle(2) 
    this.drawProgressbg('canvasProgressbg');
    this.countInterval('canvasProgress')
    // this.drawCircle(1.5, 'canvasProgress');
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