import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recodePage: 1,
    height: 0,
    goodShowArray: [],
    loading: true,
    height:0,
    total:0,
  },
  onClose(event) {
    console.log(event, 'event')
    const {
      position,
      instance
    } = event.detail;
    const that = this
    switch (position) {
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          that.deleteGood(event.target.dataset.id)
          instance.close();
        }).catch(() => {
          instance.close();
        });
        break;
    }
  },
  editInfo() {
    console.log(111111)
    wx.navigateTo({
      url: '/pages/addNewMan/index',
    })
  },
  deleteGood(id) {
    const that = this
    wx.request({
      url: 'https://www.supconit.net/customer/store/' + id,
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'DELETE',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        switch (res.data.code) {
          case 1:
            Toast.success('删除成功');
            that.getGoodList()
            break;
          default:
            Toast.success('删除失败');
        }
      }
    })
  },
  // 获取商品收藏页列表
  getGoodList() {
    let that = this;
    let current = that.data.recodePage ;
    wx.request({
      url: 'https://www.supconit.net/customer/store/page?size=5&current=' + current,
      data: {},
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res, 'resList');

        // let recodesArray = res.data.obj;
        let collectionRecodes = res.data.obj.hits;
        if (collectionRecodes.length > 0) {
          //资质商品列表 计算 最小价格
          collectionRecodes.forEach(item => {
            console.log(item, 'item')
            let itemProductArray = item._source.productList;
            // console.log(itemProductArray);
            let dailPriceArray = [];
            itemProductArray.forEach(goodItem => {
              let priceList = goodItem.productDailyList;
              priceList.forEach((priceDaliyItem) => {
                dailPriceArray.push(priceDaliyItem.price)
              })
              // console.log(dailPriceArray)
              item['minPrice'] = Math.min.apply(null, dailPriceArray);
            })
            item['cover'] = 'http://image.supconit.net' + '/' + item._source.cover.split(',')[0]
          });
          // that.data.goodShowArray.concat(
          that.setData({
            goodShowArray: that.data.goodShowArray.concat(collectionRecodes),
            total: res.data.obj.total,
            loading: false
          })
        } else {
          wx.redirectTo({
            url: '/pages/noRecodes_userCenter/index',
          })
        }

        console.log(that.data.goodShowArray, 'goodShowArray')
      }
    })
  },
  /**
   * 懒加载更多商品
   */
  loadingMoreGood() {
    let currentPage = this.data.recodePage;
    console.log('拼命加载中');
    this.setData({
      recodePage : currentPage+1
    })
    if(this.data.goodShowArray.length<this.data.total){
      this.getGoodList()
    }else{
      console.log('到底啦')
    }
    
  },
  //跳转到商品详情页
  ViewDetails(e) {
    console.log(e, 'navgite')
    wx.navigateTo({
      url: '/pages/DetailsPage/index?id=' + e.target.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var sreenHeight = res.windowHeight;
        that.setData({
          // - 45
          height: res.windowHeight + 'px',
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
    // Dialog.alert({
    //   title: '标题',
    //   message: '弹窗内容'
    // }).then(() => {
    //   // on close
    // });
    this.getGoodList()
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