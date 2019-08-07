// pages/evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDteial: {},
    orderId: '',
    starItem: [
      {seletct: true},
      {
        seletct: false
      },
      {
        seletct: false
      },
      {
        seletct: false
      },
      {
        seletct: false
      }
    ],
    gend:1,
    comment:'',
    tempFilePaths:[],
    uploadResponceArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.getOrderDetail(options.orderId);
    this.setData({
      orderId: options.orderId
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
  /**
   * 星星点击
   */
  lightStar(e){
    var that=this;
console.log(e)
    let index = e.currentTarget.dataset.index;
    let currentStarArray = this.data.starItem;
    currentStarArray.forEach(function(item,ind){
      if (ind>index){
        item.seletct=false
      }else{
        item.seletct = true
      };
      that.setData({
        starItem: currentStarArray,
        gend: index+1

      })
    })

  },
  commentChange(e){
    this.setData({
      comment: e.detail.value
    })
  },
  // 图片上传
  chooseimg: function () {
    var that = this;
    var len = 0;
    if (that.data.tempFilePaths != null) {
      len = that.data.tempFilePaths.length;
    } //获取当前已有的图片
    wx.chooseImage({
      count: 2 - len, //最多还能上传的图片数,这里最多可以上传2张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var tempFilePathsimg = that.data.tempFilePaths
        //获取当前已上传的图片的数组
        var tempFilePathsimgs = tempFilePathsimg.concat(tempFilePaths)
        //把当前上传的数组合并到原来的数组中
        that.setData({
          tempFilePaths: tempFilePathsimgs
        })
        // console.log(tempFilePaths);
        var imgIndex = that.data.tempFilePaths.length;
        // 避免for循环重复上传
        // for (var i = 0; i < that.data.tempFilePaths.length; i++) {
        wx.uploadFile({
          url: 'https://www.supconit.net/maintenance/qiniu',
          filePath: that.data.tempFilePaths[imgIndex - 1],
          name: 'file',
          formData: {
            "msg": "msg"
          },
          // header: {
          //   "Content-Type": "multipart/form-data"
          // },  
          success: function (res) {
            var uploadReult = JSON.parse(res.data).obj;
            let currentUploadResponceArray = that.data.uploadResponceArray;
            currentUploadResponceArray.push(uploadReult[0].key);
            that.setData({
              uploadResponceArray : currentUploadResponceArray
            });
            console.log(that.data.responceImgs)
            //do something  
          }, fail: function (err) {
            console.log(err)
          }
        });
        // }
      },
      fail: function () {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        })

      }
    })
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    console.log(index)
    //所有图片
    var tempFilePaths = this.data.tempFilePaths;
    wx.previewImage({
      //当前显示图片
      current: tempFilePaths[index],
      //所有图片
      urls: tempFilePaths
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var that = this;
    var imgs = that.data.tempFilePaths;
    var currentResponceArray = that.data.uploadResponceArray
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除这张图片吗？',
      success: function (res) {
        if (res.confirm) {
          imgs.splice(index, 1);
          currentResponceArray.splice(index, 1);
          that.setData({
            tempFilePaths: imgs,
            uploadResponceArray: currentResponceArray
          });
          console.log(that.data.uploadResponceArray)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  submitComment(){
let parmas={};
    console.log( );
    parmas['orderId'] = this.data.orderId;
    parmas['score'] = this.data.gend;
    parmas['comment']=this.data.comment;
    parmas['imgUrl'] = this.data.uploadResponceArray.join(',');

  
    wx.request({
      url: 'https://www.supconit.net/order/comment' ,
      data: parmas,
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {

      }
    })
  },
  getOrderDetail(id) {
    var that = this;
    wx.request({
      url: 'https://www.supconit.net/order/info/getById/' + id,
      data: "",
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        let record = res.data.obj;

        record['productSnapshot'] = JSON.parse(record.productSnapshot);
        switch (record.type) {
          case 1:
            record['icon'] = '/asset/images/hotelOrder.png'
            break;
          case 2:
            record['icon'] = '/asset/images/viewOrder.png'
            break;
        }
        console.log(record.productSnapshot)
        if (record['productSnapshot'].productInfoList.length > 1) {
          record['effectiveDate'] = record.productSnapshot.productInfoList[0].useDate + ' 至' + record.productSnapshot[record.productSnapshot.productInfoList.length - 1].useDate
        } else {
          record['effectiveDate'] = record.productSnapshot.productInfoList[0].useDate
        }
        that.setData({
          orderDteial: record
        })
      }
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