// pages/DetailsPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Collection: false,
    show: false,
    Reserve: true,


    list:[
      {
        id:'list_1',
        name:'套餐说明'
      },
      {
        id:'list_2',
        name:'预定须知'
      },
      {
        id:'list_3',
        name:'地图交通'
      },
      {
        id:'list_4',
        name: '点评'
      }
    ],
    toView: '',
    fixTop: '',

    state:''

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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




  onShow: function () {
    let self = this;
    wx.createSelectorQuery().select('#affix').boundingClientRect(function (rect) {
      console.log(rect,'rexcc')
      self.setData({
        fixTop: rect.top,
      })
    }).exec()
  },
  onPageScroll: function (e) {
    var that = this
    console.log(e,'e')
    that.setData({
      scrollTop: e.scrollTop
    })
    if(e.scrollTop == 338){

    }
  },
})