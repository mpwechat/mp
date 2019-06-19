// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    allOrderArray:[
      { orderNmae: '假日酒店(滨康路地铁站店）', orderNumber: '1234587542', orderEffectiveDateStart: '08月03日',orderEffectiveDateEnd: '08月07日',orderPrice:'495',orderState:0},
      { orderNmae: '假日酒店(滨康路地铁站店）', orderNumber: '1234587542', orderEffectiveDateStart: '08月03日', orderEffectiveDateEnd: '08月07日', orderPrice: '495', orderState: 1 },
      { orderNmae: '假日酒店(滨康路地铁站店）', orderNumber: '1234587542', orderEffectiveDateStart: '08月03日', orderEffectiveDateEnd: '08月07日', orderPrice: '495', orderState: 2},
      { orderNmae: '假日酒店(滨康路地铁站店）', orderNumber: '1234587542', orderEffectiveDateStart: '08月03日', orderEffectiveDateEnd: '08月07日', orderPrice: '495', orderState: 0 },
      { orderNmae: '假日酒店(滨康路地铁站店）', orderNumber: '1234587542', orderEffectiveDateStart: '08月03日', orderEffectiveDateEnd: '08月07日', orderPrice: '495', orderState: 1 },
      { orderNmae: '假日酒店(滨康路地铁站店）', orderNumber: '1234587542', orderEffectiveDateStart: '08月03日', orderEffectiveDateEnd: '08月07日', orderPrice: '495', orderState: 2 },
    ]
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
          height: res.windowHeight - 45 + 'px',

        })
      }

    })

  },
  getDetail(e){
console.log(e)
  },
  /**
   * 滚动加载
   */
  loadMoreAllOrders() {
    console.log('滚动加载所有订单中')
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

})