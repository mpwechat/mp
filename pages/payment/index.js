// pages/paySuccess/index.js
const CryptoJS = require('../../utils/HMAC-SHA256.js');
const moment = require('../../utils/moment.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aniStyle: true,
    reviewPriceDetail: false,
    paymentType: [{
        text: '支付宝',
        img: '../../asset/images/payment_ali.png',
        check: false,
        index: 0
      },
      {
        text: '微信支付',
        img: '../../asset/images/payment_wechat.png',
        check: false,
        index: 1
      },
      {
        text: '银联支付',
        img: '../../asset/images/payment_card.png',
        check: false,
        index: 2
      },
    ],
    prciePay: 0.1,
    orderSnapshot:{}


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
/**
 * 解析路有参数
 */
// console.log(JSON.parse(options));
// 获取订单快照
    // 获取openID
    var that = this;
    const APP_ID = 'wx7ed0955cce3e8d15'; //输入小程序appid 
    const APP_SECRET = '6e95440dd98aa92cb63c043ca5ee6da5';
    var OPEN_ID = '' //储存获取到openid 
    var SESSION_KEY = '' //储存获取到session_key
    wx.login({
      success: function(data) {
        console.log(data);
        wx.request({
          //获取openid接口
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APP_ID + '&secret=' + APP_SECRET + '&js_code=' + data.code + '&grant_type=authorization_code',
          data: {},
          method: 'GET',
          success: function(res) {
            console.log(res.data)
            OPEN_ID = res.data.openid; //获取到的openid 
            SESSION_KEY = res.data.session_key; //获取到session_key 
            that.setData({
              openid: OPEN_ID,
              session_key: SESSION_KEY
            });
          }
        })
      }
    })
    this.pay();

  },
  reviewPriceDetail() {
    var that = this;
    that.setData({
      // aniStyle: false
      reviewPriceDetail: !this.data.reviewPriceDetail,
    })
  },

  onClose() {
    this.setData({
      reviewPriceDetail: false
    });
  },
  checkPayment(e) {

    let index = e.currentTarget.dataset.index;
    console.log(index);
    for (var i = 0; i < this.data.paymentType.length; i++) {
      if (i == index) {
        this.data.paymentType[i].check = true;
      } else {
        this.data.paymentType[i].check = false;
      }
    }
    this.setData({
      paymentType: this.data.paymentType
    })
  },
  /**
   * 支付
   */
  pay() {
    var res_paydata = 'wx050928208477094aa9865aa51950540700';
    console.log(Date.parse(new Date()))
    var timeStamp = this.timeStamp();
    var randomString = this.randomString();
    var Mixedicymd5 = this.MixedencryMD5(res_paydata, randomString, timeStamp)
    var paySign = CryptoJS.HmacSHA256(Mixedicymd5, "123456789012345678901234567890SP").toString().toUpperCase()
    // var paySign = md5.hexMD5(Mixedicymd5).toUpperCase()
    debugger
    wx.requestPayment({
      'timeStamp': timeStamp,
      'nonceStr': randomString,
      'package':'prepay_id=' + res_paydata,
      'signType':'HMAC-SHA256',
      'paySign': paySign,
      'success':function(res) {
        console.log(res)
        debugger
      },
      'fail': function(res) {
        console.log(res)
      },
      'complete': function(res) {
        console.log(res)
      }
    })
  },
  // 调起支付签名
  MixedencryMD5(res_paydata, randomString, timeStamp) {
    return "appId=" + 'wx7ed0955cce3e8d15' + "&nonceStr=" + randomString + "&package=prepay_id=" + res_paydata + "&signType=HMAC-SHA256" + "&timeStamp=" + timeStamp + "&key=" + '123456789012345678901234567890SP';
  },
  // / 时间戳
  timeStamp() {
    return parseInt(new Date().getTime() / 1000) + ''
  },
  /* 随机数 */
  randomString() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < 32; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  getOpenIdTap() {

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