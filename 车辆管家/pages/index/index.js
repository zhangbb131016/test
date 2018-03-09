//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {

  },

  tologin: function()
  {
    wx.navigateTo({
      url: '/pages/login/login',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
})
