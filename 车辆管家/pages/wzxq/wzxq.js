//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    detailInfos:[],
    hphm:'',
    wzxx:[],
    loading: true,
    loadingsuccess: false
  },

  onLoad: function (options) {
    this.getList()
    this.setData({
      hphm: options.hphm
    })
  },
  getList: function () {
    var that = this
    wx.request({
      url: app.globalData.baseurl + "/weixin/clgj/wdcl?userGuid=" + app.globalData.userGuid,
      success: function (res) {
        var detailInfos = res.data.data.resultCar.mycarList;
        for (var i = 0; i < detailInfos.length;i++){
          if (that.data.hphm === detailInfos[i].hphm){
            that.setData({
              detailInfos:detailInfos[i],
              loading: false,
              loadingsuccess: true
            })
          }
        }
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
