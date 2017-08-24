// register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var mobile = wx.getStorageSync('mobile');
    // var pwd = wx.getStorageSync('pwd');
    this.setData({ mobile: mobile });
    // this.setData({ pwd: pwd });
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
  // 获取验证码
  getCode: function(e) {
    console.log(e);
   
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    // wx.setStorageSync('mobile', this.data.mobile);
    console.log(this.data.mobile);
    console.log(reg.test(this.data.mobile))
    if (reg.test(this.data.mobile)){
      wx.request({
        url: app.globalData.src +'/Api/User/getCode',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          mobile: this.data.mobile
        },
        success: function(data){
          console.log(data);
          if (data.data.code == 200 ){
            wx.showToast({
              title: data.data.msg,
              duration: 1000,
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
        fail: function(data){
          console.log(data);
        }
      })
    }else{
      wx.showToast({
        title: '请填写正确的手机号码',
        duration: 1000,
        image: '/images/icon/me/prompt.png',
        mask: true
      })
    }

  },
  inputMobile: function(e){
    console.log(e);
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    // if (e.detail.value.length > 11 || e.detail.value.length < 11 ){
    //   wx.showToast({
    //     title: '请填写11位的手机号码',
    //     duration: 1000,
    //     image: '/images/icon/me/prompt.png',
    //     mask: true
    //   })
    // }else{
    //   if(reg.test(e.detail.value)){

    //   }else{
    //     wx.showToast({
    //       title: '请填写正确的手机号码',
    //       duration: 1000,
    //       image: '/images/icon/me/prompt.png',
    //       mask: true
    //     })
    //   }
    // }
    this.setData({
      mobile: e.detail.value
    })
  },
  onRegister: function(e){
    console.log(e);
    if (e.detail.value.mobile != '' && e.detail.value.code != '' && e.detail.value.password != '' ){
      wx.request({
        url: app.globalData.src +'/Api/User/addUser',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          mobile: e.detail.value.mobile,
          code: e.detail.value.code,
          password: e.detail.value.password
        },
        success: function(data){
          console.log(data);
          if(data.data.code == 200) {
            wx.showToast({
              title: data.data.msg,
              duration: 1000,
              mask: true
            })
            setTimeout(function(){
              wx.navigateTo({
                url: '/pages/login/login'
              })
            },2000)
          }else{
            wx.showToast({
              title: data.data.msg,
              duration: 1000,
              image: '/images/icon/me/prompt.png',
              mask: true
            })
          }
        },
        fail: function(data){
          console.log(data);
        }
      })
    }else{
      wx.showToast({
        title: data.msg,
        duration: 1000,
        image: '/images/icon/me/prompt.png',
        mask: true
      })
    }
  }
})