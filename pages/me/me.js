// me.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    userinfo : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   console.log(userInfo);
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data);
        var data = res.data;
        // console.log(data.user_id != '');
        if (data.user_id != ''){
          that.setData({
            login: true,
            userinfo: data
          })
        }else{
          that.setData({
            login: false,
            userinfo: ''
          })
        }
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
  
  },
  orderOption: function(){
    var that = this;
    // console.log(that.data.login)
    if (that.data.login){
      // console.log(that.data.login);
      wx.navigateTo({
        url: '/pages/manage/allorder/allorder?userid=' + that.data.userinfo.user_id,
      })
    }else{
      // console.log(that.data.login);
      wx.showToast({
        title: '请先登录',
        duration: 1000,
        image: '/images/icon/me/prompt.png',
        mask: true
      })
    }
  }
})