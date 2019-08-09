//index.js
import addressJson from '../../utils/address.js'
//获取应用实例
const app = getApp()
Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    inputValue: '',
    imgUrls: [],
    areaChooseShow: false,
    overlay: true,
    areaValue:'杭州',
    areaList: addressJson,
    activityOptimization: [],
    hotSpot: [],
    hotHotel: [],
    qiNiu: 'https://image.supconit.net',
    guideItemArray: [{
      text: 'HOT',
      img: '../../asset/images/recommend1.png',
      path: '../../pages/Hot/index'
    },
    {
      text: '景区',
      img: '../../asset/images/recommend2.png',
      path: '../../pages/scenic/index'
    },
    {
      text: '酒店',
      img: '../../asset/images/recommend3.png',
      path: '../../pages/hotel/index'
    },
    {
      text: '餐饮',
      img: '../../asset/images/recommend4.png',
      path: '../../pages/food/index'
    },
    {
      text: '自助游',
      img: '../../asset/images/recommend5.png',
      path: '../../pages/travelSelf/index'
    },
    {
      text: '旅游+',
      img: '../../asset/images/recommend6.png',
      path: '../../pages/travelPlus/index'
    },
    ],
    activeTabIndex: 0,

    rob: [{
      img: 'http://image.supconit.net/scenic4.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/scenic4.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/scenic4.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/scenic4.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/scenic4.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/scenic4.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    }
    ],
    optimization: [{
      img: 'http://image.supconit.net/MPHot2.png',
      goodName: '优选方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/MPHot2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/MPHot2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/MPHot2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/MPHot2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/MPHot2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    }
    ],
    foods: [{
      img: 'http://image.supconit.net/food2.png',
      goodName: '餐饮',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/food2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/food2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/food2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/food2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/food2.png',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    }
    ],
    hotActivity: [{
      img: 'http://image.supconit.net/hot1.jpg',
      goodName: '餐饮',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/hot1.jpg',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/hot1.jpg',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/hot1.jpg',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/hot1.jpg',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    },
    {
      img: 'http://image.supconit.net/hot1.jpg',
      goodName: '方特旅游度假区',
      goodDiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐',
      price: '983'
    }
    ]
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    wx.getNetworkType({
      success: function (res) {
        // console.log(res);
        switch (res.networkType){
          case 'none':
            wx.reLaunch({
              url: '/pages/noNetWork/index',
            })
          break
        }
       
      }
    });
    this.getBanner();
    this.getActivityOptimization();
    this.getHotSpot();
    this.getHotHotel();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
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
  sureArea(e){
console.log(e);
    let area = e.detail.values[1].name; 
this.setData({
  areaValue: area.slice(0, area.length - 1),
  areaChooseShow: false
})
  },
  cancelAreaChoose(){
    this.setData({
      areaChooseShow: false
    })
  },


  routerChange(e) {
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  setActiveKey(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeTabIndex: index
    })
  },

  /**
   * 输入监听
   */
  inputChange(e) {
    console.log(e);
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 输入完成时监听触发
   */
  goGlobalSearch() {
    wx.navigateTo({
      url: '/pages/globalSearch/index?searchValue=' + this.data.inputValue + '&area=' + this.data.areaValue
      //  url: '../logs/logs'
    })
  },
  /**
   * 获取banner图
   */
  getBanner() {
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/maintenance/banner/list',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data.obj);
        that.setData({
          imgUrls: res.data.obj
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 获取活动
   */
  getActivityOptimization() {
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/shop/activity/page4C?size=4&&page=0',
      data: '',
      header: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        let activeties = res.data.obj.records;
        let activititesArray = activeties;
        let activityContactArray = [];
        activititesArray.forEach(function (item, index) {
          wx.request({
            url: 'https://www.supconit.net/search/aptitude/byActivityId/' + item.id,
            data: '',
            header: {},
            method: 'GET',
            success: function (responce) {
              // console.log(responce)
              let ActivityItem = {};
              ActivityItem['name'] = item.name;
              ActivityItem['productList'] = responce.data.obj;
              if (responce.data.obj.length > 0) {
                responce.data.obj.forEach(function(item){
                  let dailPriceArray = []
                  let priceList = item.productDailyList;
                  priceList.forEach(function (priceDaliyItem,
                    index) {
                    dailPriceArray.push(priceDaliyItem
                      .price)
                  })
                  item['cover'] = that.data.qiNiu + '/' + item.cover.split(',')[0];
                  if (dailPriceArray.length > 0) {
                    item['minPrice'] = Math.min.apply(null,
                      dailPriceArray);
                  }

                })
              }
              activityContactArray.push(ActivityItem)
              console.log(activityContactArray)
              that.setData({
                activityOptimization: activityContactArray
              })
            }
          })
        })
     
       
      },
    })
  },


  /**
   * 获取热门景区
   */
  getHotSpot() {
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/search/aptitudeScenic?size=8&&page=0',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.obj)
        let HotViewArray = res.data.obj;
        //资质商品列表 计算 最小价格
        // for (var i = 0; i < HotViewArray)
        HotViewArray.forEach(function (item, index) {
          let itemProductArray = item.productList;
          // console.log(itemProductArray);
          let dailPriceArray = [];
          itemProductArray.forEach(function (goodItem, index) {
            let priceList = goodItem.productDailyList;
            priceList.forEach(function (priceDaliyItem, index) {
              dailPriceArray.push(priceDaliyItem.price)
            })
            item['minPrice'] = Math.min.apply(null, dailPriceArray);

          })
          // console.log(item['minPrice'])
          item['cover'] = that.data.qiNiu + '/' + item.cover.split(',')[0];
        })
        // console.log(HotViewArray)

        that.setData({
          hotSpot: HotViewArray
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 获取热门酒店
   */
  getHotHotel() {
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/search/aptitudeHotel?size=8&&page=0',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.obj)
        let HotHotelArray = res.data.obj.content;
     
        //资质商品列表 计算 最小价格
        // for (var i = 0; i < HotViewArray)
        HotHotelArray.forEach(function (item, index) {
          let itemProductArray = item.productList;
          // console.log(itemProductArray);
          let dailPriceArray = [];
          itemProductArray.forEach(function (goodItem, index) {
            let priceList = goodItem.productDailyList;
            priceList.forEach(function (priceDaliyItem, index) {
              dailPriceArray.push(priceDaliyItem.price)
            })
            item['minPrice'] = Math.min.apply(null, dailPriceArray);
          })
          item['cover'] = that.data.qiNiu + '/' + item.cover.split(',')[0];
        })
        // console.log(HotHotelArray)

        that.setData({
          hotHotel: HotHotelArray
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 获取资质详情
   */
  getQualificationDetail(e){
    var qualificationId = e.currentTarget.dataset.qualificationid;
    let type ;
    switch (e.currentTarget.dataset.type){
      case 1:
        type='hotel'
      break
      case 2:
        type = 'scenic'
      break;
    }
    wx.navigateTo({
      url: '/pages/DetailsPage/index?id=' + qualificationId + '&type=' + type,
    })
  },

})