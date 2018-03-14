const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jzxq:{},
    dabh: '',
    xm: '',
    jzhm: '',
    index: '',
    gxsj: '',
    cclzrq: '',
    fzrq: '',
    yxqs: '',
    syyxqz: '',
    error: false,
    loading: true,
    isshow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dabh: options.dabh,
      xm: options.xm,
      jzhm: options.jzhm,
      index: options.index
    })
    this.getList()
  },
  getList: function () {
    var that = this
    wx.request({
      url: app.globalData.baseurl + "/weixin/clgj/wdcl?userGuid=" + app.globalData.userGuid,
      success: function (res) {
        var sn = res.data.data.resultDriving['sn' + that.data.index]
        var drivingInfo = 'drivingInfo' + that.data.index
        var resultDriving = res.data.data.resultDriving
        if (drivingInfo in resultDriving){
          delete resultDriving.myDrivingList
          var resultDrivingArr = []
          for (var item in resultDriving) {
            resultDrivingArr.push(resultDriving[item]);
          }
          for(var i = 0;i<resultDrivingArr.length;i++){
            if (that.data.dabh === that.trim(resultDrivingArr[i].dabh)) {
              that.setData({
                jzxq: resultDrivingArr[i],
                fzrq: resultDrivingArr[i].fzrq.substr(0,10),
                cclzrq: resultDrivingArr[i].cclzrq.substr(0, 10),
                gxsj: resultDrivingArr[i].gxsj.substr(0, 10),
                yxqs: resultDrivingArr[i].yxqs.substr(0, 10),
                syyxqz: resultDrivingArr[i].syyxqz.substr(0, 10),
                loading: false,
                isshow: true
              })
            }
          }
        } else {
          wx.request({
            url: app.globalData.baseurl + "/weixin/wx_member/getMyDriving?sn=" + sn ,
            success: function(res){
              var sndirvingInfo = res.data.data
              that.setData({
                jzxq: sndirvingInfo,
                fzrq: sndirvingInfo.fzrq.substr(0, 10),
                cclzrq: sndirvingInfo.cclzrq.substr(0, 10),
                gxsj: sndirvingInfo.gxsj.substr(0, 10),
                yxqs: sndirvingInfo.yxqs.substr(0, 10),
                syyxqz: sndirvingInfo.syyxqz.substr(0, 10),
                loading: false,
                isshow: true
              })
            },
            fail: function(err){
              that.setData({
                error: true,
                isshow: false,
                loading: false
              })
            }
          })
        }
      }
    })
  },
  trim:function (str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
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