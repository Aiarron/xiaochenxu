//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    itenImg:[],
    result: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   // console.log(userInfo);
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

  //请求接口
    wx.request({
      url: app.globalData.src+'/Api/Index/coin_index',
      method:'GET',
      dataType:'json',
      success: function (res) {
        that.setData({
          itenImg: res.data.data.banner,
          result: res.data.data.coin_goods_list
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  onPullDownRefresh: function () {
    console.log('onLoad')
  },
  add: function(){
    console.log(22)
  },
  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function (e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  onShareTap: function(){
    console.log(112)
  }
})
