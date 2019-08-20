// pages/addNewAddress/index.js
import addressJson from '../../utils/address.js'
import Toast from '/../../miniprogram_npm/vant-weapp/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHome:true,
    gradient:false,
    addressKindList:[
      {
        address:'家庭',
        value:1
      },
      {
        address:'公司',
        value:2
      },
      {
        address:'其他',
        value:3
      }
    ],
    InAddress: '',
    id:'',
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
        province: e.detail.values[0].name,
        city: e.detail.values[1].name,
        area: '',
        show: false
      })
    } else {
      this.setData({
        InAddress: e.detail.values[0].name + '' + e.detail.values[1].name + ' ' + e.detail.values[2].name,
        province: e.detail.values[0].name,
        city: e.detail.values[1].name,
        area: e.detail.values[2].name,
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
  InputName(e) {
    let name = e.detail.value;
    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(name))) {
      Toast.fail('姓名输入有误')
    } else {
      this.setData({
        username: name
      })
    }

  },
  InputPhoneNum(e) {
    let telphone = e.detail.value;
    if (telphone.length === 11) {
      if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(telphone))) {
        Toast.fail('手机号码有误')
      } else {
        this.setData({
          telphone: telphone
        })
      }
    }
  },
  InputCertificateNum(e) {
    let address = e.detail.value;
    this.setData({
      address: address
    })
  },
  EditOrAddInfo() { //判断是编辑还是新增
    const that = this
    if (that.data.username == '') {
      Toast.fail('姓名不能为空')
    } else if (that.data.telphone == '') {
      Toast.fail('手机号不能为空')
    } else if (that.data.address == '') {
      Toast.fail('详细地址不能为空')
    } else {
      if (that.data.id != undefined && that.data.id != '') {
        that.editInfo(that.data.id)
      } else {
        that.AddInfo()
      }
    }
  },

  editInfo(id) {
    let that = this
    wx.request({
      url: 'https://www.supconit.net/customer/address/' + id,
      data: {
        "address": that.data.address,
        "area": that.data.area,
        "city": that.data.city,
        "default": that.data.defaultOrNot,
        "id": that.data.id,
        "name": that.data.name,
        "phone": that.data.telphone,
        "province": that.data.province,
        "type": that.data.type
      },
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res, 'ressssss')
        wx.redirectTo({
          url: '/pages/myAddress/index'    //或者url: '/page/person/goldcoin/index'
        })
      }
    })
  },
  AddInfo() {
    let that = this
    console.log('adddddddddInfoooo')
    wx.request({
      url: 'https://www.supconit.net/customer/address',
      data: {
        "address": that.data.address,
        "area": that.data.area,
        "city": that.data.city,
        "default": that.data.defaultOrNot,
        "customerId": 0,
        "id": 0,
        "name": that.data.username,
        "phone": that.data.telphone,
        "province": that.data.province,
        "type": '2'
      },
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res, 'addNewinfo')
        wx.redirectTo({
          url: '/pages/myAddress/index'    //或者url: '/page/person/goldcoin/index'
        })
      }
    })
  },
  // 选择地址类型
  choseAddressKind(e){
    console.log(e,'e')
    this.setData({
      type: e.target.dataset.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options')
    if (options.id != 'undefined') {
      this.setData({
        id: options.id
      })
      this.getAddressInfo(options)
    } else {
    }
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