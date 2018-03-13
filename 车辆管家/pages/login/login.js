// pages/logon/logon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhoneLength:false,
    timeOutString:"获取验证码",
    second:60
  },

  //登录
  login: function () {
    wx.navigateBack({
      delta:2
    })
  },

  //手机号输入框监听
  phoneImport: function(res)
  {
    var length1 = res.detail.value.length
    if (length1 == 11)
    {
      this.setData({
        isPhoneLength:true
      })
    }else{
      this.setData({
        isPhoneLength:false
      })
    }
  },
  //获取验证码
  getCode:function()
  {
    if (this.data.isPhoneLength)
    {
      if(this.data.second == 0)
      {
        this.setData({
          timeOutString:"获取验证码",
          isPhoneLength: true
        })
        return;
      }
      else{
        var that = this;
        setTimeout(function()
        {
          var currentSecond = that.data.second
          console.log(currentSecond)
          that.setData({
            isPhoneLength:false,
            second: currentSecond - 1,
            timeOutString: that.data.second+"秒后"
          })
          console.log(that.data.second)
        },1000)
      }

    }else
    {

    }
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
  
  }
})