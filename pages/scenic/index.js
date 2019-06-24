// pages/Hot/index.js
//index.js
import addressJson from '../../utils/address.js'
//获取应用实例
Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaChooseShow: false,
    overlay: true,
    areaValue: '杭州',
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
    currentValue: 30,
    hotelStar: [{
      text: '不限',
      index: 0,
      check:0
    },
      {
        text: '二星级/经济',
        index: 1,
        check: 0
      },
      {
        text: '三星级/舒适',
        index: 2,
        check: 0
      },
      {
        text: '四星级/高档',
        index: 3,
        check: 0
      },
      {
        text: '五星级/豪华',
        index: 4,
        check: 0
      },
    ],
    scenicStar:[
      {
        text: '不限',
        index: 0,
        check: 0
      },
      {
        text: 'AAA级',
        index: 1,
        check: 0
      },
      {
        text: 'AAAA级',
        index: 2,
        check: 0
      },
      {
        text: 'AAAAA级',
        index:3,
        check: 0
      }
    ],
    // 商品列表
<<<<<<< HEAD
    goodShowArray:[
      
    ]
=======
    goodShowArray:[]
>>>>>>> 13f6df16fabf256ddedeea5a755c991dadcba253
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var sreenHeight = res.windowHeight;
        that.setData({
          height: res.windowHeight - 94 + 'px',


        })
      }
    })
    this.getRecodes()

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
    console.log(e);
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
        comprehensiveArrow: true
      })
    } else {
      this.setData({
        aniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
        that.setData({
          comprehensiveConditionsShow: false,
          comprehensiveArrow: false
        })
      }, 500)
    }
  },
  comprehensiveConditionsHide: function(e) { //这是list-fix的点击事件，给它绑定事件，是为了实现点击其它地方隐藏蒙层的效果
    var that = this;
    this.setData({
      aniStyle: false　　　　　　 //设置动画效果为slidedown
    })
    setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        comprehensiveConditionsShow: false,
        comprehensiveArrow: false

      })
    }, 500)
  },
  inbtn: function(e) { //这个事件必须有，就算不做什么事情也要写上去，因为这个事件是为了防止事件冒泡，导致点击in-list这里面的元素时，点击事件冒泡到list-fix触发它的slidedown事件。
    console.log("in")
  },
  comprehensiveConditionsChoose(e) {
    let index = e.target.dataset.index;
    console.log(index);
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
        salesArrow: true
      })
    } else {
      this.setData({
        salesaniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
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
    setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        salesConditionsShow: false,
        salesArrow: false
      })
    }, 500)
  },
  salesConditionsConditionsChoose(e) {
    let index = e.target.dataset.index;
    console.log(index);
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
        evaluationArrow: true
      })
    } else {
      this.setData({
        evaluationaniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
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
    setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        evaluationConditionsShow: false,
        evaluationArrow: false
      })
    }, 500)
  },
  evaluationConditionsConditionsChoose(e) {
    let index = e.target.dataset.index;
    console.log(index);
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
        moreArrow: true
      })
    } else {
      this.setData({
        moreaniStyle: false　　　　　　 //设置动画效果为slidedown
      })
      setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
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
    setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        moreConditionsShow: false,
        moreArrow: false
      })
    }, 500)
  },
  // 价格范围拖动
  onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  },
  // 酒店等级选择
  hotelStarSelect(e){
var index=e.target.dataset.index;
console.log(index);
    var hotelStarArray = this.data.hotelStar;
    for (var i = 0; i < hotelStarArray.length;i++){
      if(i==index){
        if (hotelStarArray[i].check==0){
          hotelStarArray[i].check = 1;
        }else{
          hotelStarArray[i].check = 0;
        }
       
      }
    }
    this.setData({
      hotelStar: hotelStarArray
    })
  },
  // 景区等级选择
  scenicStarSelect(e){
    var index = e.target.dataset.index;
    console.log(index);
    var scenicStarArray = this.data.scenicStar;
    for (var i = 0; i < scenicStarArray.length; i++) {
      if (i == index) {
        if (scenicStarArray[i].check == 0) {
          scenicStarArray[i].check = 1;
        } else {
          scenicStarArray[i].check = 0;
        }

      }
    }
    this.setData({
      scenicStar: scenicStarArray
    })
  },
  /**
   * 取消筛选
   */
  resetMoreConditin(){
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
  /**
   * 确定更多筛选条件
   */
  sureMoreConditin(){
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


  /**
   * 懒加载更多商品
   */
  loadingMoreGood(){
    let currentPage = this.data.recodePage;
console.log('拼命加载中')
  },

  /**
   * 获取景区记录
   */
  getRecodes(){
    let that=this;
    let page = that.data.recodePage+'';
    wx.request({
      url: 'https://www.supconit.net/search/aptitude?type=2&size=8&page='+page,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        let recodesArray = res.data.obj.hits;
        console.log(recodesArray)
        recodesArray.forEach(function(item ,index) {
          let itemProductArray = item._source.productList;
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
          item['cover'] = 'http://image.supconit.net' + '/' + item._source.cover.split(',')[0]
        });
          that.setData({
            goodShowArray: that.data.goodShowArray.concat(recodesArray)
          })
      }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})