// pages/historySearch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHome:true,
    gradient:false,
    inputValue:'',
    areaValue:'',
    searckHistoryWords:[
      { 'text': '一日游' }, { 'text': '一日游' }, { 'text': '一日游' }, { 'text': '一日游' }
    ],
    hotWords:[
      {text:'旅游+'},
      { text: '亲子游' },
      { text: '旅游+' },
      { text: '亲子游' },
      { text: '旅游+' },
      { text: '亲子游' },
      { text: '旅游+' },
      { text: '亲子游' },
      { text: '旅游+' },
      { text: '亲子游' },
      ],
    hotWordsShow:[],
    fold:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
this.setData({
  hotWordsShow:this.data.hotWords.slice(0,8),
  inputValue: options.searchValue,
  areaValue: options.area
})
  },
/**
 * 搜索
 */
  onSearch(){
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
    console.log(this.data.inputValue);
    wx.navigateTo({
      url: '/pages/searchResult/index?keyWord=' + this.data.inputValue + '&area=' + this.data.areaValue,
    })
  },
/**
 * 展开
 */
  foldChange(){
    if (this.data.fold){
      this.setData({
        hotWordsShow: this.data.hotWords.slice(0, 8),
        fold: !this.data.fold
      })
    }else{
      this.setData({
        hotWordsShow: this.data.hotWords,
        fold: !this.data.fold
      })
    }
   
  },
/**
 * 清空搜索历史
 */
  clearSearchHistory(){
this.setData({
  searckHistoryWords:[]
})
  },
/**
 * 搜索历史点击
 */
    searchHistorySelect(e){
      let selectValue = e.target.dataset.searchword;
      this.setData({
        inputValue: selectValue
      })
  },
  /**
   * 热门搜索点击
   */
  searchHotSelect(e){
    let selectValue = e.target.dataset.searchword;
    this.setData({
      inputValue: selectValue
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

  }
})