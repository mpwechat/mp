// pages/search/index.js
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradient:false,
    showHome:false,
    overlay: true,
    travelTimePopupShow: false,
    tabsType: [{
        text: '搜索',
        id: 0
      },
      {
        text: '门票',
        id: 1
      },
      {
        text: '酒店',
        id: 2
      },
      {
        text: '餐饮',
        id: 3
      },

      {
        text: '旅游+',
        id: 4
      },
    ],
    recommendedList: ['上海', '广州', '重庆', '北京'],

    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    currentTab: 0,
    // 全局搜索
    gobalKeyWord: '',
    gobalHotWords: ['三星级', '5A', '四星级', '4A', '五星级', '3A'],
    activeGobalWordIndex: -1,
    // 门票查询表单
    ticketFormDestination: '',
    ticketFormDate: new Date().getTime(),
    ticketFormTravelNumber:4,
    // 1为酒店 2是景区
    searchType: '2',
    // 酒店等级
    hotelFormGend: '',
    hotelGendList: [{
        text: '三星级',
        active: false
      },
      {
        text: '四星级',
        active: false
      },
      {
        text: '五星级',
        active: false
      }
    ],
    hotelFormDate: new Date().getTime(),
    checkInTimePopupShow: false,
    hotelTravelNumber: 1,
    // 餐饮
    mealTypeValue: '',
    mealTypeList: [{
        text: '中式',
        active: false
      },
      {
        text: '西式',
        active: false
      },
      {
        text: '日料',
        active: false
      },
      {
        text: '韩式',
        active: false
      },
    ],

    mealTimeList: [{
        text: '早餐',
        active: false
      },
      {
        text: '午餐',
        active: false
      },
      {
        text: '下午茶',
        active: false
      },
      {
        text: '晚餐',
        active: false
      },

    ],
    eatingTimePopupShow: false,
    foodFormDate: new Date().getTime(),
    foodFormEatNumber:1,
// 旅游加
    travelPlusdestination:'',
    travelPlusFormDate: new Date().getTime(),
    travelPlusIncludelist: [
      { text: '门票', checked:false},
      { text: '酒店', checked: false },
      { text: '餐饮', checked: false },
      { text: '服务', checked: false },
      ],
   
    travelPlusNumber:1,
checked:false,
    icon: {
      normal: '../../asset/images/unchecked.png',
      active: '../../asset/images/checked.png'
    },
    chooseIncludeArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 全局关键词搜索
   */
  onSearch(event) {
    console.log(event.detail);
    this.setData({
      gobalKeyWord: event.detail
    })
  },
  /**
   * 全局关键词输入
   */
  onChange(e) {
    console.log(e.detail);
    this.setData({
      gobalKeyWord: e.detail
    })
  },
  /**
   * 全局hotWords 点击
   */
  gobalHotWordActive(e) {
    let index = e.currentTarget.dataset.index;
    debugger
    this.setData({
      activeGobalWordIndex: index,
      gobalKeyWord: e.currentTarget.dataset.word
    })

  },
  /**
   * 开启门票选择popup
   */
  openTravelTimePopup() {
    this.setData({
      travelTimePopupShow: true
    })
  },
  /**
   * 关闭门票选择日期
   */
  travelTimePopupShowonClose() {
    this.setData({
      travelTimePopupShow: false
    })
  },
  travelTimeonInputCancel: function(event) {
    var that = this;
    that.setData({
      travelTimePopupShow: false
    })

  },
  travelTimeonInputConfirm: function(event) {
    console.log(event);
    var that = this;
    that.setData({
      ticketFormDate: event.detail,
      travelTimePopupShow: false
    })
  },
  // 门票出行人数输入
  ticketFormTravelNumberChange(e){
this.ticketFormTravelNumber=e.detail.value
  },
  // 酒店出行人数
  hotelTravelNumberChange(e){
    this.setData({
      hotelTravelNumber:e.detail.value
    })
  },
  
  /**
   * 酒店输入
   */
  hotelFormGendChange(e) {
    console.log(e)
    this.setData({
      hotelFormGend: e.detail.value
    })
  },

  /**
   * 酒店星级选择
   */
  starActive(e) {
    let index = e.currentTarget.dataset.index;
    let currentStarArray = this.data.hotelGendList;
    currentStarArray.forEach(function(item, ind) {
      if (ind == index) {
        item.active = true
      } else {
        item.active = false
      }
    })
    this.setData({
      hotelGendList: currentStarArray,
      hotelFormGend: e.currentTarget.dataset.word
    })

  },
  /**
   * 入住时间弹窗起
   */
  openCheckInTimePopup() {
    this.setData({
      checkInTimePopupShow: true
    })
  },
  /**入住时间弹窗收 */
  checkInTimePopupShowonClose() {
    this.setData({
      checkInTimePopupShow: false
    })
  },
  /**
   * 确定入住时间
   */
  checkInTimeonInputConfirm(e) {
    console.log(e);
    this.setData({
      hotelFormDate: e.detail,
      checkInTimePopupShow: false
    })

  },

  /**
   * 取消入住时间选择
   */
  checkInTimeonInputCancel(e) {
    this.setData({
      checkInTimePopupShow: false
    })
  },
  /**
   * 用餐类型输入
   */
  foodFormGendChange(e) {
    console.log(e.detail.value);
    this.setData({
      mealTypeValue: e.detail.value
    })
  },
  /**用餐类型选择 */
  mealTypeActive(e) {
    let index = e.currentTarget.dataset.index;
    let currentMealTypeArray = this.data.mealTypeList;
    currentMealTypeArray.forEach(function(item, ind) {
      if (index == ind) {
        item.active = true
      } else {
        item.active = false
      }
    })
    this.setData({
      mealTypeList: currentMealTypeArray,
      mealTypeValue: e.currentTarget.dataset.word
    })
  },
  // 用餐时间picker弹出
  openEatingTimePopup() {
    this.setData({
      eatingTimePopupShow: true
    })

  },
  // 用餐时间picker关闭
  eatingTimePopupShowonClose() {
    this.setData({
      eatingTimePopupShow: false
    })
  },
  // 用餐时间选定
  eatingTimeonInputConfirm(e) {
    this.setData({
      foodFormDate: e.detail,
      eatingTimePopupShow: false
    })
  },
  // 用餐时间取消选定
  eatingTimeonInputCancel() {
    this.setData({
      eatingTimePopupShow: false
    })
  },
  // 用餐时段选择
  mealTimeActive(e) {
    let index = e.currentTarget.dataset.index
    let currentMealTimeArray = this.data.mealTimeList;
    currentMealTimeArray.forEach(function(item, ind) {
      if (index == ind) {
        item.active = true
      } else {
        item.active = false
      }
    })
    this.setData({
      mealTimeList: currentMealTimeArray
    })
  },
  // 用餐时间段选择
  travelPlusCheckboxOnChange(e){
let index=e.currentTarget.dataset.index
console.log(index);
    let currentMealTimeArray = this.data.travelPlusIncludelist;
    let currentChooseIncludeArray = this.data.chooseIncludeArray
    currentMealTimeArray.forEach(function(item,ind){
      if (index ==ind ){
        item.checked = !item.checked
        if(item.checked){
          currentChooseIncludeArray.push(item.text)
        }else{
          let arrayIndex = currentChooseIncludeArray.indexOf(item.text);
          currentChooseIncludeArray.splice(arrayIndex,1)
        }
      }
    })
    console.log(currentChooseIncludeArray)
    this.setData({
      travelPlusIncludelist: currentMealTimeArray,
      chooseIncludeArray: currentChooseIncludeArray
    })

  },
  // 用餐人数输入
  foodFormEatNumber(e){
this.setData({
  foodFormEatNumber:e.detail.value
})
  },
  // 旅游—+出行人数
  travelPlusNumberChange(e){
    this.setData({
      travelPlusNumber: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //在挂载的生命周期里运行 回调时间函数

    let now = new Date();

    let nowdate = utils.formatTime(now);
    console.log(nowdate)
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
  // 事件处理
  showSearch(e) {
    let tabIndex = e.currentTarget.dataset.id;
    let showType = '';
    switch (tabIndex) {
      case 1:
        showType = '2'
        break;
      case 2:
        showType = '1'
        break
    }
    var that = this;
    that.setData({
      currentTab: tabIndex,
      searchType: showType
    })
  },
  autoFill(e) {

    this.setData({
      ticketFormDestination: e.currentTarget.dataset.text
    })
  },
  bindDateChange(e) {
    var that = this;
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
  goDetailPage() {
let keyword='';
    let date = new Date().getTime();
    let travelNumber=0;
    let conditionKey=''
    switch (this.data.searchType){
case '1':
          date = this.data.hotelFormDate;
        conditionKey = this.data.hotelFormGend;
        travelNumber = this.data.hotelTravelNumber;
break
case '2':
        keyword=this.data.ticketFormDestination;
        date=this.data.ticketFormDate;
        travelNumber= this.data.ticketFormTravelNumber
break
    }
wx.navigateTo({
  url: '/pages/searchResult/index?type=' + this.data.searchType + '&keyWord=' + keyword + '&date=' + date + '&travelNumber=' + travelNumber + '&conditionKeyWord=' + conditionKey,
    })

  }
})