// pages/tabs/index/index.js
const app = getApp();
const auth = require('../../../assets/plugins/utils/index.js').auth;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_imgs: [
      '/assets/imgs/home/imgs1.jpg',
      '/assets/imgs/home/imgs2.jpg',
      '/assets/imgs/home/imgs3.jpeg'
    ],  // 轮播图片
    rich_content: '<div><h1>this is a h1.</h1><i>this is an i.</i><p style="color: blue;">this is a p.</p></div>',  // 富文本内容
    tab_num: 0,  // tab数字
    date_modal: false,  // 日期弹框
    current_date: '',  // 返回的日期
    hasAuth: false, // 是否有权限
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasAuth: auth('obj').hasAuth()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
        tab_num: app.globalData.tab_num || 0
      })
    }
  },

  /**
   * 获取用户头像和昵称
   */
  bindGetName () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  /**
   * 减少tab上的数字
   */
  bindSubTabnum () {
    if (this.data.tab_num<1) return;
    app.globalData.tab_num = --this.data.tab_num;
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        tab_num: app.globalData.tab_num
      })
    }
  },

  /**
   * 增加tab上的数字
   */
  bindAddTabnum() {
    app.globalData.tab_num = ++this.data.tab_num;
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        tab_num: app.globalData.tab_num
      })
    }
  },

  /**
   * 日期的选择
   */
  bindChoiceDate () {
    this.setData({
      date_modal: true
    })
  },

  /**
   * 返回的日期值
   */
  changedate (e) {
    this.setData({
      current_date: e.detail.date
    })
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