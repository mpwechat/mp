 // pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    allOrderPages:0,
    currntPageRecods:[],
    allOrderRecods:[],
   untravelRecods:[],
   finishRecods:[],
    loading:true,
    hasRecord:false
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var sreenHeight = res.windowHeight;
        that.setData({
          // - 45
          height: res.windowHeight  + 'px',
        })
      }
    })
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
  getDetail(e){
console.log(e)
  },
  //评价
  evaluation(e){
    console.log(e)
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/evaluation/index?orderId=' + orderId,
    })
  },

   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getAllorders()
  },
  /**
 * 滚动加载
 */
  loadMoreAllOrder() {
    console.log('滚动加载所有订单中');
    let currentPages = this.data.allOrderPages;
    this.setData({
      allOrderPages: currentPages+1
    })
    this.getAllorders()
  },
/**
 * 获取用户订单
 */
getAllorders(){
  let parmas={};
 
  var that = this;
  wx.request({
    url: 'https://www.supconit.net/order/info/page?size=6&current=' + this.data.allOrderPages,
    data: parmas,
    header: {
      'cookie': wx.getStorageSync("sessionid") //读取cookie
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      
      console.log(res);
      switch (res.statusCode){
        case 401:
        wx.showToast({
          title: res.data.message,

        })
        setTimeout(function(){
          wx.setStorageSync('router', '/pages/order/index'); //将userIdEnc存入本地缓存
          wx.navigateTo({
            url: '/pages/bindPhone/index',
          })
        },1500)
        break;
        case 200:

          let recodesArray = res.data.obj.records;
          if (recodesArray.length>0){
            recodesArray.forEach(function (item, index) {
              switch (item.type) {
                case 1:
                  item['icon'] = '/asset/images/hotelOrder.png'
                  break;
                case 2:
                  item['icon'] = '/asset/images/viewOrder.png'
                  break;
              }
              item['productSnapshot'] = JSON.parse(item.productSnapshot);
              console.log(item.productSnapshot)
              if (item['productSnapshot'].productInfoList.length > 1) {
                item['effectiveDate'] = item.productSnapshot.productInfoList[0].useDate + ' 至' + item.productSnapshot[item.productSnapshot.productInfoList.length - 1].useDate
              } else {
                item['effectiveDate'] = item.productSnapshot.productInfoList[0].useDate
              }
            })
            that.setData({
              currntPageRecods: recodesArray,
              loading: false,
              hasRecord:true,
            })

            that.judageSate()
            break
          }else{
            that.setData({
              hasRecord: false,
              loading: false,
            })
            // wx.redirectTo({
            //   url: '/pages/noRecods/index',
            // })
          }
          
      }

         
    },
    fail: function () {
      wx.showToast({
        title: '暂未登录，即将跳转至登录页',
      })
      setTimeout(function () {
        wx.setStorageSync('router', '/pages/order/index'); //将userIdEnc存入本地缓存
        wx.navigateTo({
          url: '/pages/bindPhone/index',
        })
      }, 1500)
    },
    complete: function (res) { },
  })

},
// 判断订单状态
judageSate(){
  var that=this;
  let fliterRecodesArray = this.data.currntPageRecods;
  var currentallOrderRecods = that.data.allOrderRecods;
  var currentuntravelRecods = that.data.untravelRecods;
  var currentfinishRecods = that.data.finishRecods;
  fliterRecodesArray.forEach(function (item, index) {
    wx.request({
      url: 'https://www.supconit.net/runtime/process-instances/' + item.processInstanceId,
      data: "",
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        currentallOrderRecods.push(item)
        if (res.data.completed){
          item['completed']=true;
          currentfinishRecods.push(item)
        }else{
          item['completed'] = false;
          currentuntravelRecods.push(item)
        };
        that.setData({
          allOrderRecods: currentallOrderRecods,
          untravelRecods: currentuntravelRecods,
          finishRecods: currentfinishRecods
        })
        
      }
     
    })
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

})