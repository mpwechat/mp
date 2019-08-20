// pages/integral/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHome: true,
    navH: app.globalData.navHeight,
    gradient:false,
    height: 0,
    recordPage: 0,
    scroeArray: [],
    allScoreHasScore:false,
    earn: false, 
    outScoreHasScore:false
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
          height: res.windowHeight - 225 + 'px',

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
    that.getAllReocde();
  },
  loadingMoreintegral() {
    console.log('加载数据中')
  },

  /**
   * 获取全部积分
   */
  getAllReocde() {
    let that = this;
    let page = that.data.recordPage
    wx.request({
      url: 'https://www.supconit.net/customer/score?size=8&page=' + page,
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        switch (res.statusCode){
          case 200:
            debugger
            let recordArray = res.data.obj.records;
            if (recordArray.length>0){
              recordArray.forEach(function (item, index) {
                if (item.scoreChange > 0) {
                  item['positive'] = true
                } else {
                  item['positive'] = false
                }
              })
             
              // positive
              that.setData({
                scroeArray: recordArray,
                allScoreHasScore:true,
                earn: false,
                outScoreHasScore: false
              })
            }else{
              that.setData({
                allScoreHasScore: false,
                earn: false,
                outScoreHasScore: false
              })
            }
  
   
          break;
          case 401:
            wx.showToast({
              title: '暂未登录，即将跳转至登录页',
            })
            wx.navigate({
              url: '/pages/bindPhone/index',
            })
          break;
        }
      },
      fail: function() {
    
        wx.showToast({
          title: '暂未登录，即将跳转至登录页',
        })
        wx.navigateTo({
          url: '/pages/bindPhone/index',
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