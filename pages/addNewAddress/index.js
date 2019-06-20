// pages/addNewAddress/index.js
import addressJson from '../../utils/address.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InAddress: '',
    show: false,
    areaList: addressJson,
    username:'',
    telphone:'',
    province:'',
    city:'',
    area:'',
    address:'',
    type:'',
    defaultOrNot:false
  },
  choseAddress(){
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  confirm(e){
    console.log(e)
    if (e.detail.values[2] == undefined){
      this.setData({
        InAddress: e.detail.values[0].name + '' + e.detail.values[1].name,
        show: false
      })
    } else {
      this.setData({
        InAddress: e.detail.values[0].name + '' + e.detail.values[1].name + ' ' + e.detail.values[2].name,
        show: false
      })
    }
  },
  cancel(){
    this.setData({
      show: false
    })
  },
  onChange(event) {
    // 需要手动对 checked 状态进行更新
    this.setData({ defaultOrNot: event.detail });
  },
  // 获取地址详细信息
  getAddressInfo(options) {
    const id = options.id
    this.setData({
      id: id
    })
    const that = this
    console.log(id, 'id')
    if (id != undefined) {
      wx.request({
        url: 'https://www.supconit.net/customer/address/' + id,
        data: '',
        header: {
          'cookie': wx.getStorageSync("sessionid") //读取cookie
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res)
          that.setData({
            username: res.data.obj.name,
            telphone: res.data.obj.phone,
            province: res.data.obj.province,
            city: res.data.obj.city,
            area: res.data.obj.area,
            address: res.data.obj.address,
            type: res.data.obj.type,
            defaultOrNot: res.data.obj.default,
            InAddress: res.data.obj.province + '' + res.data.obj.city + '' + res.data.obj.area
          })
        }
      })
    } else {
      that.setData({
        username: '',
        telphone: '',
        province: '',
        city: '',
        area: '',
        address: '',
        type: '',
        defaultOrNot: ''
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressInfo(options)
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
  }
})