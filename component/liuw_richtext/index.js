// components/richtext/index.js
const wxParse = require('../../assets/plugins/wxParse/wxParse.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rich_content: {
      type: String,
      value: '',
      observer: 'init'
    },
    host: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _content: '',
    _host: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {

    init() {
      this.setData({
        _content: this.data.rich_content,
        _host: this.data.host
      }, () => {
        this.richTextHanle();
      });
    },

    richTextHanle() {
      let article = this.data._content;
      // 资源替换
      article = this.articleHandle(article);
      // 解析渲染
      wxParse.wxParse('article', 'html', article, this, 5);
    },

    // 正则处理资源路径
    articleHandle(path) {
      let path_new = path.replace(/src=[\"| \'](.*?)[\"|\']/g, (a, b, c, d) => {
        let str, src_host = this.data._host;
        if (b.indexOf('http') > -1) {
          str = a;
        } else {
          str = a.replace(b, src_host + b);
        }
        return str;
      });
      // console.log('path_new=> ', path_new);
      return path_new;
    }
  }
})
