// pages/paySuccess/index.js
const md5 = require('../../utils/md5.js');
const moment = require('../../utils/moment.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aniStyle:true,
    reviewPriceDetail:false,
    paymentType:[
      { text: '支付宝', img:'../../asset/images/payment_ali.png',check:false,index:0},
      { text: '微信支付', img: '../../asset/images/payment_wechat.png', check: false, index: 1},
      { text: '银联支付', img: '../../asset/images/payment_card.png', check: false, index:2 },
    ],
    prciePay:0.1,
    
   
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const APP_ID = 'wx7ed0955cce3e8d15'; //输入小程序appid 
    const APP_SECRET = '6e95440dd98aa92cb63c043ca5ee6da5';
    var OPEN_ID = '' //储存获取到openid 
    var SESSION_KEY = '' //储存获取到session_key
    wx.login({
      success: function (data) {
        console.log(data);
        wx.request({
          //获取openid接口
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APP_ID + '&secret=' + APP_SECRET + '&js_code=' + data.code + '&grant_type=authorization_code',
          data: {},
          method: 'GET',
          success: function (res) {
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

  },
  reviewPriceDetail(){
var that=this;

      that.setData({
        // aniStyle: false
        reviewPriceDetail: !this.data.reviewPriceDetail,
      })
  },
  
  onClose() {
    this.setData({ reviewPriceDetail: false });
  },
  checkPayment(e){

    let index = e.currentTarget.dataset.index;
    console.log(index);
    for (var i = 0; i < this.data.paymentType.length;i++){
      if(i==index){
        this.data.paymentType[i].check=true;
      }else{
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
  pay(){
    var res_paydata='weixin://wxpay/bizpayurl?pr=edV4Oaj';
    console.log(Date.parse(new Date()))
    debugger
    var timeStamp = this.timeStamp();
    var randomString = this.randomString();
    var Mixedicymd5 = this.MixedencryMD5(res_paydata, randomString, timeStamp) 
    var paySign = md5.hexMD5(Mixedicymd5 )
    wx.requestPayment(
      {
        'timeStamp': timeStamp,
        'nonceStr': randomString,
        'package': 'prepay_id ='+ wx2017033010242291fcfe0db70013231072,
        'signType': 'MD5',
        'paySign': paySign,
        'success': function (res) { 

        },
        'fail': function (res) { },
        'complete': function (res) { }
      }) 



  },
  // 调起支付签名
 MixedencryMD5(res_paydata, randomString, timeStamp) {
    return "appId=" + config.appid + "&nonceStr=" + randomString + "&package=prepay_id=" + res_paydata + "&signType=MD5" + "&timeStamp=" + timeStamp + "&key=" + config.key;
  },
  // / 时间戳
 timeStamp() {
    return parseInt(new Date().getTime() / 1000) + ''
  },
/* 随机数 */
randomString() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < 32; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  getOpenIdTap(){

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

  }
})