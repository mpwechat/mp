// pages/DetailsPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: '',
    name: '', //名字
    qualificationObj: {},//价格列表
    choosesList:[],
    minPrice:[],
    Collection: false,
    show: false,
    Reserve: true,
    screenShow: false,
    menuTop: '',
    optionsId: '',
    type: '',
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
        name: '单人标间'
      },
      {
        value: '2',
        check: false,
        name: '大床房'
      },
      {
        value: '3',
        check: false,
        name: '家庭套房'
      },
      {
        value: '4',
        check: false,
        name: '总统套房'
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
    list: [
      {
        id: 'list_1',
        name: '套餐说明'
      },
      {
        id: 'list_2',
        name: '预定须知'
      },
      {
        id: 'list_3',
        name: '地图交通'
      },
      {
        id: 'list_4',
        name: '点评'
      }
    ],
    toView: '',
    fixTop: '',

    state: '',
    KindListState: '',
    ScreenListState: ''
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
  getInfo(id) {
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
      success: function (res) {
        console.log(res, 'info')
        that.setData({
          bgImage: 'http://image.supconit.net' + '/' + res.data.obj.hits[0]._source.cover.split(',')[0]
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
              salesItem['ruleJson'] = JSON.parse(salesItem.ruleJson);
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
        console.log(that.data.qualificationObj, 'data.qualificationObj')
      }
    })
  },
  getTicketType(value) {
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
  screen() {
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
    let type = options.type
    console.log(type, 'type')
    switch (type) {
      case 'hotel':
        this.setData({
          type: 1
        })
        break;
      case 'scenic':
        this.setData({
          type: 2
        })
        break;
    }
    this.setData({
      optionsId: id,
    })
    console.log(this.data.type, 'type')
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

  // 酒店 景区 选择票类
  choseWhichClick(e) {
    console.log(e, 'hotel')
    this.setData({
      KindListState: e.currentTarget.dataset.key,
    })
    let item = e.target.dataset.item
    /**
         * 筛选操作
         */
    let choosesArray = [];
    console.log(typeof (this.data));
    console.log(this.qualificationType);
    switch (parseInt(this.data.type)) {
      case 1:
      debugger
        item.check = !item.check;
        console.log(item, 'hotelItem')
        this.data.BuyHotelKindList.forEach((item) => {
          if (item.check) {
            let screenItem = {};
            screenItem['type'] = 'type';
            screenItem['value'] = item.value;
            choosesArray.push(screenItem);
          }
        })
        break;
      case 2:
        debugger
        item.check = !item.check;
        console.log(item,'sciencItem')
        this.data.BuyScienceKindList.forEach((item) => {
          if (item.check) {
            let screenItem = {};
            screenItem['type'] = 'type';
            screenItem['value'] = item.value;
            choosesArray.push(screenItem);
          }
        })
        break;
    }
    console.log(item,'item')
    // this.data.choosesList = choosesArray;
    this.setData({
      choosesList: choosesArray
    })
    let conditions = {
      minPrice: this.data.minPrice,
      chooses: this.data.choosesList
    };
    // this.data.qualificationObj = this.choosesFilter(this.data.qualificationObj, conditions)
    this.setData({
      qualificationObj: this.choosesFilter(this.data.qualificationObj, conditions)
    })
  },

  // 条件筛选返回数组
  choosesFilter(products, Conditions) {
    console.log(products, 'products')
    console.log(Conditions,'Conditions')
    let tmpProducts = [];
    if (Conditions.chooses.length === 0 && Conditions.minPrice.length === 0) {
      tmpProducts = products;
    } else if (Conditions.chooses.length !== 0) {
      /**
       * 选择类型条件是或逻辑，使用数组连接concat
       */
      for (let choice of Conditions.chooses) {
        tmpProducts = tmpProducts.concat(products.filter(function (item) {
          switch (Conditions.minPrice.length) {
            case 0:
              return (item[choice.type] + '').indexOf(choice.value) !== -1;
              break;
            default:
              if (Conditions.minPrice[0].low !== undefined && Conditions.minPrice[0].high !== undefined) {
                return (item[choice.type] + '').indexOf(choice.value) !== -1 && item['minPrice'] >= Conditions.minPrice[0].low && item['minPrice'] <= Conditions.minPrice[0].high;
              } else if (Conditions.minPrice[0].low !== undefined) {
                return (item[choice.type] + '').indexOf(choice.value) !== -1 && item['minPrice'] >= Conditions.minPrice[0].low;
              } else {
                return (item[choice.type] + '').indexOf(choice.value) !== -1 && item['minPrice'] <= Conditions.minPrice[0].high;
              }
          }
        }));
      }
    } else if (Conditions.chooses.length == 0 && Conditions.minPrice.length !== 0) {
      tmpProducts = products.filter(function (item) {
        if (Conditions.minPrice[0].low !== undefined && Conditions.minPrice[0].high !== undefined) {
          return item['minPrice'] >= Conditions.minPrice[0].low && item['minPrice'] <= Conditions.minPrice[0].high;
        } else if (Conditions.minPrice[0].low !== undefined) {
          return item['minPrice'] >= Conditions.minPrice[0].low;
        } else {
          return item['minPrice'] <= Conditions.minPrice[0].high;
        }
      });
    }
    return tmpProducts;
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