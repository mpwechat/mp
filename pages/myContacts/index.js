import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    manList: ''//联系人列表
  },
  onClose(event) {
    console.log(event)
    const that = this
    const { position, instance } = event.detail;
    switch (position) {
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          console.log('shanchu')
          that.deleteMan(event.target.dataset.id)
          instance.close();
        })
        break;
    }
  },
  deleteMan(id){
    const that = this
    wx.request({
      url: 'https://www.supconit.net/customer/contacts/' + id,
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'DELETE',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        switch (res.data.code) {
          case 1:
            Toast.success('删除成功');
            that.getList()
            break;
          default:
            Toast.success('删除失败');
        }
      }
    })
  },
  editInfo(e) {
    console.log(e,'wwww')
    wx.redirectTo({
      url: '/pages/addNewMan/index?id=' + e.target.dataset.id,
    })
  },
  addNewContanct(){
    wx.redirectTo({
      url: '/pages/addNewMan/index',
    })
  },
  getList() { //获取联系人列表
    let that = this;
    let page = that.data.recordPage
    wx.request({
      url: 'https://www.supconit.net/customer/contacts/list',
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        switch (res.statusCode) {
          case 200:
            // that.manList = res.data.obj
            that.setData({
              manList: res.data.obj //联系人列表赋值
            })
            break;
          case 401:
            wx.showToast({
              title: '暂未登录，即将跳转至登录页',
            })
            wx.navigateTo({
              url: '/pages/bindPhone/index',
            })
            break;
        }
      },
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
    this.getList()
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