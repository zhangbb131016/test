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
    if(!getApp().data.isLogin)
    {
      wx.navigateTo({
        url: '/pages/loginmode/loginmode',
      })
    }else{
      wx.navigateTo({
        url: '/pages/caradd/caradd',
      })
    }
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: getApp().data.mainUrl+"weixin/clgj/wdcl?userGuid=4377d0a6-58fd-498b-8cab-7b74f069939c",
      success: function (res) {

        var carInfos = res.data.data.resultCar.mycarList;
        that.setData({
          carList: carInfos
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
