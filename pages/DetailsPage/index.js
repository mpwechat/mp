// pages/DetailsPage/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    login: '', //登陆
    bgImage: '',
    name: '', //名字
    qualificationObj: {}, //价格列表
    productList: [], //商品列表
    choosesList: [],
    minPrice: [],
    Collection: false,
    show: false,
    Reserve: true,
    screenShow: false,
    menuTop: '',
    optionsId: '',
    type: '',
    BuyScienceKindList: [{
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
    BuyHotelKindList: [{
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
    HotelScreenList: [{
        value: '1',
        name: '100以下',
        check: false,
        priceRange: {
          high: 100
        }
      },
      {
        value: '2',
        name: '100-200',
        check: false,
        priceRange: {
          low: 100,
          high: 200
        }
      },
      {
        value: '3',
        name: '200以上',
        check: false,
        priceRange: {
          low: 200
        }
      }
    ],
    ScienceScreenList: [{
        value: '1',
        name: '100以下',
        check: false,
        priceRange: {
          high: 100
        }
      },
      {
        value: '2',
        name: '100-200',
        check: false,
        priceRange: {
          low: 100,
          high: 200
        }
      },
      {
        value: '3',
        name: '200以上',
        check: false,
        priceRange: {
          low: 200
        }
      }
    ],
    Hotellist: [{
        id: 'list_1',
        name: '酒店说明'
      },
      {
        id: 'list_2',
        name: '预定须知'
      },
      // {
      //   id: 'list_3',
      //   name: '地图交通'
      // },
      {
        id: 'list_4',
        name: '点评'
      }
    ],
    Sciencelist: [{
        id: 'list_1',
        name: '景区说明'
      },
      {
        id: 'list_2',
        name: '预定须知'
      },
      // {
      //   id: 'list_3',
      //   name: '地图交通'
      // },
      {
        id: 'list_4',
        name: '点评'
      }
    ],
    toView: '',
    fixTop: '',
    state: '',
    KindListState: '',
    ScreenListState: '',
    productDailyList: {}, // datePicker组件使用数据
    mapObj: {
      lng: '113.324520',
      lat: '23.099994',
      scale: '13',
      markers: [{
        iconPath: "../../asset/images/shadow.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 30,
        height: 16,
        callout: {
          content: '杭州市上城区古墩路583号',
          bgColor: "#409EFF",
          borderWidth: 0,
          borderRadius: 20,
          padding: 10,
          display: "ALWAYS",
          textAlign: "left",
          color: '#fff'
        }
      }],

    },
    commentArray: [{
        user: '15709613629',
        score: '4',
        zanNunber: 157,
        zanActive: false,
        words: '干净舒适，服务态度特别好，指导我们出行计划，交通特别便利，门口公交车很多，可以很方便到达景区，就是二楼的自助餐厅还有待提高，早餐太无味了，厨师技术有待提高，其他方面都是不错的，下次来了还会住这家。'
      },
      {
        user: 'Nayana',
        score: '4',
        zanNunber: 157,
        zanActive: true,
        words: '干净舒适，服务态度特别好，指导我们出行计划，交通特别便利，门口公交车很多，可以很方便到达景区，就是二楼的自助餐厅还有待提高，早餐太无味了，厨师技术有待提高，其他方面都是不错的，下次来了还会住这家。'
      }
    ]
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)

    productDailyList: {} // datePicker组件使用数据

  },
  Collection() {
    let that = this;
    if (that.data.login) {
      if (that.data.Collection) {
        wx.request({
          url: 'https://www.supconit.net/customer/store/' + that.data.optionsId,
          data: '',
          header: {
            'cookie': wx.getStorageSync("sessionid") //读取cookie
          },
          method: 'DELETE',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res, 'resssss')
            that.setData({
              Collection: false
            })
          },
          fail: function() {

          }
        })
      } else {
        wx.request({
          url: 'https://www.supconit.net/customer/store/save',
          data: {
            aptitudeId: that.data.optionsId
          },
          header: {
            'cookie': wx.getStorageSync("sessionid") //读取cookie
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res, 'resssss')
            that.setData({
              Collection: true
            })
          },
          fail: function() {

          }
        })
      }

    }
    // this.setData({
    //   Collection: !this.data.Collection
    // })
  },
  Reserve(e) {
    this.setData({
      Reserve: !this.data.Reserve,
      show: true,
      datePickerProductDailyList: e.currentTarget.dataset.item.productDailyList
    })
    // 调用子组件的方法
    this.selectComponent('#dataPricePicker').onedate()
  },
  onClose() {
    this.setData({
      show: false
    });
    this.selectComponent('#dataPricePicker').reviewdate()
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
      success: function(res) {
        console.log(res, 'info')
        that.setData({
          bgImage: 'http://image.supconit.net' + '/' + res.data.obj.hits[0]._source.cover.split(',')[0]
        })
        let qualificationObj = res.data.obj.hits[0]._source;
        qualificationObj.introduce = qualificationObj.description.substr(0, 100)
        qualificationObj['cover'] = qualificationObj.cover.split(',')
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
        // 修改map Object
        var currentMapObject = that.data.mapObj;
        currentMapObject['lng'] = qualificationObj.amapY,
          currentMapObject['lat'] = qualificationObj.amapX,
          currentMapObject.markers[0]['latitude'] = qualificationObj.amapX;
        currentMapObject.markers[0]['longitude'] = qualificationObj.amapY;
        currentMapObject.markers[0]['callout']['content'] = qualificationObj.address;
        that.setData({
          qualificationObj: qualificationObj,
          productList: qualificationObj['productList'],
          mapObj: currentMapObject,
          loading:false
        })
        console.log(qualificationObj, 'qualificationObj')
        console.log(that.data.productList, 'that.data.productList')
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
  onLoad: function(options) {
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
    console.log(this.data.type, 'type');
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var sreenHeight = res.windowHeight;
        that.setData({
          height: res.windowHeight  + 'px',
        })
      }
    })
    wx.getNetworkType({
      success: function (res) {
        console.log(res);
        switch (res.networkType) {
          case 'none':
            wx.reLaunch({
              url: '/pages/noNetWork/index',
            })
            break
        }

      }
    });
    this.getInfo(id)
    this.getCurrentUserInfo()

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

  },
  getCode: function() {
    this.setData({
      countdownShow: false
    })
    this.timer()
  },
  // 倒计时函数
  timer: function() {
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


  clickScroll: function(e) {
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
    let item = e.currentTarget.dataset.item
    /**
     * 筛选操作
     */
    let choosesArray = [];

    console.log(typeof(this.data));
    console.log(this.qualificationType);

    switch (parseInt(this.data.type)) {
      case 1:
        item.check = !item.check;
        for (let i = 0; i < this.data.BuyHotelKindList.length; i++) {
          if (item.value == this.data.BuyHotelKindList[i].value) {
            this.data.BuyHotelKindList[i].check = item.check
          }
        }
        this.setData({
          BuyHotelKindList: this.data.BuyHotelKindList
        })

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
        item.check = !item.check;
        for (let i = 0; i < this.data.BuyScienceKindList.length; i++) {
          if (item.value == this.data.BuyScienceKindList[i].value) {
            this.data.BuyScienceKindList[i].check = item.check
          }
        }
        this.setData({
          BuyScienceKindList: this.data.BuyScienceKindList
        })
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
    this.setData({
      choosesList: choosesArray
    })
    let conditions = {
      minPrice: this.data.minPrice,
      chooses: this.data.choosesList
    };
    this.setData({
      productList: this.choosesFilter(this.data.qualificationObj, conditions)
    })
    console.log(this.data.productList, 'productListproductList')
  },

  // 条件筛选返回数组
  choosesFilter(products, Conditions) {
    let tmpProducts = [];
    if (Conditions.chooses.length === 0 && Conditions.minPrice.length === 0) {
      tmpProducts = products.productList;
    } else if (Conditions.chooses.length !== 0) {
      /**
       * 选择类型条件是或逻辑，使用数组连接concat
       */
      for (let choice of Conditions.chooses) {
        tmpProducts = tmpProducts.concat(products.productList.filter(function(item) {
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
      tmpProducts = products.productList.filter(function(item) {
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

  choseScreenClick(e) {
    let it = e.currentTarget.dataset.item
    this.setData({
      KindListState: e.currentTarget.dataset.key,
    })
    switch (parseInt(this.data.type)) {
      case 1:
        // it.check = true;
        for (let i = 0; i < this.data.HotelScreenList.length; i++) {
          if (it.value == this.data.HotelScreenList[i].value) {
            this.data.HotelScreenList[i].check = true
          } else {
            this.data.HotelScreenList[i].check = false
          }
        }
        this.setData({
          HotelScreenList: this.data.HotelScreenList
        })
        this.data.HotelScreenList.forEach((item) => {
          if (item.check) {
            this.setData({
              minPrice: [item.priceRange]
            })
          }
        })
        break;
      case 2:
        for (let i = 0; i < this.data.ScienceScreenList.length; i++) {
          if (it.value == this.data.ScienceScreenList[i].value) {
            this.data.ScienceScreenList[i].check = true
          } else {
            this.data.ScienceScreenList[i].check = false
          }
        }
        this.setData({
          ScienceScreenList: this.data.ScienceScreenList
        })
        /**
         * 条件筛选
         */
        this.data.ScienceScreenList.forEach((item) => {
          if (item.check) {
            this.setData({
              minPrice: [item.priceRange]
            })
          }
        })
    }

    let conditions = {
      minPrice: this.data.minPrice,
      chooses: this.data.choosesList
    };
    this.setData({
      productList: this.choosesFilter(this.data.qualificationObj, conditions)
    })
  },
  // 重置选项
  reset() {
    switch (parseInt(this.data.type)) {
      case 1:
        this.data.BuyHotelKindList.forEach((item) => {
          item.check = false
        });
        this.data.HotelScreenList.forEach((item) => {
          item.check = false
        });
        this.setData({
          BuyHotelKindList: this.data.BuyHotelKindList,
          HotelScreenList: this.data.HotelScreenList
        })
        break;
      case 2:
        this.data.BuyScienceKindList.forEach((item) => {
          item.check = false
        });
        this.data.ScienceScreenList.forEach((item) => {
          item.check = false
        });
        this.setData({
          BuyScienceKindList: this.data.BuyScienceKindList,
          ScienceScreenList: this.data.ScienceScreenList
        })
    }
    let conditions = {
      minPrice: [],
      chooses: []
    };
    this.setData({
      productList: this.choosesFilter(this.data.qualificationObj, conditions)
    })
  },
  onShow: function() {
    var that = this;
    var query = wx.createSelectorQuery() //创建节点查询器 query
    query.select('#left').boundingClientRect() //这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
    query.exec(function(res) {
      console.log(res); // #affix节点的上边界坐
      // that.setData({
      //   menuTop: res[0].top
      // })
    });
  },
  // 2.监听页面滚动距离scrollTop
  onPageScroll: function(e) {
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
  },

  getpicture() {
    let id = this.data.optionsId;
    wx.navigateTo({
      url: '/pages/qualificationPictures/index?id=' + id,
      success: function(res) {
        console.log(res)
      }
    })
  },

  SureBuy() {
    console.log(this.data.show, 'show')
    console.log(this.data.show == true, 'show')
    wx.pageScrollTo({
      selector: '#GoodLists',
      duration: 300
    })
    if (this.data.show == true) {
      console.log(this.data.show, 'show')

      this.selectComponent('#dataPricePicker').goFatherNeed()
    }
  },

  compontpass: function(res) {
    console.log(res, 'compontpassRes')
    let {
      choooseValenceList,
      chooseNumber,
      goodId
    } = res.detail
    let that = this
    switch (that.data.type) {
      case 1:
        if (choooseValenceList.length < 2) {
          wx.showToast({
            title: '请选择入住与离店时间',
          })
        } else {
          that.payMoney(res)
        }
        break;
      case 2:
        if (choooseValenceList.length < 1) {
          wx.showToast({
            title: '请选择景点门票日期',
          })
        } else {
          that.payMoney(res)
        }
        break;
    }
  },

  getCurrentUserInfo() {
    console.log(1112312313)
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/customer/info/getCurrentInfo',
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res, 'resssss')
        if (res.statusCode == 200) {
          wx.request({
            url: 'https://www.supconit.net/customer/store/list',
            data: '',
            header: {
              'cookie': wx.getStorageSync("sessionid") //读取cookie
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res,'resssaaa')
              let collectionArray = [];
              let responseCollectionArray = res.data.obj;
              responseCollectionArray.forEach((item) => {
                collectionArray.push(item.aptitudeId)
              })
              that.userCollectionArray = collectionArray;
              if (that.userCollectionArray.length > 0) {
                if (that.userCollectionArray.includes(that.data.optionsId)) {
                  that.setData({
                    Collection:true
                  })
                } else {
                  that.setData({
                    Collection:false
                  })
                }
              } else {
                that.setData({
                  Collection:false
                })
              }
            },
          })
          that.setData({
            login: true
          })
        } else {
          that.setData({
            login: false
          })
        }
      },
      fail: function() {
        that.setData({
          login: false,
          Collection:false
        })
      }

    })
  },

  payMoney(res) {
    // let that = this
    // console.log(that.getCurrentUserInfo(),'getCurrentUserInfo')
    if (this.data.login) {
      console.log(1222)
      let {
        choooseValenceList,
        chooseNumber,
        goodId
      } = res.detail
      let a = JSON.stringify(choooseValenceList)
      wx: wx.redirectTo({
        url: '/pages/fillOrder/index?choooseValenceList=' + a + '&chooseNumber=' + chooseNumber + '&goodId=' + goodId,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.showToast({
        title: '暂未登录，即将跳转至登录页',
      })
      setTimeout(function() {
        wx.setStorageSync('router', '/pages/userCenter/index'); //将userIdEnc存入本地缓存
        wx.redirectTo({
          url: '/pages/bindPhone/index',
        })
      }, 1500)
    }
  },
  // 地图展示
  goMap(e){
    console.log(e,'eeeeee')
    let a = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/map/index?a=' + a,
    })
  }

})