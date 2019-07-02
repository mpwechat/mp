// pages/fillOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodType: 1,
    overlay: true,
    checkInStartDatePopupShow: false,
    checkInStartDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter: function(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    // 离店popup
    checkInEndDatePopupShow: false,
    checkInEndDate: (new Date().getTime()) + (24 * 60 * 60 * 1000),
    // 房间数
    roomNumber: 1,
    // 联系人数量
    contactArray: [{
        name: '',
        phoneNumber: ''
      }

    ],
    // 费用明细
    costDetailShow: false,
    // 门票数量
    ticketNumber: 1,
    // 游玩人
    playerArray: [{
        name: '',
        phoneNumber: '',
        IdCardNumber: '',
        IdCardType: '身份证',
      },
      {
        name: '',
        phoneNumber: '',
        IdCardNumber: '',
        IdCardType: '身份证',
      },
    ],
    columns: ['身份证', '港澳台通行证', '护照'],
    idCardTypePopShow:false,
    currentPlayer:0,
    chooseContact:true,
    chooseContactList:[
      {name:'杨贤斐',phone:'15709613628',idCard:'431229199610312825',select:true},
      { name: 'nayana', phone: '15709613628', idCard: '431229199610312587', select: false },
      { name: 'nayana', phone: '15709613628', idCard: '431229199610312587', select: false },
      { name: '杨贤斐', phone: '15709613628', idCard: '431229199610312825', select: false },
      { name: 'nayana', phone: '15709613628', idCard: '431229199610312587', select: false },
      { name: 'nayana', phone: '15709613628', idCard: '431229199610312587', select: false },
    ]
  },
  checkInStartDatePopupShow: function() {
    this.setData({
      checkInStartDatePopupShow: true
    })
  },
  // 入住开始时间确定
  sureCheckInStartDate: function(event) {
    var that = this;
    that.setData({
      checkInStartDate: event.detail,
      checkInStartDatePopupShow: false
    })
  },
  // 取消选择开始时间
  cancelCheckInStartDate() {
    this.setData({
      checkInStartDatePopupShow: false
    })
  },
  // 关闭开始时间弹窗
  closeCheckInStartDatePopup() {
    this.setData({
      checkInStartDatePopupShow: false
    })
  },
  // 调起离店popup
  checkInEndDatePopupShow() {
    this.setData({
      checkInEndDatePopupShow: true
    })
  },
  // 离店开始时间确定
  sureCheckInEndDate: function(event) {
    var that = this;
    that.setData({
      checkInEndDate: event.detail,
      checkInEndDatePopupShow: false
    })
  },
  // 取消选择开始时间
  cancelCheckInEndDate() {
    this.setData({
      checkInEndDatePopupShow: false
    })
  },
  // 关闭离店时间选择
  closeCheckInEndDatePopup() {
    this.setData({
      checkInEndDatePopupShow: false
    })
  },
  // 增加房间数
  addRoomNumber() {
    let currentNumber = this.data.roomNumber
    this.setData({
      roomNumber: currentNumber + 1
    })
  },
  // 减少房间数
  minusRoomNUmber() {
    let currentNumber = this.data.roomNumber
    this.setData({
      roomNumber: currentNumber - 1
    })
  },
  // 增加联系人
  addContactNumber() {
    let currentContactArray = this.data.contactArray;
    var addCOntactJson = {};
    addCOntactJson['name'] = '';
    addCOntactJson['phoneNumber'] = '';
    currentContactArray.push(addCOntactJson);
    this.setData({
      contactArray: currentContactArray
    })
  },
  // 删除当前联系人
  deleteThisConatct(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let currentContactArray = this.data.contactArray;
    if (this.data.contactArray.length <= 1) {
      wx.showToast({
        title: "需一位联系人",
        image: '/asset/images/warm1.png', //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 

      })
    } else {
      currentContactArray.splice(index, 1);
      this.setData({
        contactArray: currentContactArray
      })
    }
  },
  // 选择联系人
  chooseContacts(){
    this.setData({
      chooseContact: true
    })
  },

  chooseContactonClose(){
this.setData({
  chooseContact:false
})
  },
  chooseThisContact(e){
console.log(e.currentTarget.dataset);
    let ind = e.currentTarget.dataset.index;
    let currentContactList = this.data.chooseContactList;
    currentContactList.forEach(function(item,index){
      if (ind == index){
       item.select=true 
      }else{
        item.select = false
      }
    })
    this.setData({
      chooseContactList:currentContactList,
      chooseContact: false
    })
  },
  // 费用明细弹出层open
  costDetailShowOpen() {
    this.setData({
      costDetailShow: true
    })
  },
  // // 费用明细弹出层close
  costDetailOnClose() {
    this.setData({
      costDetailShow: false
    })
  },
  // 门票数量加
  addTicketNumber() {
    this.setData({
      ticketNumber: this.data.ticketNumber + 1
    })
  },
  // 门票数量减
  minusTicketNUmber() {
    this.setData({
      ticketNumber: this.data.ticketNumber - 1
    })
  },
  // 游玩人证件类型关闭
  chooseIdTypeonClose(e) {
   
    this.setData({
      idCardTypePopShow: true,
    })
  },

  openThisChooseType(e) {
  
 this.setData({
   idCardTypePopShow:true,
   currentPlayer:e.currentTarget.dataset.index
 })
 console.log(this.data.currentPlayer)
  },
  // 证件类型选择
  IdCardTypeonChange(e) {
    let that=this;
    console.log(e);
    let index = that.data.currentPlayer;
    let value = e.detail.value;
    that.data.playerArray[index].IdCardType = value;
    that.setData({
      playerArray: that.data.playerArray,
      idCardTypePopShow:false,
    })
    console.log(that.data.currentPlayer)
  
  },
  // 添加游玩人
  addPlayNumber(){
  
    let currentplayrArray = this.data.playerArray;
    var playerJson = {};
    playerJson['name'] = '';
    playerJson['phoneNumber'] = '';
    playerJson['IdCardNumber']= '',
    playerJson[' IdCardType'] = '身份证',
      currentplayrArray.push(playerJson);
    this.setData({
      playerArray: currentplayrArray
    })
  },
  // 删除当前游玩人
  deleteThisPlayer(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let currentplayerArray = this.data.playerArray;
    if (currentplayerArray.length <= 1) {
      wx.showToast({
        title: "需一位游玩人",
        image: '/asset/images/warm1.png', //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 

      })
    } else {
      currentplayerArray.splice(index, 1);
      this.setData({
        playerArray: currentplayerArray
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({

    })
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