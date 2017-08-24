// login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onLogin: function(e){
    // console.log(e.detail.value);
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (e.detail.value.mobile == '' || e.detail.value.password == ''){
      if (e.detail.value.mobile == ''){
        wx.showToast({
          title: '请输入手机号码',
          duration: 1000,
          image: '/images/icon/me/prompt.png',
          mask: true
        })
      }else{
        wx.showToast({
          title: '请输入密码',
          duration: 1000,
          image: '/images/icon/me/prompt.png',
          mask: true
        })
      }
    } else{
      if (!(reg.test(e.detail.value.mobile))){
        wx.showToast({
          title: '请输入11位的手机号码',
          duration: 1000,
          image: '/images/icon/me/prompt.png',
          mask: true
        })
      } else if (e.detail.value.password.length < 6 || e.detail.value.password.length > 20 ){
        wx.showToast({
          title: '请输入6-20位的密码',
          duration: 1000,
          image: '/images/icon/me/prompt.png',
          mask: true
        })
      }else{
        wx.login({
          success: function (res) {
            console.log(res);
            if (res.code) {
              wx.request({
                url: app.globalData.src+'/Api/User/login',
                method: 'POST',
                dataType: 'json',
                data: e.detail.value,
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                  console.log(data);
                  if(data.data.code == 200){
                    //存储在本地
                    wx.setStorage({
                      key: "userInfo",
                      data: data.data.data
                    })
                    wx.showToast({
                      title: data.data.msg,
                      duration: 1000,
                      mask: true
                    })

                    //跳转页面
                    // console.log(data.data.data.user_id,'#####');

                    wx.switchTab({
                      url: '/pages/me/me'
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
                  wx.showToast({
                    title: data.data.msg,
                    duration: 1000,
                    image: '/images/icon/me/prompt.png',
                    mask: true
                  })
                }
              })
            }
          }
        })
      }
      
    }
    
  }
})