// pages/activities/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHome:true,
    gradient:true,
    navH: app.globalData.navHeight,
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    qiNiu: 'https://image.supconit.net',
    activityOptimization:[],
    imgUrls: [{ url: 'hotBanner.png' }, { url: 'hotBanner.png' }, { url: 'hotBanner.png' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecords()

  },
  getRecords(){
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/shop/activity/page4C?size=10000&&page=0',
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
                responce.data.obj.forEach(function (item) {
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
  getGoodDetail(e){
    console.log(e, 'e')
    var goodId = e.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: '/pages/goodPackageDetail/index?id=' + goodId ,
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