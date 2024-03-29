// pages/bindEmail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHome:true,
    countdownShow:true,
    gradient:false,
    countdown:60,
    phoneNumber:'17326033529',
    verification:1
  },
  inputChange: function (e) {
    let that=this;
    that.setData({
      phoneNumber: e.detail.value
    })
    console.log(that.data.phoneNumber)
  },
  inputVerificationChange(e){
    let that = this;
    that.setData({
      verification: e.detail.value
    })
    console.log(that.data.verification)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  },
  // 绑定手机
  bindPhone(){
let that=this;
   wx:wx.request({
     url: 'https://www.supconit.net/customer/login',
     data: {
       phoneNumber: that.data.phoneNumber,
       verificationCode: that.data.verification
     },
     header: { 'Content-Type': 'application/json; charset=utf-8',},
     method: 'POST',
     dataType: 'json',
     responseType: 'text',
     success: function(res) {
       var pagesSrc = wx.getStorageSync('router')
       wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
       switch (pagesSrc){
         case'/pages/order/index':
           wx.switchTab({
             url: '/pages/order/index',
           })
         break;
         case '/pages/userCenter/index':
           wx.switchTab({
             url: '/pages/userCenter/index',
           })
         break;
         default:
           wx.redirectTo({
             url: pagesSrc //或者url: '/page/person/goldcoin/index'
           })

       }
      
     },
     fail: function(res) {

       let pages = wx.getStorageSync('router')
       wx.setStorageSync("sessionid", res.header["Set-Cookie"])
       wx.redirectTo({
         url: pages  //或者url: '/page/person/goldcoin/index'
       })

     },
     complete: function(res) {},
   })
  },
  clearInput(){
this.setData({
  phoneNumber:''
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

  },
  getCode: function () {

    this.checkPhoneNumber(this.data.phoneNumber)

  },
  checkPhoneNumber: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      console.log('手机号验证正确')
      this.setData({
        countdownShow: false
      })
      this.timer()
      return true
    } else {
      wx.showToast({
        title: '请填写正确的手机号',
        image: '../../asset/images/warm.png'

      })

      return false

    }
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
  }
})