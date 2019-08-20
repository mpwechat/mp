// pages/addNewMan/index.js
import Toast from '/../../miniprogram_npm/vant-weapp/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHome:true,
    gradient:false,
    focus: false,
    inputValue: '',
    username: '',
    telphone: '',
    idcard: '',
    id: ''
  },
  getinfo(options) {
    const id = options.id
    this.setData({
      id: id
    })
    const that = this
    console.log(id, 'id')
    if (id != undefined) {
      wx.request({
        url: 'https://www.supconit.net/customer/contacts/' + id,
        data: '',
        header: {
          'cookie': wx.getStorageSync("sessionid") //读取cookie
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res, 'info')
          that.setData({
            username: res.data.obj.name,
            telphone: res.data.obj.phone,
            idcard: res.data.obj.idenCard,
          })
          console.log(that.data, 'AllData')
        }
      })
    } else {
      that.setData({
        username: '',
        telphone: '',
        idcard: '',
      })
    }
  },
  InputName(e) {
    let name = e.detail.value;
    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(name))) {
      Toast.fail('姓名输入有误')
    }else{
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
    let idcard = e.detail.value;
    this.setData({
      idcard: idcard
    })
  },
  EditOrAddInfo() { //判断是编辑还是新增
    const that = this
    if(that.data.username == ''){
      Toast.fail('姓名不能为空')
    } else if (that.data.telphone == ''){
      Toast.fail('手机号不能为空')
    }else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.data.idcard))){
      Toast.fail('身份证输入有误')
    }else{
      if (that.data.id != undefined && that.data.id != '') {
        that.editInfo(that.data.id)
      } else {
        that.AddInfo()
      }
    }
    
  },
  editInfo(id) {
    wx.request({
      url: 'https://www.supconit.net/customer/contacts/' + id,
      data: {
        "id": id,
        "idenCard": this.data.idcard,
        "name": this.data.username,
        "phone": this.data.telphone
      },
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res, 'ressssss')
        Toast.success(res.data.msg);
        wx.redirectTo({
          url: '/pages/myContacts/index'    //或者url: '/page/person/goldcoin/index'
        })
      }
    })
  },
  AddInfo() {
    console.log('adddddddddInfoooo')
    wx.request({
      url: 'https://www.supconit.net/customer/contacts',
      data: {
        "customerId": 0,
        "id": 0,
        "idenCard": this.data.idcard,
        "name": this.data.username,
        "phone": this.data.telphone
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
          url: '/pages/myContacts/index'    //或者url: '/page/person/goldcoin/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != undefined) {
      this.setData({
        id: options.id
      })
      this.getinfo(options)
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