// pages/DetailsPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage:'',
    name:'', //名字
    qualificationObj:{},//价格列表
    Collection: false,
    show: false,
    Reserve: true,
    screenShow:false,
    menuTop:'',
    optionsId:'',
    type:'',
    BuyScienceKindList: [
      {
        value: '1',
        check: false,
        name: '成人票'
      },
      {
        value: '2',
        check: false,
        name: '儿童票'
      },
      {
        value: '3',
        check: false,
        name: '学生票'
      },
      {
        value: '4',
        check: false,
        name: '家庭套票'
      }
    ],
    BuyHotelKindList: [
      {
        value: '1',
        check: false,
        name: '成人票'
      },
      {
        value: '2',
        check: false,
        name: '儿童票'
      },
      {
        value: '3',
        check: false,
        name: '学生票'
      },
      {
        value: '4',
        check: false,
        name: '家庭套票'
      }
    ],
    ScreenList: [
      {
        value: '1',
        name: '100以下'
      },
      {
        value: '2',
        name: '100-200'
      },
      {
        value: '3',
        name: '200以上'
      }
    ],
    list:[
      {
        id:'list_1',
        name:'套餐说明'
      },
      {
        id:'list_2',
        name:'预定须知'
      },
      {
        id:'list_3',
        name:'地图交通'
      },
      {
        id:'list_4',
        name: '点评'
      }
    ],
    toView: '',
    fixTop: '',

    state:'',
    KindListState:'',
    ScreenListState:''
  },
  Collection() {
    this.setData({
      Collection: !this.data.Collection
    })
  },
  Reserve() {
    this.setData({
      Reserve: !this.data.Reserve,
      show: true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  // 获取商品详情信息
  getInfo(id){
    let that = this
    wx.request({
      url: 'https://www.supconit.net/search/aptitude/byIds/' + id,
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        console.log(res,'info')
        that.setData({
          bgImage:'http://image.supconit.net' + '/' + res.data.obj.hits[0]._source.cover.split(',')[0]
        })
        let qualificationObj = res.data.obj.hits[0]._source;
        //资质商品列表 计算商品最小价格
        //资质最小价格
        let qualificationGoodsPrice = [];
        let productArray = qualificationObj.productList;
        productArray.forEach((item) => {
          let priceList = item.productDailyList;
          let dailPriceArray = [];
          priceList.forEach((priceDaliyItem) => {
            dailPriceArray.push(priceDaliyItem.price)
          })
          item['minPrice'] = Math.min.apply(null, dailPriceArray);
          qualificationGoodsPrice.push(Math.min.apply(null, dailPriceArray));
        });
        qualificationObj['minPrice'] = Math.min.apply(null, qualificationGoodsPrice)
        qualificationObj['productList'] = productArray;
        let currentTimeStamp = Date.parse(new Date());
        qualificationObj.productList.forEach((item) => {
          if (item.saleList !== "") {
            // debugger
            let matchSalesArray = [];
            item.saleList.forEach((salesItem) => {
              // salesItem['ruleJson'] = '(' + salesItem.ruleJson + ')';
              salesItem['ruleJson'] = JSON.stringify(salesItem.ruleJson);
              if (parseInt(salesItem.beginDate) <= currentTimeStamp && currentTimeStamp <= parseInt(salesItem.endDate)) {
                matchSalesArray.push(salesItem);
              }
              item.saleList = matchSalesArray
            })
          }
        })
        that.setData({
          qualificationObj: qualificationObj
        })
        console.log(qualificationObj, 'qualificationObj')
        console.log(that.data.qualificationObj,'data.qualificationObj')
      }
    })
  },
  getTicketType(value){
    switch (value) {
      case 1:
        return '成人票';
      case 2:
        return '儿童票';
      case 3:
        return '学生票';
      case 4:
        return '家庭套票'
    }
  },
  /**
   * 点击筛选是否显示价格
   */
  screen(){
    let screenShowOrNot = !this.data.screenShow
    this.setData({
      screenShow: screenShowOrNot
    })
    // this.data.screenShow = !screenShowOrNot
    // console.log(this.data.screenShow,'screenShow')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const type = options.type
    this.setData({
      optionsId : id,
      type:type
    })
    this.getInfo(id)
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

  },
  getCode: function () {
    this.setData({
      countdownShow: false
    })
    this.timer()
  },
  // 倒计时函数
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(() => {
        this.setData({
          countdown: this.data.countdown - 1
        })
        if (this.data.countdown <= 0) {
          this.setData({
            countdown: 60,
            countdownShow: true,
          })
          resolve(setTimer)
        }
      }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },


  clickScroll: function (e) {
    var id = e.currentTarget.dataset.id
    
    this.setData({
      toView: id,
      state: e.currentTarget.dataset.key,
    })
    console.log(e.currentTarget);
  },
  choseWhichBuyClick(e){
    this.setData({
      KindListState: e.currentTarget.dataset.key,
    })
  },
  choseScreenClick(e){
    this.setData({
      ScreenListState: e.currentTarget.dataset.key,
    })
  },




  onShow: function () {
    var that = this;
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#left').boundingClientRect()//这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
    query.exec(function (res) {
      console.log(res); // #affix节点的上边界坐
      // that.setData({
      //   menuTop: res[0].top
      // })
    });
  },
  // 2.监听页面滚动距离scrollTop
  onPageScroll: function (e) {
    // console.log(e.scrollTop);
    var that = this;
    // 3.当页面滚动距离scrollTop > menuTop菜单栏距离文档顶部的距离时，菜单栏固定定位
    if (e.scrollTop > that.data.menuTop) {
      // that.setData({
      //   menuFixed: true
      // })
    } else {
      // that.setData({
        // menuFixed: false
      // })
    }
  }
})