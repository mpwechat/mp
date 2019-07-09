// pages/userCenter/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    activeNames: '1'
  },
  getCurrentUserInfo() {
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
        let avatarImgUrl = ''

        switch (res.statusCode) {
          case 200:
            console.log(res.data.obj);
            let UserInfoJson = res.data.obj
            if (UserInfoJson.avatar !== '') {
              avatarImgUrl = 'http://image.supconit.net' + '/' + UserInfoJson.avatar
            } else {
              avatarImgUrl = 'http://image.supconit.net/avtar.png'
            }
            that.setData({
              avatar: avatarImgUrl,
             
            })
            break;
          case 401:
            wx.showToast({
              title: '暂未登录，即将跳转至登录页',
            })
            setTimeout(function () {
              wx.setStorageSync('router', '/pages/userCenter/index'); //将userIdEnc存入本地缓存
              wx.redirectTo({
                url: '/pages/bindPhone/index',
              })
            }, 1500)

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
  myCollections(){
    wx.navigateTo({
      url: '/pages/MyCollection/index'
    })
  },
  myContacts() {
    wx.navigateTo({
      url: '/pages/myContacts/index'
    })
  },
  myAddress() {
    wx.navigateTo({
      url: '/pages/myAddress/index'
    })
  },
  /**
   * 跳转至用户信息
   */
  getUserInfo(){
    wx.navigateTo({
      url: '/pages/userInfo/index'
    })
  },
  /**
 * 用户积分
 */
  getMemberIntegral() {
    wx.navigateTo({
      url: '/pages/integral/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
this.getCurrentUserInfo()
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {

        console.log(res);
        that.data.userInfo = res.userInfo;

        that.setData({
          userInfo: that.data.userInfo
        })
      }
    })

    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    
  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  onChange(event) {
    this.setData({
      activeName: event.detail
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
    // this.getUserInfo();
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
  myOrders() {
    wx.switchTab({
      url: '/pages/order/index',
    })
  }
})