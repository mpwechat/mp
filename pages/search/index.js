// pages/search/index.js
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overlay:true,
    travelTimePopupShow:false,
    tabsType:[
      { text:'门票',id:0} ,
      { text: '酒店', id: 1 },
      { text: '餐饮', id: 2},
      { text: '自助游', id: 3},
      { text: '旅游+', id:4 },
    ],
    recommendedList:['上海','广州','重庆','北京'],
    
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    currentTab:0,
    // 门票查询表单

      ticketFormDestination:'',
      ticketFormDate:new Date().getTime(),
      ticketFormTravelNumber:'5',
      // 1为酒店 2是景区
    searchType:'2'

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 开启门票选择popup
   */
  openTravelTimePopup(){
    this.setData({
      travelTimePopupShow: true
    })
  },
  /**
   * 关闭门票选择日期
   */
  travelTimePopupShowonClose(){
this.setData({
  travelTimePopupShow:false
})
  },
  travelTimeonInputCancel:function(event) {
  var that=this;
    that.setData({
      travelTimePopupShow: false
})
 
  },
  travelTimeonInputConfirm:function(event){
    console.log(event);
    var that=this;
    that.setData({
      ticketFormDate:event.detail,
      travelTimePopupShow: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //在挂载的生命周期里运行 回调时间函数

    let now = new Date();

    let nowdate = utils.formatTime(now);
    console.log(nowdate)
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
  // 事件处理
  showSearch(e){
    let tabIndex = e.currentTarget.dataset.id;
    let showType='';
    switch (tabIndex){
      case 0:
        showType='2'
      break;
      case 1:
        showType = '1'
      break
    }
    var that=this;
    that.setData({
      currentTab: tabIndex,
      searchType: showType
    })
  },
  autoFill(e){

    this.setData({
      ticketFormDestination: e.currentTarget.dataset.text
    })
  },
  bindDateChange(e){
    var that=this;
    var str = "ticketForm.date";
    that.setData({
      [str]: e.detail.value
    })

  },
  // 表单操作
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  //进入搜索结果页
  goDetailPage(){
        wx: wx.navigateTo({
          url: '/pages/searchResult/index?type=' + this.data.searchType + '&keyWord=' + this.data.ticketFormDestination + '&date=' + this.data.ticketFormDate + '&travelNumber=' + this.data.ticketFormTravelNumber,
        })
   
  }
})