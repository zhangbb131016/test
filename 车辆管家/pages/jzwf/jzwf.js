//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    drivingList: [],
    isshow: false,
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
        if (that.data.drivingList.length < 3){
          that.setData({
            isshow: true
          })
        } else {
          that.setData({
            isshow: false
          })
        }
      }
    })
  },
  deljz: function (e) {
    var that = this;
    var drivingGuid = e.currentTarget.dataset.drivingguid;
    wx.showModal({
      title: '解绑',
      content: '是否确定解绑该驾照？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseurl + "/weixin/wx_member/delMyDriving?drivingGuid" + drivingGuid + '&userGuid=' + app.globalData.userGuid,
            method: 'GET',
            data: {
              userGuid: app.globalData.userGuid,
              drivingGuid: drivingGuid
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
