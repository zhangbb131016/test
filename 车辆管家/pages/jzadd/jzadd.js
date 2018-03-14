//index.js
//获取应用实例
var app = getApp()
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
    
  },
  onLoad: function () {
    this.WxValidate = app.WxValidate(
      {
        jzhm: {
          required: true
        },
        dnbh: {
          required: true
        },
        jzxm: {
          required: true
        }
      }, 
      {
        jzhm: {
          required: '请填写您的驾照号码',
        },
        dnbh: {
          required: '请填写您的档案编号',
        },
        jzxm: {
          required: '请填写您的驾照姓名',
        }
      }
    )
  },
  formSubmit: function (e) {
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showToast({
        title: `${error.msg} `,
        icon: 'none',
        duration: 2000
      })
      return false
    }
    var that = this
    //提交
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
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    })
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
