// pages/Hot/index.js
//index.js
import addressJson from '../../utils/address.js'
import moment from '../../utils/moment.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    overlay: true,
    // 地区
    areaValue: '杭州',
    // 类型
    searchType: '',
    // 出行人数
    travelNumber: '',
    // 关键词
    keyWord: '',
    // 出行日期
    travelDateBegin: '',
    // 更多查询条件
    condition: [],
    areaList: addressJson,
    height: 0,
    recodePage:0,
    comprehensiveConditionsShow: false,
    aniStyle: true,
    comprehensiveArrow: false,
    comprehensiveCondition: [{
      'text': '综合',
      check: true,
      index: 0
    },
    {
      'text': '上新',
      check: false,
      index: 1
    },
    {
      'text': '价格降序',
      check: false,
      index: 2
    },
    {
      'text': '价格升序',
      check: false,
      index: 3
    }
    ],
    // 销量筛选
    salesArrow: false,
    salesConditionsShow: false,
    salesaniStyle: true,
    salesCondition: [{
      'text': '销量降序',
      check: true,
      index: 0
    },
    {
      'text': '销量降序',
      check: false,
      index: 1
    },
    ],
    // 好评筛选
    evaluationArrow: false,
    evaluationConditionsShow: false,
    evaluationaniStyle: true,
    evaluationCondition: [{
      'text': '好评率降序',
      check: true,
      index: 0
    },
    {
      'text': '好评率降序',
      check: false,
      index: 1
    },
    ],
    // 更多筛选
    moreArrow: false,
    moreConditionsShow: false,
    moreaniStyle: true,
    currentValue: 0,
    filterCurrentValue: 0,
    qualificationsTypes: [
      { text: '酒店', check: false, type: 1 },
      { text: '景区', check: false, type: 2 },
      { text: '餐饮', check: false, type: 3 },
      { text: 'Hot', check: false, type: 4 },
      { text: '自助游', check: false, type: 5 },
      { text: '旅游+', check: false, type: 6 },
    ],
    optionsArray: [],
    oldType: '',
    // 商品列表
    goodShowArray: [],
    finished: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options);
    if (options.area) {
      that.setData({
        areaValue: options.area,
      })
    }
    if (options.keyWord) {
      that.setData({
        keyWord: options.keyWord
      })
    }
    if (options.type) {
      let currentTypeArray = that.data.qualificationsTypes;
      for (var i = 0; i < currentTypeArray.length; i++) {

        if (currentTypeArray[i].type + '' == options.type) {
          currentTypeArray[i].check = true
        }
      }
      // currentTypeArray.forEach(function(item){
      //   debugger
      //   if (item.text = mactchItem.text){
      //     item.check=true
      //   }
      // })

      that.setData({
        searchType: options.type,
        oldType: options.type,
        qualificationsTypes: currentTypeArray
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        var sreenHeight = res.windowHeight;
        that.setData({
          height: res.windowHeight - 94 + 'px',
        })
      }
    })
    that.getRecodes()
    that.getCodition()
  },
  /**
   * 地区选择弹窗关闭
   */
  openAreaChoosePopup() {
    this.setData({
      areaChooseShow: true
    })
  },
  areaChooseShowonClose() {
    this.setData({
      areaChooseShow: false
    })
  },
  /**
   * 确定地区训责
   */
  sureArea(e) {
    // console.log(e);
    let area = e.detail.values[1].name;
    this.setData({
      areaValue: area.slice(0, area.length - 1),
      areaChooseShow: false
    })
  },
  cancelAreaChoose() {
    this.setData({
      areaChooseShow: false
    })
  },
  /**
   * 关键词输入变化
   */
  keyWordsChange(e) {
    // console.log(e)
  },
  /**
   * 综合筛选显示隐藏
   */
  comprehensiveConditionsChange() {
    var that = this;
    var currentState = that.data.comprehensiveConditionsShow;
    var aniStyle = that.data.aniStyle;
    var comprehensiveArrow = that.data.comprehensiveArrow;
    if (currentState == false) {
      that.setData({
        comprehensiveConditionsShow: true,
        aniStyle: true,
        comprehensiveArrow: true,
        salesConditionsShow: false,
        salesaniStyle: false,
        salesArrow: false,
        evaluationaniStyle: false,
        moreaniStyle: false,
        //设置动画效果为slidedown
        evaluationConditionsShow: false,
        evaluationArrow: false,
        moreConditionsShow: false,
        moreArrow: false
      })
    } else {
      this.setData({
        aniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
        that.setData({
          comprehensiveConditionsShow: false,
          comprehensiveArrow: false
        })
      }, 500)
    }
  },
  comprehensiveConditionsHide: function (e) { //这是list-fix的点击事件，给它绑定事件，是为了实现点击其它地方隐藏蒙层的效果
    var that = this;
    this.setData({
      aniStyle: false　　　　　　 //设置动画效果为slidedown
    })
    setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        comprehensiveConditionsShow: false,
        comprehensiveArrow: false

      })
    }, 500)
  },
  inbtn: function (e) { //这个事件必须有，就算不做什么事情也要写上去，因为这个事件是为了防止事件冒泡，导致点击in-list这里面的元素时，点击事件冒泡到list-fix触发它的slidedown事件。
    console.log("in")
  },
  comprehensiveConditionsChoose(e) {
    let index = e.target.dataset.index;
    // console.log(index);
    let currentCondition = this.data.comprehensiveCondition;
    for (var i = 0; i < currentCondition.length; i++) {
      if (i == index) {
        currentCondition[i].check = true
      } else {
        currentCondition[i].check = false
      }
    }
    this.setData({
      comprehensiveCondition: currentCondition
    })
  },
  /**销量筛选动画 */
  salesConditionsChange() {
    var that = this;
    var currentState = that.data.salesConditionsShow;
    var aniStyle = this.data.salesaniStyle;
    var salesArrow = that.data.salesArrow;
    if (currentState == false) {
      that.setData({
        salesConditionsShow: true,
        salesaniStyle: true,
        salesArrow: true,
        //设置其他多选sildeUp
        aniStyle: false,
        evaluationaniStyle: false,
        moreaniStyle: false,
        //设置动画效果为slidedown
        comprehensiveConditionsShow: false,
        comprehensiveArrow: false,
        evaluationConditionsShow: false,
        evaluationArrow: false,
        moreConditionsShow: false,
        moreArrow: false
      })
    } else {
      this.setData({
        salesaniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
        that.setData({
          salesConditionsShow: false,
          salesArrow: false
        })
      }, 500)
    }
  },
  salesConditionsHide() {
    var that = this;
    this.setData({
      salesaniStyle: false　　　　　　 //设置动画效果为slidedown
    })
    setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        salesConditionsShow: false,
        salesArrow: false
      })
    }, 500)
  },
  salesConditionsConditionsChoose(e) {
    let index = e.target.dataset.index;
    // console.log(index);
    let currentCondition = this.data.salesCondition;
    for (var i = 0; i < currentCondition.length; i++) {
      if (i == index) {
        currentCondition[i].check = true
      } else {
        currentCondition[i].check = false
      }
    }
    this.setData({
      salesCondition: currentCondition
    })
  },
  /**好评率筛选 */

  evaluationConditionsChange() {
    var that = this;
    var currentState = that.data.evaluationConditionsShow;
    var aniStyle = this.data.evaluationaniStyle;
    var salesArrow = that.data.evaluationArrow;
    if (currentState == false) {
      that.setData({
        evaluationConditionsShow: true,
        evaluationaniStyle: true,
        evaluationArrow: true,
        //设置其他多选sildeUp
        aniStyle: false,
        comprehensiveConditionsShow: false,
        comprehensiveArrow: false,
        salesaniStyle: false,
        salesConditionsShow: false,
        salesArrow: false,
        moreaniStyle: false,
        moreConditionsShow: false,
        moreArrow: false
      })
    } else {
      this.setData({
        evaluationaniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
        that.setData({
          evaluationConditionsShow: false,
          evaluationArrow: false
        })
      }, 500)
    }
  },
  evaluationConditionsHide() {
    var that = this;
    this.setData({
      evaluationaniStyle: false　　　　　　 //设置动画效果为slidedown
    })
    setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        evaluationConditionsShow: false,
        evaluationArrow: false
      })
    }, 500)
  },
  evaluationConditionsConditionsChoose(e) {
    let index = e.target.dataset.index;
    // console.log(index);
    let currentCondition = this.data.evaluationCondition;
    for (var i = 0; i < currentCondition.length; i++) {
      if (i == index) {
        currentCondition[i].check = true
      } else {
        currentCondition[i].check = false
      }
    }
    this.setData({
      evaluationCondition: currentCondition
    })
  },
  // 更多筛选
  moreConditionsChange() {
    var that = this;
    var currentState = that.data.moreConditionsShow;
    var aniStyle = this.data.moreaniStyle;
    var salesArrow = that.data.moreArrow;
    if (currentState == false) {
      that.setData({
        moreConditionsShow: true,
        moreaniStyle: true,
        moreArrow: true,
        //设置其他多选sildeUp
        aniStyle: false,
        salesaniStyle: false,
        evaluationaniStyle: false,
        //设置动画效果为slidedown
        comprehensiveConditionsShow: false,
        comprehensiveArrow: false,
        salesConditionsShow: false,
        salesArrow: false,
        evaluationConditionsShow: false,
        evaluationArrow: false
      })
    } else {
      this.setData({
        moreaniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
        that.setData({
          moreConditionsShow: false,
          moreArrow: false
        })
      }, 500)
    }
  },
  moreConditionsHide() {
    var that = this;
    this.setData({
      moreaniStyle: false　　　　　　 //设置动画效果为slidedown
    })
    setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        moreConditionsShow: false,
        moreArrow: false
      })
    }, 500)
  },
  // 价格范围拖动
  onDrag(event) {
    // console.log(event)
    let that = this;
    that.setData({
      currentValue: event.detail,
      filterCurrentValue: event.detail * 10
    });
  },
  // 酒店等级选择
  qualificationsSelect(e) {
    let oldType = this.data.searchType
    var type = e.target.dataset.type;
    // 类型切换从首页开始加载
    if (oldType !== type) {
      this.setData({
        recodePage: 0
      })

    }
    let index = e.target.dataset.index;
    // console.log(index);
    var hotelStarArray = this.data.qualificationsTypes;
    for (var i = 0; i < hotelStarArray.length; i++) {
      if (i == index) {
        if (hotelStarArray[i].check == false) {
          hotelStarArray[i].check = true;
        } else {
          hotelStarArray[i].check = false;
        }

      } else {
        hotelStarArray[i].check = false;
      }
    }
    this.setData({
      qualificationsTypes: hotelStarArray,
      searchType: type
    })

  },
  // 景区等级选择
  scenicStarSelect(e) {
    // console.log(e.target.dataset)
    var index = e.target.dataset.index;
    var category = e.target.dataset.category;
    let currentConditionArray = this.data.condition;
    let currentOptionsArray = this.data.optionsArray;
    currentOptionsArray.forEach(function (categoryItem, categoryIndex) {
      categoryItem.options.forEach(function (optionItem, optionIndex) {
        if (category == categoryIndex && optionIndex == index) {
          // console.log(optionItem)
          if (optionItem.check == true) {
            optionItem.check = false;
            var indexInCurrentCondition = currentConditionArray.indexOf(optionItem.value);
            if (indexInCurrentCondition > -1) {
              currentConditionArray.splice(indexInCurrentCondition, 1);
            }

          } else {
            optionItem.check = true;
            currentConditionArray.push(optionItem.value)

          }

        }
      })
    })
    this.setData({
      optionsArray: currentOptionsArray,
      condition: currentConditionArray
    })

  },
  /**
   * 取消筛选
   */
  resetMoreConditin() {
    var that = this;
    /**
     * 清空选择
     */
    let currentTypeArray = that.data.qualificationsTypes;
    for (var i = 0; i < currentTypeArray.length; i++) {
      currentTypeArray[i].check = false
    }


    let currentOptionsArray = this.data.optionsArray;
    currentOptionsArray.forEach(function (categoryItem, categoryIndex) {
      categoryItem.options.forEach(function (optionItem, optionIndex) {
        optionItem.check = false
      })
    })
    this.setData({
      moreaniStyle: false　,　　　　　 //设置动画效果为slidedown
      optionsArray: currentOptionsArray,
      condition: [],
      qualificationsTypes: currentTypeArray,
      searchType: ''
    })
    setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        moreConditionsShow: false,
        moreArrow: false
      })
    }, 500);
    that.getRecodes()
  },
  /**
   * 确定更多筛选条件
   */
  sureMoreConditin() {
    var that = this;
    this.setData({
      moreaniStyle: false　　　　　　 //设置动画效果为slidedown
    })
    setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        moreConditionsShow: false,
        moreArrow: false
      })
    }, 500)
    that.getRecodes()
  },


  /**
   * 懒加载更多商品
   */
  loadingMoreGood() {
    let currentPage = this.data.recodePage;
    this.setData({
      recodePage: currentPage + 1
    })
    console.log('拼命加载中')
    if (this.data.finished ) {
     
    }else{
      this.getRecodes()
    }

  },
  /**
   * 获取搜索条件
   */
  getCodition() {
    let that = this;
    wx.request({
      url: 'https://www.supconit.net/maintenance/search-select',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data.obj)
        res.data.obj.forEach(function (item) {
          item.options.forEach(function (optionItem) {
            // if (optionItem.label == optionType && optionType !== '') {
            //   optionItem.check = true;
            //   this.conditions.push(optionItem.value)
            // } else {
            optionItem.check = false
            // }

          })

        })
        that.setData({
          optionsArray: res.data.obj
        })

      }
    })
  },

  /**
   * 获取搜索记录
   */
  getRecodes() {
    // 重定义查询参数
    let that = this;
    let page = that.data.recodePage;
    let queryKetWord = that.data.keyWord;
    let queryType = that.data.searchType;
    let queryStartDate = moment(parseInt(that.data.travelDateBegin)).format('YYYY-MM-DD');
    let queryNumber = that.data.travelNumber;
    let queryCondition = that.data.condition.join(',')
    let queryArea = that.data.areaValue;
   
    let queryMinPrice = that.data.filterCurrentValue + ''

    wx.request({
      url: 'https://www.supconit.net/search/aptitude?type=' + queryType + '&size=8&page=' + page + '&beginData=' + queryStartDate + '&keyword=' + queryKetWord + '&num=' + queryNumber + '&area=' + queryArea + '&beginPrice=' + queryMinPrice,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        let recodesArray = res.data.obj.hits;
        console.log(recodesArray)
        if (recodesArray.length > 0) {
          recodesArray.forEach(function (item, index) {
            let itemProductArray = item.productList;
            // console.log(itemProductArray);
            let dailPriceArray = [];
            itemProductArray.forEach(goodItem => {
              let priceList = goodItem.productDailyList;
              priceList.forEach((priceDaliyItem) => {
                dailPriceArray.push(priceDaliyItem.price)
              })
              // console.log(dailPriceArray)
              item['minPrice'] = Math.min.apply(null, dailPriceArray);

            })
            item['cover'] = 'http://image.supconit.net' + '/' + item.cover.split(',')[0]
          });
          debugger
          console.log(that.data.oldType);
          console.log(queryType);
          if (that.data.oldType == queryType) {
            that.setData({
              goodShowArray: that.data.goodShowArray.concat(recodesArray),
              loading: false
            })
          } else {
            that.setData({
              goodShowArray: recodesArray,
              loading: false
            })
          }

          if (that.data.goodShowArray.length == res.data.obj.total) {
            that.setData({
              finished: true
            })
          }
        }
      }
    })
  },
/**
 * 跳转至资质详情页
 */
getDetail(e){
  var qualificationId = e.currentTarget.dataset.qualificationid;
  let type;
  switch (e.currentTarget.dataset.type) {
    case 1:
      type = 'hotel'
      break
    case 2:
      type = 'scenic'
      break;
  }
  wx.navigateTo({
    url: '/pages/DetailsPage/index?id=' + qualificationId + '&type=' + type,
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