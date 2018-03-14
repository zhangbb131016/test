//app.js
App({
  onLaunch: function () {
    var that = this
    wx.login({
      success:(function(res){
        that.globalData.code=res.code
      })
    })

    //同步读取用户数据
    var userInfo = wx.getStorageSync("userInfo")
    if(userInfo)
    {
      that.globalData.isLogin = userInfo.isLogin
      that.globalData.userGuid = userInfo.userInfo.guid
      that.globalData.userInfo = userInfo.data
    }
  },
  globalData: {

    //登录状态（经过考虑，不使用自动登录，把状态保存在本地，用于进入应用的一个判定）
    isLogin: false,

    //登录状态改变（用于登录后刷新各个页面）
    loginStatuChange:false,

    //基础接口请求地址
    baseurl: 'https://gaapi.jl.gov.cn/econsole',

    userGuid: '4377d0a6-58fd-498b-8cab-7b74f069939c',

    //用户授权code
    code:"",

    //用户数据（guid）等
    userInfo:{}
  }
})