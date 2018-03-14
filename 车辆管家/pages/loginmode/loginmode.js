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

    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var WXBizDataCrypt = require('../../utils/WXBizDataCrypt')

    var appId = 'wx201f5fda80c1876b'
    var sessionKey = e.detail.iv
    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
  
    var pc = new WXBizDataCrypt(appId, sessionKey)

    var data = pc.decryptData(encryptedData, iv)

    console.log('解密后 data: ', data)


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