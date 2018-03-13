//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    drivingList: [],
    loading: true
  },
  //添加车辆
  addjz: function () {
    wx.navigateTo({
      url: '/pages/jzadd/jzadd',
    })
  },
  onLoad: function () {
    this.getList()
  },
  getList: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + "/weixin/clgj/wdcl?userGuid=" + app.globalData.userGuid,
      success: function (res) {
        var drivingInfos = res.data.data.resultDriving.myDrivingList;
        that.setData({
          drivingList: drivingInfos,
          loading: false
        })
      }
    })
  },
  deljz: function (e) {
    var that = this;
    var clxq_guid = e.currentTarget.dataset.carGuid;
    wx.showModal({
      title: '解绑',
      content: '是否确定解绑该驾照？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseurl + "/weixin/clgj/wdcl?delMyCar=" + app.globalData.userGuid + '&clxq_guid=' + clxq_guid,
            method: 'GET',
            data: {
              userGuid: app.globalData.userGuid,
              clxq_guid: clxq_guid
            },
            success: function (res) {
              console.log(res)
              that.getList()
              wx.showToast({
                title: '解绑成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
})
