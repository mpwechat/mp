import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    goodShowArray: [
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/food3.png' },
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/food4.png' },
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/hot4.png' },
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/hotel_list1.png' },
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/food3.png' },
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/food4.png' },
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/hot4.png' },
      { goodName: '海南三亚五日四晚跟团游', gooddiscribe: '2019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐20192019年特推旅游套餐2019年特推旅游套餐2019年特推旅游套餐2019', goodprice: '489.22', img: 'http://image.supconit.net/hotel_list1.png' }
    ]
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        }).catch(()=>{
          instance.close();
        });
        break;
    }
  },
  editInfo(){
    console.log(111111)
    wx.navigateTo({
      url: '/pages/addNewMan/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Dialog.alert({
    //   title: '标题',
    //   message: '弹窗内容'
    // }).then(() => {
    //   // on close
    // });
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