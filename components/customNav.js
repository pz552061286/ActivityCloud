const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    isMore: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    currentIndex: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.Data.StatusBar,
    CustomBar: app.Data.CustomBar,
    Custom: app.Data.Custom,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
    tableSelect(e) {
      this.setData({
        currentIndex: e.currentTarget.dataset.id
      })
      this.triggerEvent("myevent", e.currentTarget.dataset.id)
    },
  }
})