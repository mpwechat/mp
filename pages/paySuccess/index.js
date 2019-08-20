// pages/paySuccess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradient:false,
    showHome:true,
    qiNiu: 'https://image.supconit.net',
    aniStyle:true,
    reviewPriceDetail:false,
    feeDetail:{},
    goodShowArray: [],
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    debugger
this.setData({
  feeDetail: JSON.parse(options.feeDetail),
  orderId: options.orderId
})
    this.getRecommended()
  },
  reviewPriceDetail(){
var that=this;

      that.setData({
        // aniStyle: false
        reviewPriceDetail: !this.data.reviewPriceDetail,
      })

  

  },
  /**
  * 获取推荐
  */
  getRecommended() {
    let that = this;
    wx.request({
      url: 'https://www.supconit.net/search/aptitude?size=5&page=0',
      data: '',
      header: {

      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res, 'info')
        let HotViewArray = res.data.obj.hits;
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
          console.log(item['minPrice'])
          item['cover'] = that.data.qiNiu + '/' + item.cover.split(',')[0];
        })
        console.log(HotViewArray)
        that.setData({
          goodShowArray: HotViewArray

        })

      }
    })

  },
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
  
  onClose() {
    this.setData({ reviewPriceDetail: false });
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