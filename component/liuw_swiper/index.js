// components/liuw_swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgsUrls: {
      type: Array,
      value: []
    },
    show_index: {
      type: Boolean,
      value: false
    },
    autoplay: {
      type: Boolean,
      value: true
    },
    interval: {
      type: Number,
      value: 2000
    },
    circular: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current_index: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrent (e) {
      this.setData({
        current_index: e.detail.current+1
      })
    },
  }
})
