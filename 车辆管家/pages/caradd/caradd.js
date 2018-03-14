const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carlist: [{ 'id': '02', 'name': '小型客车' }],
    arealist: ['吉'],
    cp: '',
    cj: '',
    name: '',
    index: ''  
  },
  bindPickerChange: function (e) {
    var index = e.detail.value;
    var currentId = this.data.carlist[index].id;
    this.setData({
      index: e.detail.value
    })
  },
  bindAreaChange: function(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  cpInput: function(e){
    this.setData({
      cp: e.detail.value
    })
  },
  cjInput: function(e){
    this.setData({
      cj: e.detail.value
    })
  },
  nameInput: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.WxValidate = app.WxValidate(
      {
        cphm: {
          required: true
        },
        cjhm: {
          required: true
        },
        czxm: {
          required: true
        }
      },
      {
        cphm: {
          required: '请填写您的车牌号码',
        },
        cjhm: {
          required: '请填写您的车架号码',
        },
        czxm: {
          required: '请填写车主姓名',
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      index: 0,
      index2: 0
    })
  },
  commit: function(){
    wx.request({
      url: app.globalData.baseurl + "/weixin/wx_member/saveMyCar",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        hphm: this.data.cp,
        cjhm: this.data.cj,
        hpzl: '02',
        czxm: this.data.name,
        userGuid: '4377d0a6-58fd-498b-8cab-7b74f069939c'
      },
      method:'POST',
      success: function (res) {
        console.log(res)
        app.globalData.loginStatuChange = true
        wx.showToast({
          title: '成功',
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
    console.log(this.data.cp,this.data.cj,this.data.name)
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