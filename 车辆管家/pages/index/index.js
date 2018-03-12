//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    carList:[]
  },
  //添加车辆
  addCar:function()
  {
    wx.navigateTo({
      url: '/pages/caradd/caradd',
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: "https://gaapi.jl.gov.cn/econsole/weixin/clgj/wdcl?userGuid=4377d0a6-58fd-498b-8cab-7b74f069939c",
      success: function (res) {

        var carInfos = res.data.data.resultCar.mycarList;
        that.setData({
          carList: carInfos.concat(carInfos)
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
})
