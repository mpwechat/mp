// pages/paySuccess/index.js
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
    ]
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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