// pages/fillOrder/index.js
const moment = require('../../utils/moment.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodType: 1,
    chooseValenceList: [],
    chooseDate: '',
    goodId: '',
    chooseNumber: '',
    goodObject: {},
    overlay: true,
    chooseValenceArray: [],
    salesList: [],
    matchSalesList: [],
    payablePrice: 0,
    priceOrder: 0,
    realTimePriceList: [],
    checkInStartDatePopupShow: false,
    checkInStartDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter: function(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    // 离店popup
    checkInEndDatePopupShow: false,
    checkInEndDate: (new Date().getTime()) + (24 * 60 * 60 * 1000),
    // 间隔天数
    daysDetween: 1,
    // 房间数
    roomNumber: 1,

    
    // 费用明细
    costDetailShow: true,
    // 门票数量
    // 门票日期
    ticketOrderDate: new Date().getTime(),
    ticketOrderDatePopupShow: false,
    ticketNumber: 1,
    // 游玩人
    playerArray: [{
        name: '',
        idcard: '',
        phone: '',
        IdCardType: '身份证',
      }

    ],
    palyerIndex: 0,
    columns: ['身份证', '港澳台通行证', '护照'],
    idCardTypePopShow: false,
    currentPlayer: 0,
    chooseContact: false,
    chooseContactList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let optionchooseValenceAray = JSON.parse(options.choooseValenceList)
    let shijianc = Date.parse(optionchooseValenceAray[0].day)
    optionchooseValenceAray.forEach(function(item) {
      item['price'] = item.amount.substr(1); //删除第一个字符
      item['dailyDate'] = Date.parse(item.day)
    })
    var chooseValenceAray = optionchooseValenceAray
    var statDate;
    var endDate;
    var ticketOrderTime;
    if (chooseValenceAray.length > 1) {
      chooseValenceAray.forEach(function(item, index) {
        item['dailyDate'] = parseInt(item.dailyDate);
        if (index == 0) {
          statDate = item
        } else {
          endDate = item
        }
      })
      this.setData({
        goodId: options.goodId,
        checkInStartDate: statDate.dailyDate,
        checkInEndDate: endDate.dailyDate,
        roomNumber: parseInt(options.chooseNumber)
      });
      this.count()
    } else {
      this.setData({
        goodId: options.goodId,
        ticketOrderDate: chooseValenceAray[0].dailyDate,
        ticketNumber: parseInt(options.chooseNumber)
      });

    }




    this.getGoodDetail(this.data.goodId);
    this.getList()
  },


  /**
   * 匹配价态
   */
  getBatchValence() {
    let betweenDateArray = this.getBetweenDateStr(moment(this.data.checkInStartDate).format('YYYY-MM-DD'), moment(this.data.checkInEndDate).format('YYYY-MM-DD'))
    let needDateArray = betweenDateArray.slice(0, -1);
    let ValenceArray = [];
    for (var i = 0; i < needDateArray.length; i++) {
      let matchPriceArray = this.data.goodObject.productDailyList;
      matchPriceArray.forEach(function(item) {
        if (needDateArray[i] == moment(parseInt(item.dailyDate)).format('YYYY-MM-DD')) {
          item['date'] = moment(parseInt(item.dailyDate)).format('YYYY-MM-DD')
          ValenceArray.push(item);
        }
      })
    }
    this.setData({
      chooseValenceArray: ValenceArray
    })
  },
  /**
   * 计算价格，保存基本订单信息
   */
  calculatePrice() {
    var that = this;
    let price = 0;
    let orderPrice = 0;
    // debugger
    let realTimePriceArray = []
    switch (this.data.goodType) {
      case 1:
        let chooseValenceArray = that.data.chooseValenceArray;
        if (that.data.salesList.length > 0) {
          let matcSaleshArray = that.data.salesList;
          chooseValenceArray.forEach(function(chooseValenceArrayItem) {
            let contactSales = matcSaleshArray.filter(function(item) {
              return parseInt(item.beginDate) <= parseInt(chooseValenceArrayItem.dailyDate) && parseInt(chooseValenceArrayItem.dailyDate) <= parseInt(item.endDate);
            });
            that.setData({
              matchSalesList: contactSales
            })
            console.log(contactSales);
            //匹配各个日期期间存在的促销活动
            if (contactSales.length >= 0) {
              let percentage = parseInt(contactSales[0].ruleJson.discount);
              let floatPercent = percentage / 100.00;
              switch (contactSales[0].type) {
                case 0:
                  if (chooseValenceArrayItem.price) {
                    realTimePriceArray.push((chooseValenceArrayItem.price) * floatPercent * that.data.roomNumber)
                    price += chooseValenceArrayItem.price * that.data.roomNumber
                    orderPrice += (chooseValenceArrayItem.price) * floatPercent * that.data.roomNumber;
                  }
                  that.setData({
                    payablePrice: price.toFixed(2),
                    priceOrder: orderPrice.toFixed(2),
                    realTimePriceList: realTimePriceArray
                  })
                  break;
                case 1:
                  if (chooseValenceArrayItem.price) {
                    price += chooseValenceArrayItem.price * that.data.roomNumber;
                    let roomNuber = that.data.roomNumber;
                    //匹配满足哪一个满减规则，若多个规则都符合则挑选最大的
                    console.log(contactSales)
                    let matchRuleJson = contactSales[0].ruleJson
                    let contactFullReduction = matchRuleJson.filter(function(item) {
                      return (chooseValenceArrayItem.price * roomNuber) >= item.full
                    });
                    if (contactFullReduction.length > 0) {
                      console.log(contactFullReduction);
                      //寻找满足要求最大的一条满减规则,通过排序获得，取出第一条
                      contactFullReduction.sort(function(a, b) {
                        return b.full - a.full
                      });
                      console.log(contactFullReduction);
                      orderPrice += (chooseValenceArrayItem.price * that.data.roomNumber) - contactFullReduction[0].reduction
                      realTimePriceArray.push((chooseValenceArrayItem.price * that.data.roomNumber) - contactFullReduction[0].reduction)

                    } else {
                      orderPrice += chooseValenceArrayItem.price * that.data.roomNumber;
                      realTimePriceArray.push(chooseValenceArrayItem.price * that.data.roomNumber);

                    }

                  }
                  that.setData({
                    payablePrice: price.toFixed(2),
                    priceOrder: orderPrice.toFixed(2),
                    realTimePriceList: realTimePriceArray
                  })
                  break;
              }
            }

          })
        } else {
          chooseValenceArray.forEach(function(item) {
            if (item.price) {
              price += item.price * that.data.roomNumber
              realTimePriceArray.push(item.price * that.data.roomNumber)
            }
          });
          that.setData({
            payablePrice: price,
            priceOrder: price,
            realTimePriceList: realTimePriceArray
          })
        }
        break;
      case 2:
        let ValenceArray = that.data.goodObject.productDailyList;
        console.log(ValenceArray);
        let ValenceDate = moment(that.data.ticketOrderDate).format("YYYY-MM-DD");
        //获取选择时间的时间戳，便于对比是否在促销活动存在期间此刻已是时间戳不需要再修改格式
        let ValenceDateTimeStamp = that.data.ticketOrderDate;
        let matchdaily = ValenceArray.filter(function(item) {
          return moment(parseInt(item.dailyDate)).format("YYYY-MM-DD") == ValenceDate
        });
        if (matchdaily.length > 0) {
          let matcSaleshArray = that.data.salesList;
          let contactSales = matcSaleshArray.filter(function(item) {
            return parseInt(item.beginDate) <= ValenceDateTimeStamp && ValenceDateTimeStamp <= parseInt(item.endDate);
          });

         that.setData({
           matchSalesList: contactSales,
         })
          let matchdailyPrice = matchdaily[0].price;
          // 折前价格
          let discountPrice = matchdailyPrice * that.data.ticketNumber
          if (contactSales.length > 0) {
            switch (contactSales[0].type) {
              case 0:
                let percentage = parseInt(contactSales[0].ruleJson.discount);
                let floatPercent = percentage / 100.00;
                realTimePriceArray.push((matchdailyPrice * that.data.ticketNumber) * floatPercent.toFixed(2));
                //  折后价格
                let disCountedPrice = discountPrice * floatPercent
                that.setData({
                
                  payablePrice: discountPrice.toFixed(2),
                  priceOrder: disCountedPrice.toFixed(2),
                  realTimePriceList: realTimePriceArray
                })

                break;
              case 1:
                let ticketNuber = that.data.ticketNumber;

                let matchRuleJson = contactSales[0].ruleJson
                let contactFullReduction = matchRuleJson.filter(function(item) {
                  return (matchdailyPrice * ticketNuber) >= item.full
                });
                if (contactFullReduction.length > 0) {
                  console.log(contactFullReduction);
                  //寻找满足要求最大的一条满减规则,通过排序获得，取出第一条
                  contactFullReduction.sort(function(a, b) {
                    return b.full - a.full
                  });
                  that.setData({
                    payablePrice: discountPrice.toFixed(2),
                    priceOrder: (discountPrice.toFixed(2)) - contactFullReduction[0].reduction,
                    realTimePriceList: realTimePriceArray
                  })

                } else {
                  realTimePriceArray.push(discountPrice).toFixed(2);
                  that.setData({
                    payablePrice: discountPrice.toFixed(2),
                    priceOrder: discountPrice.toFixed(2),
                    realTimePriceList: realTimePriceArray
                  })


                }
                break;

            }
          } else {
            realTimePriceArray.push((matchdailyPrice * that.data.ticketNumber).toFixed(2));
            that.setData({
              payablePrice: (matchdailyPrice * that.data.ticketNumber).toFixed(2),
              priceOrder: (matchdailyPrice * that.data.ticketNumber).toFixed(2),
              realTimePriceList: realTimePriceArray,
              ticketDaliyprice: matchdailyPrice
            })

          }

        }
        break;
    }
    console.log(that.data.matchSalesList)
  },



  /**
   * 相隔几晚
   */
  count() {
    var date1 = new Date(this.data.checkInStartDate);
    var date2 = new Date(this.data.checkInEndDate);
    var date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
    /*不用考虑闰年否*/
    // alert("相差" + date + "天");
    this.setData({
      daysDetween: Math.ceil(date)
    })

  },
  /**
   * 获取两个日期间的所有日期
   */
  getBetweenDateStr(start, end) {
    var result = [];
    var beginDay = start.split("-");
    var endDay = end.split("-");
    var diffDay = new Date();
    var dateList = new Array;
    var i = 0;
    diffDay.setDate(beginDay[2]);
    diffDay.setMonth(beginDay[1] - 1);
    diffDay.setFullYear(beginDay[0]);
    result.push(start);
    while (i == 0) {
      var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
      diffDay.setTime(countDay);
      dateList[2] = diffDay.getDate();
      dateList[1] = diffDay.getMonth() + 1;
      dateList[0] = diffDay.getFullYear();
      if (String(dateList[1]).length == 1) {
        dateList[1] = "0" + dateList[1]
      };
      if (String(dateList[2]).length == 1) {
        dateList[2] = "0" + dateList[2]
      };
      result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
      if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {
        i = 1;
      }
    };
    // console.log(result);
    return result;
  },
  /**
   * 获取商品详情
   */
  getGoodDetail(goodId) {
    var that = this;

    wx.request({
      url: 'https://www.supconit.net/search/aptitude/byProductId/' + goodId,
      data: '',
      // header: {
      //   // 'cookie': wx.getStorageSync("sessionid") //读取cookie
      // },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        let qualificationJson = res.data.obj.hits[0]
        let goodJson = qualificationJson._source.productList[0];
        console.log(goodJson)
        let type = 0;
        switch (res.data.obj.hits[0]._type) {
          case 'hotel':
            type = 1;
            break
          case 'scenic':
            type = 2;
            break;
        }

        let salesArray = goodJson.saleList;
        if (salesArray !== '') {
          salesArray.forEach(function(item) {
            item['ruleJson'] = JSON.parse(item.ruleJson);
          });
        }
        that.setData({
          goodObject: goodJson,
          goodType: type,
          salesList: salesArray
        })

        if (type == 1) {
          that.getBatchValence();
        }

        that.calculatePrice()
      }
    })
  },












  checkInStartDatePopupShow: function() {
    this.setData({
      checkInStartDatePopupShow: true
    })
  },
  // 入住开始时间确定
  sureCheckInStartDate: function(event) {
    var that = this;
    that.setData({
      checkInStartDate: event.detail,
      checkInStartDatePopupShow: false
    })

 
    that.count();
    that.getBatchValence();
    that.calculatePrice();
  },
  // 取消选择开始时间
  cancelCheckInStartDate() {
    this.setData({
      checkInStartDatePopupShow: false
    })
  },
  // 关闭开始时间弹窗
  closeCheckInStartDatePopup() {
    this.setData({
      checkInStartDatePopupShow: false
    })
  },
  // 调起离店popup
  checkInEndDatePopupShow() {
    this.setData({
      checkInEndDatePopupShow: true
    })
  },
  // 离店开始时间确定
  sureCheckInEndDate: function(event) {
    var that = this;
    that.setData({
      checkInEndDate: event.detail,
      checkInEndDatePopupShow: false
    })

    that.count();
    that.getBatchValence();
    that.calculatePrice();
  },
  // 取消选择开始时间
  cancelCheckInEndDate() {
    this.setData({
      checkInEndDatePopupShow: false
    })
  },
  // 关闭离店时间选择
  closeCheckInEndDatePopup() {
    this.setData({
      checkInEndDatePopupShow: false
    })
  },
  // 增加房间数
  addRoomNumber() {
    let currentNumber = this.data.roomNumber
    this.setData({
      roomNumber: currentNumber + 1
    })
    this.calculatePrice()
  },
  // 减少房间数
  minusRoomNUmber() {
    let currentNumber = this.data.roomNumber
    this.setData({
      roomNumber: currentNumber - 1
    })
    this.calculatePrice()
  },
  // 增加联系人
  addContactNumber() {
    let currentContactArray = this.data.contactArray;
    var addCOntactJson = {};
    addCOntactJson['name'] = '';
    addCOntactJson[' phone'] = '';
    addCOntactJson[' IdCardType'] = '身份证';
    addCOntactJson['  idcard'] = '';

    currentContactArray.push(addCOntactJson);
    this.setData({
      contactArray: currentContactArray
    })
  },
  
  // 选择联系人
  chooseContacts(e) {
    let palyerIndex = e.currentTarget.dataset.index;
    this.setData({
      chooseContact: true,
      palyerIndex: palyerIndex
    })
  },

  chooseContactonClose() {
    this.setData({
      chooseContact: false
    })
  },
  chooseThisContact(e) {
    var that = this;
    console.log(e.currentTarget.dataset);
    let ind = e.currentTarget.dataset.index;
    let currentContactList = that.data.chooseContactList;
    debugger
    for (var ContactI = 0; ContactI < currentContactList.length; ContactI++){
      if (ind == ContactI){
        currentContactList[ContactI].select=true
      }else{
        currentContactList[ContactI].select = false
      }
    }
    let currenrPlayerArray = that.data.playerArray;

    currenrPlayerArray.forEach(function(PlayerItem, PlayerIndex) {
      if (PlayerIndex == that.data.palyerIndex) {
        PlayerItem['name'] = e.currentTarget.dataset.name,
          PlayerItem['phone'] = e.currentTarget.dataset.phone,
          PlayerItem['idcard'] = e.currentTarget.dataset.idcard
      }
    })

    that.setData({
      chooseContactList: currentContactList,
      playerArray: currenrPlayerArray,
      chooseContact: false,

    })
  },
  // 费用明细弹出层open
  costDetailShowOpen() {
    this.setData({
      costDetailShow: true
    })
  },
  // // 费用明细弹出层close
  costDetailOnClose() {
    this.setData({
      costDetailShow: false
    })
  },
  //门票日期选择
  openticketOrderDatePopup() {
    this.setData({
      ticketOrderDatePopupShow: true
    })

  },
  cancelTicketOrderDateDate() {
    this.setData({
      ticketOrderDatePopupShow: false
    })
  },
  closeTicketOrderDatePopup() {
    this.setData({
      ticketOrderDatePopupShow: false
    })
  },
  //  确定日期选择
  sureTicketOrderDate(e) {
    var that = this;
    that.setData({
      ticketOrderDate: e.detail,
      ticketOrderDatePopupShow: false
    })
    that.calculatePrice();
  },

  // 门票数量加
  addTicketNumber() {
    this.setData({
      ticketNumber: this.data.ticketNumber + 1
    })
    this.calculatePrice();
  },
  // 门票数量减
  minusTicketNUmber() {
    this.setData({
      ticketNumber: this.data.ticketNumber - 1
    })
    this.calculatePrice();
  },
  // 游玩人证件类型关闭
  chooseIdTypeonClose(e) {

    this.setData({
      idCardTypePopShow: true,
    })
  },

  openThisChooseType(e) {

    this.setData({
      idCardTypePopShow: true,
      currentPlayer: e.currentTarget.dataset.index
    })
    console.log(this.data.currentPlayer)
  },
  // 证件类型选择
  IdCardTypeonChange(e) {
    let that = this;
    console.log(e);
    let index = that.data.currentPlayer;
    let value = e.detail.value;
    let currentplayerArray = that.data.playerArray;
    currentplayerArray.forEach(function(item, ind) {
      if (ind == index) {
        item['IdCardType'] = value
      }
    })
    that.setData({
      playerArray: currentplayerArray,
      idCardTypePopShow: false,
    })
    console.log(that.data.currentPlayer)

  },
  // 添加游玩人
  addPlayNumber() {

    let currentplayrArray = this.data.playerArray;
    var playerJson = {};
    playerJson['name'] = '';
    playerJson['phoneNumber'] = '';
    playerJson['IdCardNumber'] = '',
      playerJson['IdCardType'] = '身份证',
      currentplayrArray.push(playerJson);
    this.setData({
      playerArray: currentplayrArray
    })
  },
  // 删除当前游玩人
  deleteThisPlayer(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let currentplayerArray = this.data.playerArray;
    if (currentplayerArray.length <= 1) {
      wx.showToast({
        title: "需一位游玩人",
        image: '/asset/images/warm1.png', //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 

      })
    } else {
      currentplayerArray.splice(index, 1);
      this.setData({
        playerArray: currentplayerArray
      })
    }
  },
  /**
   * 姓名输入
   */
  nameInput(e) {
    console.log(e);
    let inputChangePlayerIndex = e.currentTarget.dataset.index;
    let currentPlayerArray = this.data.playerArray;
    currentPlayerArray.forEach(function(palyerItem, playerIndex) {
      if (inputChangePlayerIndex == playerIndex) {
        palyerItem['name'] = e.detail.value
      }
    })
    this.setData({
      playerArray: currentPlayerArray
    })

  },
  /**
   * 电话输入
   */
  phoneInput(e) {
    console.log(e);
    let inputChangePlayerIndex = e.currentTarget.dataset.index;
    let currentPlayerArray = this.data.playerArray;
    currentPlayerArray.forEach(function(palyerItem, playerIndex) {
      if (inputChangePlayerIndex == playerIndex) {
        palyerItem['phone'] = e.detail.value
      }
    })
    this.setData({
      playerArray: currentPlayerArray
    })
    console.log(this.data.playerArray)
  },
  /**
   * 身份证输入
   */
  IdCardInput(e) {
    console.log(e);
    let inputChangePlayerIndex = e.currentTarget.dataset.index;
    let currentPlayerArray = this.data.playerArray;
    currentPlayerArray.forEach(function(palyerItem, playerIndex) {
      if (inputChangePlayerIndex == playerIndex) {
        palyerItem['idcard'] = e.detail.value
      }
    })
    this.setData({
      playerArray: currentPlayerArray
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

  },
  // 获取联系人列表
  getList() { //获取联系人列表
    let that = this;
    wx.request({
      url: 'https://www.supconit.net/customer/contacts/list',
      data: '',
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          chooseContactList: res.data.obj
        })

      }
    })
  },
  /**
   * 保存新的联系人
   */
  saveContact(e) {
    console.log(e);
    var that = this;
    var dataSet = e.currentTarget.dataset;
    let validation ;
    switch(that.data.goodType){
      case 1:
        validation = dataSet.name == '' || dataSet.phone == '' 
      break
case 2:
        validation = dataSet.name == '' || dataSet.phone == '' || dataSet.idenCard == ""
break
    }

  //  debugger
 
    if (validation){
wx.showToast({
  title: '联系人信息不能为空',
})

    } else {
      let params = {};
      params['idenCard'] = dataSet.idcard;
      params['name'] = dataSet.name;
      params['phone'] = dataSet.phone;
      params['IdCardType'] = dataSet.idcardtype;
      wx.request({
        url: 'https://www.supconit.net/customer/contacts',
        data: params,
        header: {
          'cookie': wx.getStorageSync("sessionid") //读取cookie
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          that.setData({
            chooseContactList: res.data.obj
          })
          wx.showToast({
            title: '保存成功',
          })
          that.getList()

        }
      })
    }

  },
  /**
   * 提交订单
   */
  payNow() {
    let parmas = {};
    debugger
    if (this.data.playerArray[0].name !== '' || this.data.playerArray[0].phone !== '' || this.data.playerArray[0].idcard == !'') {
      console.log(this.data.playerArray);
      //拼接联系人
      parmas['contactsJson'] = this.data.playerArray;
      parmas['productId'] = this.data.goodId;
      // parmas['quantity'] = this.chooseValenceArray.length;
      parmas['other'] = '加个鸡腿';
      parmas['price'] = this.data.priceOrder;
      //拼接商品list
      let productArray = [];
      let realTimePriceList = this.data.realTimePriceList;
      // debugger;
      switch (this.data.goodType) {
        case 1:
          let ValenceArray = this.data.chooseValenceArray;
          console.log(ValenceArray);
          ValenceArray.forEach((item, index) => {
            let productItem = {};
            productItem['buyDate'] = moment(new Date()).format('YYYY-MM-DD');
            productItem['realTimePrice'] = this.data.realTimePriceList[index];
            productItem['useDate'] = item.date;
            productItem['quantity'] = this.data.roomNumber;
            productArray.push(productItem);
          });
          parmas['productInfoList'] = productArray;
          parmas['quantity'] = this.data.roomNumber * this.data.chooseValenceArray.length;
          break
        case 2:
        debugger
          console.log(this.data.realTimePriceList)
          let productItem = {};
          productItem['buyDate'] = moment(new Date()).format('YYYY-MM-DD');
          productItem['realTimePrice'] = this.data.realTimePriceList[0];
          productItem['useDate'] = moment(this.data.ticketOrderDate).format('YYYY-MM-DD');
          productItem['quantity'] = this.data.ticketNumber;
          productArray.push(productItem);
          parmas['productInfoList'] = productArray;
          parmas['quantity'] = this.data.ticketNumber;
          break
      };
      wx.request({
        url: 'https://www.supconit.net/order/info/finishOrder',
        data: parmas,
        header: {
          'cookie': wx.getStorageSync("sessionid") //读取cookie
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.data.msg =='操作成功'){
wx.navigateTo({
  // url: '/pages/payment/index?orderId=' + res.data.obj,
  
  url: '/pages/paymentH5/index?orderId=' + res.data.obj + '&cookie=' + wx.getStorageSync("sessionid"),
})
          }
       

        }
      })
      // http.post('/order/info/finishOrder', parmas).then(res => {
      //   console.log(res);
      //   if (res.success) {
      //     this.orderStep = 1;
      //     this.payWrapShow = false;
      //     ScrollTop(0, 0);
      //     this.$refs.orderSwiper.goTo(1, false);
      //     this.orderId = res.obj.id;
      //     this.$store.commit('setcreatorderTime', moment(new Date()).valueOf());
      //     this.computedLastPayTime();
      //   }
      // })
    } else {
      let tips = '';
      switch (this.data.goodType) {
        case 1:
          tips = '联系人不能为空'
          break
        case 2:
          tips = '游玩人不能为空'
          break
      }
      wx.showModal({
        title: '提示',
        content: tips,
      })
    }

  }
})