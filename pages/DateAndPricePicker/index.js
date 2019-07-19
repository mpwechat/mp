// pages/DetailsPage/index.js
const http = require('../../utils/http.js');

var Moment = require("../../utils/moment.js");
var DATE_YEAR = new Date().getFullYear();
var DATE_MONTH = new Date().getMonth() + 1;
var DATE_DAY = new Date().getDate();

Component({
  lifetimes: {
    attached: function() {
      console.log('组件aaa加载！', this.properties)

      let that = this
      //获取价钱列表先行转环时间戳
      // this.changeDate()
      // 在组件实例进入页面节点树时执行
      var _this = this;
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      // 页面初始化 options为页面跳转所带来的参数
      // this.createDateListData();

      this.setData({
        year: year,
        month: month
      })
      wx.getSystemInfo({
        success: function(res) {
          console.log(res,'system')
          _this.setData({
            systemInfo: res,
          });
        }
      })
    },

    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    optionsId: String,
    productDailyList: Array,
    type: String
  },
  ready: function() {
    this.setData({
      optionsId: this.properties.optionsId,
      type: this.properties.type
    })
    //获取价钱列表先行转环时间戳
    this.changeDate()
  },
  data: {
    // 这里是一些组件内部数据
    year: '',
    month: '',
    day: '',
    days: {},
    optionsId: '',
    id: '',
    productList: [],
    systemInfo: {},
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    checkDate: [],
    PriceCalendarList: [],
    chooseNumber: '1' //购买份数
  },
  methods: {
    //获取到的价格列表循环处理时间
    changeDate(year, month) {
      let that = this
      that.setData({
        optionsId: that.properties.optionsId,
        productList: that.properties.productDailyList
      })
      // that.data.PriceCalendarList = that.data.productList
      //   for (var i = 0; i < that.data.PriceCalendarList.length; i++) {
      //     that.data.PriceCalendarList[i].dailyDate = that.Conversiontime(parseInt(that.data.PriceCalendarList[i].dailyDate))
      //   }
      this.createDateListData(year, month)

    },
    // 不用每次装时间格式的方法
    onedate(year, month) {
      let that = this
      that.setData({
        optionsId: that.properties.optionsId,
        productList: that.properties.productDailyList,
        id: that.properties.productDailyList[0].productId
      })

      let newDateList = []
      that.data.PriceCalendarList = that.data.productList
      for (var i = 0; i < that.data.PriceCalendarList.length; i++) {
        that.data.PriceCalendarList[i].dailyDate = that.Conversiontime(parseInt(that.data.PriceCalendarList[i].dailyDate))
        newDateList.push(that.data.PriceCalendarList[i].dailyDate)
      }
      this.createDateListData(year, month)
    },
    // 时间戳转时间
    Conversiontime(timestamp) {
      let date = new Date(timestamp);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
      let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
      return Y + M + D + h + m + s;
    },
    // 这里是一个自定义方法
    /**创建日历数据 */
    createDateListData: function(setYear, setMonth) {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let dateArr = []; //需要遍历的日历数组数据
      let arrLen = 0; //dateArr的数组长度
      let now = setYear ? new Date(setYear, setMonth) : new Date();
      let year = setYear || now.getFullYear();
      let nextYear = 0;
      let month = setMonth || now.getMonth();
      //没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 10 ? 1 : (month + 1);
      console.log("当前选中月nextMonth：" + nextMonth);
      //目标月1号对应的星期
      let startWeek = this.getWeek(year, nextMonth, 1); //new Date(year + ',' + (month + 1) + ',' + 1).getDay(); 
      console.log("目标月1号对应的星期startWeek:" + startWeek);
      //获取目标月有多少天
      let dayNums = this.getTotalDayByMonth(year, nextMonth); //new Date(year, nextMonth, 0).getDate();         
      console.log("获取目标月有多少天dayNums:" + dayNums);
      let obj = {};
      let num = 0;
      if (month + 1 > 11) {
        nextYear = year + 1;
        dayNums = new Date(nextYear, nextMonth, 0).getDate();
      } else {
        nextMonth = '0' + nextMonth
      }
      for (var j = -startWeek + 1; j <= dayNums; j++) {
        var tempWeek = -1;
        if (j > 10 || j == 10) {
          tempWeek = this.getWeek(year, nextMonth, j);
          var monthDay = year + "-" + nextMonth + "-" + j + " 00:00:00"
          // console.log(year + "年" + nextMonth + "月" + j + "日" + "星期" + tempWeek);
        } else {
          var monthDay = year + "-" + nextMonth + "-" + '0' + j + " 00:00:00"
          // console.log(year + "年" + nextMonth + "月" + '0' + j + "日" + "星期" + tempWeek);
        }
        var clazz = '';
        if (tempWeek == 0 || tempWeek == 6)
          clazz = 'week'
        if (j < DATE_DAY && year == DATE_YEAR && nextMonth == DATE_MONTH)
          //当天之前的日期不可用
          clazz = 'unavailable ' + clazz;
        if (nextMonth < DATE_MONTH && year == DATE_YEAR)
          clazz = 'unavailable ' + clazz;
        if (year < DATE_YEAR)
          clazz = 'unavailable ' + clazz;
        else
          clazz = '' + clazz
        /**如果当前日期已经选中，则变色 */
        var date = year + "-" + nextMonth + "-" + j;
        var index = this.checkItemExist(this.data.checkDate, date);
        if (index != -1) {
          clazz = clazz + ' active';
        }
        dateArr.push({
          day: j,
          dailyDay: monthDay,
          class: clazz,
          amount: '暂无'
        })
      }
      // console.log(dateArr, 'dateArr')
      // console.log(this.properties.PriceCalendarList, 'PriceCalendarList')
      for (var a = 0; a < dateArr.length; a++) {
        for (var b = 0; b < this.data.PriceCalendarList.length; b++) {
          if (dateArr[a].dailyDay == this.data.PriceCalendarList[b].dailyDate) {
            dateArr[a].amount = '￥' + this.data.PriceCalendarList[b].price
          }
        }
      }
      this.setData({
        days: dateArr
      })
    },

    /**
     * 上个月
     */
    lastMonthEvent: function() {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
      let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.changeDate(year, month)
    },
    /**
     * 下个月
     */
    nextMonthEvent: function() {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
      let month = this.data.month > 11 ? 0 : this.data.month;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.changeDate(year, month)
      // this.createDateListData(year, month);
    },
    /*
     * 获取月的总天数
     */
    getTotalDayByMonth: function(year, month) {
      month = parseInt(month, 10);
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    /*
     * 获取月的第一天是星期几
     */
    getWeek: function(year, month, day) {
      var d = new Date(year, month - 1, day);
      return d.getDay();
    },
    /**
     * 点击日期事件
     */
    onPressDateEvent: function(e) {
      console.log(e, 'e')
      var {
        year,
        month,
        day,
        amount,
        index
      } = e.currentTarget.dataset;
      console.log("当前点击的日期：" + year + "-" + month + "-" + day);
      //当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
      if ((day < DATE_DAY && month == DATE_MONTH) || day <= 0 || month < DATE_MONTH)
        return;

      this.renderPressStyle(year, month, day, amount, index);
    },

    renderPressStyle: function(year, month, day, amount, choseIndex) {
      var days = this.data.days;
      //渲染点击样式
      for (var j = 0; j < days.length; j++) {
        var tempDay = days[j].day;
        if (tempDay == day) {
          if (month < 10) {
            month = '0' + month
          }
          if (day < 10) {
            day = '0' + day
          }
          var date = year + "-" + month + "-" + day;
          var obj = {
            day: date,
            amount: amount,
            index: choseIndex
          };
          var checkDateJson = this.data.checkDate;
          var index = this.checkItemExist(checkDateJson, date);
          console.log(index, 'index')
          if (index == -1) {
            checkDateJson.push(obj)
            if (this.data.type == '2') { //景区
              let NewCheckDateJson = checkDateJson.slice(-1)
              for (let i = 0; i < NewCheckDateJson.length; i++) {
                days[NewCheckDateJson[i]['index']].class = days[NewCheckDateJson[i]['index']].class + ' active';
                if (checkDateJson.length >= 1) {
                  for (let i = 0; i < checkDateJson.length - NewCheckDateJson.length; i++) {
                    console.log(checkDateJson[i]['index'], 'checkDateJson[i].index')
                    days[checkDateJson[i]['index']].class = days[checkDateJson[i]['index']].class.replace(' active', '');
                    days[checkDateJson[i]['index']].class = days[checkDateJson[i]['index']].class.trim()
                    console.log(checkDateJson, '1111')
                    checkDateJson.splice(i, 1);
                    console.log(checkDateJson, '222')
                  }
                }
              }
            } else if (this.data.type == '1') { //酒店
              let NewCheckDateJson = checkDateJson.slice(-2)
              for (let i = 0; i < NewCheckDateJson.length; i++) {
                days[NewCheckDateJson[i]['index']].class = days[NewCheckDateJson[i]['index']].class + ' active';
                if (days[NewCheckDateJson[i]['index']].class.split(' ').length >= 3) {
                  days[NewCheckDateJson[i]['index']].class = ' active active'
                }
                if (checkDateJson.length >= 2) {
                  for (let i = 0; i < checkDateJson.length - NewCheckDateJson.length; i++) {
                    console.log(checkDateJson[i]['index'], 'checkDateJson[i].index')
                    days[checkDateJson[i]['index']].class = days[checkDateJson[i]['index']].class.replace('active active', '');
                    days[checkDateJson[i]['index']].class = days[checkDateJson[i]['index']].class.trim()
                    console.log(checkDateJson, '1111')
                    checkDateJson.splice(i, 1);
                    console.log(checkDateJson, '222')
                  }
                }

              }
            }
          } else {
            console.log(checkDateJson, 'elseCheckDateJson111111')
            checkDateJson.splice(index, 1);
            console.log(j, 'jjjjjjj')
            if (days[j].class == ' active active') {
              days[j].class = days[j].class.replace(' active active', ' ');
              console.log(days[j].class.split(" "), 'split1111')
              days[j].class = days[j].class.trim()
            } else {
              days[j].class = days[j].class.replace(' active', ' ');
              days[j].class = days[j].class.trim()
            }
            console.log(checkDateJson, 'elseCheckDateJson22222')
          }
          this.setData({
            checkDate: checkDateJson
          })
          console.log(this.data.checkDate)
          break;
        }
      }
      this.setData({
        days: days
      });
      console.log(this.data.days, 'days')
    },
    /**检查数组中是否存在该元素 */
    checkItemExist: function(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i].day) {
          return i;
        }
      }
      return -1;
    },
    //购买份数
    onChange(e) {
      this.setData({
        chooseNumber: e.detail
      })
    },
    // 父组件每次关闭选项卡重新赋予年月
    reviewdate() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth();
      this.setData({
        year: year,
        month: month + 1
      })
    },
    //子组件传给父组件所需要的值
    goFatherNeed() {
      console.log(1111111)
      let myEventDetail = {
        choooseValenceList: this.data.checkDate,
        goodId: this.data.id,
        chooseNumber: this.data.chooseNumber
      }
      this.triggerEvent('myevent', myEventDetail)
    }
  }
})