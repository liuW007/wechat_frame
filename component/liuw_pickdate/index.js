// components/liuw_pickdate/index.js
// 获取时间
function getDate() {
  const date = new Date()
  const years = []
  const months = []
  const days = []
  for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i)
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }
  return {
    years,
    months,
    days
  }
}
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    date_modal: {
      type: Boolean,
      value: false
    },
    cancel_color: {
      type: String,
      value: '#999'
    },
    sure_color: {
      type: String,
      value: 'red'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    begindate: {
      date: {},
      pick_value: [],
      display: ''
    },
    ...getDate(),
    choice_over: true, // 是否转动完毕
  },
  attached: function() {
    this.initStartTime();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 初始化开始日期
     * 如果有结束日期和此设置相似，只是begindate换成enddate
     */
    initStartTime() {
      let begindate = this.timeInit();
      // console.log(2222, begindate)
      // begindate.display = this.dateDisplay(begindate.date);
      this.setData({
        begindate
      });
    },

    // 初始化日期
    timeInit() {
      const date_obj = new Date()
      let start_year = date_obj.getFullYear();
      let start_month = date_obj.getMonth();
      let start_date = date_obj.getDate();
      let pick_value = [9999, start_month, start_date - 1];
      let date = {
        year: start_year,
        month: start_month + 1,
        date: start_date
      };
      // console.log(1111, date, pick_value);
      return {
        date,
        pick_value
      };
    },
    // 日期展示处理
    dateDisplay(date_obj) {
      let {
        year,
        month,
        date
      } = date_obj;
      month = month < 10 ? '0' + month : month;
      date = date < 10 ? '0' + date : date;
      return year + '-' + month + '-' + date;
    },
    /**
     * 改变日期
     */
    bindChangeBegin(e) {
      let year = this.data.years[e.detail.value[0]];
      // console.log(year);
      this.setData({
        'begindate.pick_value': e.detail.value
      })
    },

    /**
     * 滚动开始时触发
     */
    bindPickstart () {
      this.setData({
        choice_over: false
      })
    },

    /**
     * 滚动结束时触发
     * 根据选择的年、月判断有多少天
     */
    bindPickend: function() {
      let pick_value = this.data.begindate.pick_value;
      let days = [];
      let year = this.data.years[pick_value[0]];
      let month = this.data.months[pick_value[1]];
      // console.log(year, month);
      if (month != 2) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          for (let i = 1; i <= 31; i++) {
            days.push(i);
          }
        } else {
          for (let i = 1; i <= 30; i++) {
            days.push(i);
          }
        }
      } else {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
          for (let i = 1; i <= 29; i++) {
            days.push(i);
          }
        } else {
          for (let i = 1; i <= 28; i++) {
            days.push(i);
          }
        } 
      }
      this.setData({
        days,
        choice_over: true
      })
    },
    /**
     * 取消选择
     */
    bindCancel () {
      this.setData({
        date_modal: false
      })
    },
    /**
     * 选择
     */
    bindSure() {
      if (!this.data.choice_over) return;
      let pick_value = this.data.begindate.pick_value;
      let year = this.data.years[pick_value[0]];
      if (year === undefined) {
        year = new Date().getFullYear();
      }
      let month = this.data.months[pick_value[1]] < 10 ? ('0' + this.data.months[pick_value[1]]) : this.data.months[pick_value[1]];
      let day = this.data.days[pick_value[2]] < 10 ? ('0' + this.data.days[pick_value[2]]) : this.data.days[pick_value[2]];
      let date = year + '-' + month + '-' + day;
      this.setData({
        date_modal: false
      },function(){
        this.triggerEvent('changedate', { date: date });
      })
    },
  }
})