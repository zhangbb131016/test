// pages/loginmode/loginmode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toPhoneLogin:function()
  {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  wxLogin: function (e)
  {
    var appId = ''
    var sessionKey = ""

    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv

    wx.request({
      url: getApp().globalData.baseurl + "/weixin/clgj/getXcxOpenid?code=" + getApp().globalData.code,

      success:(function(res)
      {
        console.log(res)
        appId = res.data.appid
        sessionKey = res.data.session_key
        var WXBizDataCrypt = require('../../utils/WXBizDataCrypt')
        var pc = new WXBizDataCrypt(appId, sessionKey)
        var data = pc.decryptData(encryptedData, iv)
        console.log(data)
        wx.showLoading({
          title: '登录中..',
        })

        var code = ""
        wx.login({
          success:(function(data){
            code = data.code
          })
        })
        //登录
        wx.request({
          url: getApp().globalData.baseurl + "/weixin/clgj/auth",

          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            mobile: data.purePhoneNumber,
            code: code
          },
          method: "POST",
          success: (function (res) {
            wx.hideLoading()
            if (res.data.succ) {
              var userInfo = { "isLogin": true, "userInfo": res.data.data }
              var info = {}
              wx.setStorage({
                key: 'userInfo',
                data: userInfo
              })

              getApp().globalData.isLogin = true
              getApp().globalData.userInfo = res.data.data
              getApp().globalData.userGuid = res.data.data.guid
              getApp().globalData.loginStatuChange = true


              wx.showToast({
                title: "登录成功"
              })

              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)

            } else {
              wx.showToast({
                title: res.data.msg,
                image: "/images/toast_error.png"
              })
            }
          })
        })
      })
    })
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