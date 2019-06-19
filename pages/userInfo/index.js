// pages/userInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avtar:'http://image.supconit.net/food3.png',
    replaceNickName:false,
    nickName:'Na ya Na',
    replaceUserName:false,
    userName:'刘雪梅',
    replaceSex:false,
    sexArray: ['女', '男'],
    index: 0,
    replaceBirthDay:false,
    date:'2016-09-01',
    userIntroduce:'这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，自我介自我介自我介自我介自我介自我介自我介字数大约在100字左 这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，自我介自我介自我介自我介自我介自我介自我介字数大约在100字左',
    replaceUserIntroduce:false
  },
/**
 * 更换头像
 */
  changeAvtar(){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          avtar: tempFilePaths
        })
        // wx.uploadFile({
        //   url: 'https://www.smartguali.com/guali/file/uploadFile',
        //   filePath: that.data.tempFilePaths[imgIndex - 1],
        //   name: 'file',
        //   formData: {
        //     "msg": "msg"
        //   },
        //   // header: {
        //   //   "Content-Type": "multipart/form-data"
        //   // },  
        //   success: function (res) {
        //     console.log(res)
        //     console.log(res.data);
        //     var uploadReult = res.data
        //     var imgresult = that.data.responceImgs;
        //     var responcearray = imgresult + uploadReult;
        //     that.setData({
        //       responceImgs: responcearray
        //     });
        //     console.log(that.data.responceImgs)
        //     //do something  
        //   }, fail: function (err) {
        //     console.log(err)
        //   }
        // });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }

    })
  },
  /**
   * 修改昵称
   */
  replaceNickerName(){
    let currentreplaceNickNameState = this.data.replaceNickName;
    this.setData({
      replaceNickName:true 
    })
  },
/**
 * 修改姓名
 */
  replaceUserName(){
    let currentreplaceUserNameState = this.data.replaceUserName;
    this.setData({
      replaceUserName: true
    })
  },
  /**
   * 修改性别
   */
  replaceSex(){
    this.setData({
      replaceSex: true
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 修改生日
  replaceBirthDay(){
    this.setData({
      replaceBirthDay: true
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 修改介绍
  replaceUserIntroduce(){
    this.setData({
      replaceUserIntroduce:true
    })
  },
  /**
   * 绑定邮箱
   */
  bindEmail(){
wx.navigateTo({
  url:"/pages/bindEmail/index",
})
  },
  /**
   * 绑定手机
   */
  bindPhone(){
    wx.navigateTo({
      url: "/pages/bindPhone/index",
    })
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

  }
})