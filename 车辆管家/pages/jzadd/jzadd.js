//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    drivingInfos: [],
    loading: true,
    jz: '',
    da: '',
    xm: ''
  },
  jzInput: function (e) {
    this.setData({
      jz: e.detail.value
    })
  },
  daInput: function (e) {
    this.setData({
      da: e.detail.value
    })
  },
  xmInput: function (e) {
    this.setData({
      xm: e.detail.value
    })
  },
  commit: function () {
    wx.request({
      url: app.globalData.baseurl + "/weixin/wx_member/saveMyDriving",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        jzhm: this.data.jz,
        dabh: this.data.da,
        xm: this.data.xm,
        userGuid: app.globalData.userGuid
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        app.globalData.loginStatuChange = true
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000)
      }
    })
    console.log(this.data.jz, this.data.da, this.data.xm)
  },
  onLoad: function () {
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
