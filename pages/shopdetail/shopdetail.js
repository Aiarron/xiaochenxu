// shopdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    shop: {},
    cur:'',
    show: false,
    change: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: options.goods_id
    })
    wx.request({
      url: app.globalData.src+'/Api/Goods/goods_detail',
      method: 'POST',
      dataType: 'json',
      data: {
        "goods_id": options.goods_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          shop: res.data.data
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    console.log(that.data.id);
    wx.request({
      url: app.globalData.src+'/Api/Goods/detail_h5',
      method: 'GET',
      dataType: 'json',
      data: {
        "goods_id": that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('########');
        console.log(res)
        console.log('########');
      },
      fail: function (res) {
        console.log(res)
      }
    })
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
  durationChange: function (e) {
    console.log(2111)
    e.detail = { cur: current, source: source }
    this.setData({
      cur: current
    })
  },
  serverModal: function(){
    var that = this;
    this.setData({
      show: !(this.data.show)
    })    
  },
  changeModal: function(){
    var that = this;
    this.setData({
      change: !(that.data.show)
    })
  }
})