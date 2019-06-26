// pages/DetailsPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Collection: false,
    show: false,
    Reserve: true,
    menuTop:'',
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
  // 获取商品详情信息
  getInfo(id){
    wx.request({
      url: 'https://www.supconit.net/search/aptitude/byIds/' + id,
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        console.log(res,'info')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.getInfo(id)
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
    var that = this;
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#left').boundingClientRect()//这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
    query.exec(function (res) {
      console.log(res); // #affix节点的上边界坐
      // that.setData({
      //   menuTop: res[0].top
      // })
    });
  },
  // 2.监听页面滚动距离scrollTop
  onPageScroll: function (e) {
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
  }
})