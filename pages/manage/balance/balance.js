// balance.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (data) {
        console.log(data);
        var data = data.data;
        console.log(data.token);
        that.setData({
          userinfo: data
        })
        wx.request({
          url: app.globalData.src + '/Api/Wallet/record',
          method: 'POST',
          dataType: 'json',
          data: {
            'page': 1,
            'token': data.token
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(data){
            console.log(data);
            var result = data.data;
            console.log(result);
            if(result.code == 200){
              that.setData({
                data: result.data
              })
            }
          },
          fail: function(data){
            console.log(data);
          }
        })
      }
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