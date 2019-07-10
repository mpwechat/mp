// pages/parkwechatmap/parkwechatmap.js
//获取应用实例
// var amapFile = require('../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: '',
    latitude: '',
    longitude: '',
    iconPath: '../../asset/images/shadow.png',
    typeIcon: '../../asset/images/icon_park.png',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular: false,
    current: 0,
    beback: false,
    operator: '我的位置',
    maskshow: false,
    markDetail: {},
    swiperShow: false,
    aniStyle: true,    //动画效果，默认slideup 

    mapObj: {
      lng: '113.324520',
      lat: '23.099994',
      scale: '13',
      name:'',
      address:'',
      markers: [{
        iconPath: "../../asset/images/shadow.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        callout: {
          content: '杭州市上城区古墩路583号',
          bgColor: "#409EFF",
          borderWidth: 0,
          borderRadius: 20,
          padding: 10,
          display: "ALWAYS",
          textAlign: "left",
          color: '#fff'
        }
      }],

    },
  },
  /**
   * 地图mark点击事件
   */
  makertap: function (e) {
    console.log(e)
    // debugger
    var id = e.markerId;
    console.log(typeof (id))
    var that = this;
    console.log(e.markerId);
    var recordsArray = that.data.showMarkerInfoList;
    that.changeMarkerColor(that.data.markers, id);
    let markDetail = recordsArray[id];

    that.setData({
      markDetail: markDetail,
      swiperShow: false,           //蒙层显示
      aniStyle: true　　　　　　　　//设置动画效果为slideup
    });

    wx.setStorage({//存储到本地
      key: 'location',
      data: {
        latitude: that.data.markers[id].latitude,
        longitude: that.data.markers[id].longitude
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options, 'options')
    let qualificationObj = JSON.parse(options.a)
    console.log(qualificationObj, 'qualificationObj')
    let currentMapObject = that.data.mapObj;
      currentMapObject['lng'] = qualificationObj.amapY,
        currentMapObject['name'] = qualificationObj.name,
        currentMapObject['address'] = qualificationObj.address,
      currentMapObject['lat'] = qualificationObj.amapX,
      currentMapObject.markers[0]['latitude'] = qualificationObj.amapX;
      currentMapObject.markers[0]['longitude'] = qualificationObj.amapY;
      currentMapObject.markers[0]['callout']['content'] = qualificationObj.address;
      that.setData({
        qualificationObj: qualificationObj,
        productList: qualificationObj['productList'],
        mapObj: currentMapObject
      })
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
  changeMarkerColor: function (data, i) {
    var that = this;
    var markersArray = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        // data[j].iconPath = "../../images/pt_active.png";
        data[j].callout.bgColor = '#1890ff'
      } else {
        // data[j].iconPath = that.data.iconPath;
        data[j].callout.bgColor = that.setCalloutColor(data[j].isOp, data[j].currentNum, data[j].berthNum)

      }
      markersArray.push(data[j]);
    }
    console.log(markersArray)
    that.setData({
      markers: markersArray
    });
  },
  /**
   * 营业 0 1状态转换为文字描述
   */
  judeState: function (state) {
    var stateDiscribe = '';
    var isOpen;
    if (state == 0) {
      stateDiscribe = '暂停营业',
        isOpen = false;
    } else {
      stateDiscribe = '正常营业',
        isOpen = true
    }
    return {
      openState: stateDiscribe,
      isOpen: isOpen,
    }
  },
  /**
   * 容量饱和度判断
   */
  saturation: function (number, totalNumber) {
    var proportion = number / totalNumber;
    var crowd;
    if (proportion > 0.75) {
      crowd = true;
    } else {
      crowd = false;
    }
    return crowd;
  },
  // 设置气泡颜色
  setCalloutColor(state, number, totalNumber) {
    let bgColor = '';
    if (state == 0) {
      bgColor = '#c3cad4'
    } else {
      var proportion = number / totalNumber;
      if (proportion >= 0.75) {
        bgColor = '#e10000'
      } else if (0.5 <= proportion && proportion < 0.75) {
        bgColor = '#ee7d31'
      } else if (0.35 <= proportion && proportion < 0.5) {
        bgColor = '#ffc000'
      } else {
        bgColor = '#00b050'
      }
    }
    return bgColor;

  },
  // 获取目标位置打开原生地图
  /**
    * 调起地图导航
    */
  getRounte: function (e) {
    var dataset = e.currentTarget.dataset;
    wx.openLocation({ //出发wx.openLocation API
      latitude: dataset.lat, //坐标纬度（从地图获取坐标）
      longitude: dataset.lng, //坐标经度（从地图获取坐标）
      name: dataset.name, //打开后显示的地址名称
      address: dataset.address //打开后显示的地址汉字
    })
  },
  /**
   * swiper滑动事件
   */
  bindChange: function (e) {
    console.log(e);
    console.log(e.detail.current);
    var currentIndex = e.detail.current
    this.changeMarkerColor(this.data.markers, currentIndex);
    this.setData({
      latitude: this.data.markers[currentIndex].latitude,
      longitude: this.data.markers[currentIndex].longitude,
    });
    wx.setStorage({//存储到本地
      key: 'location',
      data: {
        latitude: this.data.markers[currentIndex].latitude,
        longitude: this.data.markers[currentIndex].longitude
      }
    })

  },
  /**
  * 操作控制地图中心点
  */
  locationoption: function () {
    var that = this;
    // var myAmapFun = new amapFile.AMapWX({ key: '17be3510c9b1f9cd5f197c7a2a8b27a8' });
    console.log(33)
    var currentOption = that.data.operator;
    if (currentOption == '我的位置') {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          // wx.openLocation({
          //   latitude,
          //   longitude,
          //   scale: 20
          // })
          that.setData({
            latitude: latitude,
            longitude: longitude,
            beback: true,
            operator: '返回'
          })
        }, fail: function (info) {
          //失败回调
          console.log(info)
          //   wx.showToast({
          //     title: "获取不到GPS定位",
          //     image: '/images/error.png',//自定义图标的本地路径，image 的优先级高于 icon
          //     duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
          //     mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false
          // })
          wx.showModal({
            title: '提示',
            content: '需要获取您的地理位置，请确认，否则部分功能将无法使用',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确认')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
      // myAmapFun.getRegeo({
      //   success: (res) => {
      //     var address = res[0].regeocodeData.aois[0].location;
      //     var addressArray = address.split(",");
      //     console.log(addressArray)
      //     that.setData({
      //       latitude: addressArray[1],
      //       longitude: addressArray[0],
      //       beback: true,
      //       operator: '返回'
      //     })
      //   },
      //   fail: function (info) {
      //     //失败回调
      //     console.log(info)
      //   //   wx.showToast({
      //   //     title: "获取不到GPS定位",
      //   //     image: '/images/error.png',//自定义图标的本地路径，image 的优先级高于 icon
      //   //     duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
      //   //     mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false
      //   // })
      //     wx.showModal({
      //       title: '提示',
      //       content: '无法获取GPS定位',
      //       success: function (res) {
      //         if (res.confirm) {
      //           console.log('用户点击确认')
      //         } else if (res.cancel) {
      //           console.log('用户点击取消')
      //         }
      //       }
      //     })
      //   }
      // })
    } else {
      wx.getStorage({
        key: 'location',
        success: function (res) {
          that.setData({
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            operator: '我的位置',
          })
        },

      })
    }
  },
  goList: function () {
    wx.navigateTo({ url: '../../pages/parkList/parkList' });

  },
  regionchange(e) {
    console.log(e.type)
  },
})