Page({

  /**
   * 页面的初始数据
   */
  data: {
    carlist:["小型汽车","中型汽车","大型汽车","客车"],
    arealist: ['苏', '粤', '青', '京', '津','沪']
  },
  bindPickerChange: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindAreaChange: function(e) {
    this.setData({
      index2: e.detail.value
    })
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
    this.setData({
      index1: 0,
      index2: 0
    })
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