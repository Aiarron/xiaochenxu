// mes.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    login:false,
    userinfo:{},
    data: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data);
        var data = res.data;
        if (data.user_id != '') {
          that.setData({
            login: true,
            userinfo: data
          })
          console.log(data.token);

          wx.request({
            url: app.globalData.src + '/Api/UserInfo/system_message',
            method: 'POST',
            dataType: 'json',
            data: {
              'page': 1,
              'token': data.token
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
              console.log(data);
              if(data.data.code == 200){
                console.log(data.data.data)
                that.setData({
                  data: data.data.data
                })
              } else if (data.data.code == 10000){
                wx.showToast({
                  title: data.data.msg,
                  duration: 1000,
                  image: '/images/icon/me/prompt.png',
                  mask: true
                })
              }else{
                wx.showToast({
                  title: data.data.msg,
                  duration: 1000,
                  image: '/images/icon/me/prompt.png',
                  mask: true
                })
              }
            },
            fail: function (data) {
              console.log(data);
            }
          })

        } else {
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
  
  }
})