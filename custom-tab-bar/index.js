// custom-tab-bar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#333333",
    selectedColor: "#EF4511",
    list: [
      {
        "pagePath": "/pages/tabs/index/index",
        "text": "index",
        "iconPath": "/assets/imgs/tabs/home.png",
        "selectedIconPath": "/assets/imgs/tabs/homeact.png"
      },
      {
        "pagePath": "/pages/tabs/index1/index1",
        "text": "index1",
        "iconPath": "/assets/imgs/tabs/category.png",
        "selectedIconPath": "/assets/imgs/tabs/categoryact.png"
      },
      {
        "pagePath": "/pages/tabs/index2/index2",
        "text": "index2",
        "iconPath": "/assets/imgs/tabs/surprise.png",
        "selectedIconPath": "/assets/imgs/tabs/surpriseact.png"
      },
    ],
    tab_num: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index
      })
    },
    addNum () {
      this.setData({
        tab_num: app.globalData.tab_num
      })
    },
  }
})
