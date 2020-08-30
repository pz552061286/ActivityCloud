// pages/ranking/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    bushu: 20000,
    guiding: 60000
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
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext(canvasId, this)
    ctx.setLineWidth(6); // 设置圆环的宽度
    ctx.setStrokeStyle('#de3333'); // 设置圆环的颜色
    ctx.setLineCap('round'); // 设置圆环端点的形状
    ctx.beginPath(); // 开始一个新的路径
    ctx.arc(68, 68, 62, 0, 2 * Math.PI, false);
    // 设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); // 对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step, canvasId) {
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
    context.arc(68, 68, 62, -Math.PI * 0.5, -Math.PI / 2 + step * Math.PI);
    context.stroke();
    context.draw();
  },
  countInterval: function (canvasId) {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      console.log('运行中');

      if (this.data.count <= this.data.bushu) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(this.data.count / this.data.guiding * 2, canvasId)
        this.data.count += 1000;
      } else {
        clearInterval(this.countTimer);
        console.log('结束');
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