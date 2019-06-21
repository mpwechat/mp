// pages/userInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    avatar: '',
    qiNiuAvatar:'',
    replaceAvtar:false,
    replaceNickName: false,
    nickName: 'Na ya Na',
    replaceUserName: false,
    userName: '刘雪梅',
    replaceSex: false,
    sexPopupShow: false,
    overlay: true,
    index: 0,
    sexArray: [{
      text: '女'
    }, {
      text: '男'
    }],
    replaceBirthDay: false,
    chooseBirthDayshow: false,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    date: new Date().getTime(),
    userIntroduce: '这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，自我介自我介自我介自我介自我介自我介自我介字数大约在100字左 这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，自我介自我介自我介自我介自我介自我介自我介字数大约在100字左',
    replaceUserIntroduce: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCurrentUserInfo()
  },

  /**
   * 获取用户信息
   */
  getCurrentUserInfo(){
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/customer/info/getCurrentInfo',
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        let avatarImgUrl=''
     
        switch (res.statusCode) {
          case 200:
            console.log(res.data.obj);
            let UserInfoJson = res.data.obj
            if (UserInfoJson.avatar !==''){
              avatarImgUrl = 'http://image.supconit.net' + '/'+UserInfoJson.avatar
            }else{
              avatarImgUrl = 'http://image.supconit.net/avtar.png'
            }
            that.setData({
              avatar: avatarImgUrl,
              date: parseInt(UserInfoJson.birthDate),
              index: UserInfoJson.sex,
              nickName: UserInfoJson.nickName,
              userName: UserInfoJson.realName,
              email: UserInfoJson.email,
              phone: UserInfoJson.phone,
              qiNiuAvatar: UserInfoJson.avatar,
              userId:UserInfoJson.id
            })
            break;
          case 401:
            wx.showToast({
              title: '暂未登录，即将跳转至登录页',
            })
            setTimeout(function(){
              wx.setStorageSync('router', '/pages/userInfo/index'); //将userIdEnc存入本地缓存
            wx.redirectTo({
                url: '/pages/bindPhone/index',
              })
            },1500)
         
            break;
        }
      },
      fail: function () {
        wx.showToast({
          title: '暂未登录，即将跳转至登录页',
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/bindPhone/index',
          })
        }, 1500)
      }

  })
  },
  /**
   * 更换头像
   */
  changeAvtar() {
    var that = this;
  that.setData({
   replaceAvtar:true
  })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://www.supconit.net/maintenance/qiniu',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            "msg": "msg"
          },
          // header: {
          //   "Content-Type": "multipart/form-data"
          // },  
          success: function (res) {
            let responseJSON = JSON.parse(res.data)
            that.setData({
              qiNiuAvatar: responseJSON.obj[0].key,
              avatar: 'http://image.supconit.net' + '/' + responseJSON.obj[0].key
            })
          
            //do something  
          }, fail: function (err) {
            console.log(err);

          }
        });
      },
      fail: function(res) {
        console.log(res.errMsg)
      }

    })
  },
  /**
   * 修改昵称
   */
  replaceNickerName() {
    let currentreplaceNickNameState = this.data.replaceNickName;
    this.setData({
      replaceNickName: true
    })
  },
  /**
   * 修改姓名
   */
  replaceUserName() {
    let currentreplaceUserNameState = this.data.replaceUserName;
    this.setData({
      replaceUserName: true
    })
  },
  /**
   * 修改性别
   */
  replaceSex() {
    this.setData({
      replaceSex: true
    })
  },
  opensexPopupShow() {
    this.setData({
      sexPopupShow: true
    })
  },
  onClose() {
    this.setData({
      sexPopupShow: false
    })
  },

  sexChoose(e) {
    console.log(e)
    let ind = e.currentTarget.dataset.index;
    this.setData({
      index: ind
    })
  },
  // 修改生日
  replaceBirthDay() {
    this.setData({
      replaceBirthDay: true
    })
  },
  openChooseBirthDay: function() {
    this.setData({
      chooseBirthDayshow: true
    })
  },
  chooseBirthDayCancel() {
    this.setData({
      chooseBirthDayshow: false
    })
  },
  chooseBirthDayConfirm(e){
console.log(e)
this.setData({
  date:e.detail,
  chooseBirthDayshow: false
})
  },
  // 修改介绍
  replaceUserIntroduce() {
    this.setData({
      replaceUserIntroduce: true
    })
  },
  /**
   * 绑定邮箱
   */
  bindEmail() {
    wx.navigateTo({
      url: "/pages/bindEmail/index",
    })
  },
  /**
   * 绑定手机
   */
  bindPhone() {
    wx.navigateTo({
      url: "/pages/bindPhone/index",
    })
  },
// 保存info
  saveUserInfo(){
    let parmas={};
      parmas["ali"]='';
        parmas["avatar"]=this.data.qiNiuAvatar;
    parmas["birthDate"] = this.data.date;
      parmas["email"] = this.data.email;
    parmas["nickName"] = this.data.nickName;
    parmas["phone"] = this.data.phone
    parmas["qq"] ='';
    parmas["realName"] = this.data.userName;         
    parmas["sex"] = this.data.index;          
    parmas["wx"] = '';           
    wx.request({
      url: 'https://www.supconit.net/customer/info/'+this.data.userId,
      data: parmas,
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
       console.log(res);
        wx.showToast({
          title: res.data.msg,
        })

      },fail(e){
console.log(e)
      }
    })
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