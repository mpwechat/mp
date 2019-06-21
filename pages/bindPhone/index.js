// pages/bindEmail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdownShow:true,
    countdown:60,
    phoneNumber:'15709613629',
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
       wx.setStorageSync("sessionid", res.header["Set-Cookie"])
      //  wx.navigateBack({
      //    delta:1
      //  })
       wx.redirectTo({
         url: wx.getStorageSync('router') //或者url: '/page/person/goldcoin/index'
       })
     },
     fail: function(res) {},
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