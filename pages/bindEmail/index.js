// pages/bindEmail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdownShow: true,
    countdown: 60,
    email: '1542142885@qq.com'

  },
  clearInput: function() {
    this.setData({
      email: ''
    })
  },
  inputChange: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  bindGo: function() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

    this.checkEmail(this.data.email)

  },
  checkEmail: function(email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      console.log('邮箱验证正确')
      this.setData({
        countdownShow: false
      })
      this.timer()
      return true
    } else {
      wx.showToast({
        title: '请填写正确的邮箱号',
        image: '../../asset/images/warm.png'

      })

      return false

    }
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
  }
})