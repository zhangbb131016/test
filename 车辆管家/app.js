//app.js
import WxValidate from 'utils/WxValidate'
App({
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  onLaunch: function () {
    var that = this
    wx.login({
      success:(function(res){
        that.globalData.code=res.code
        console.log(res.code)
      })
    })
    
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.globalData.nickName = userInfo.nickName
        that.globalData.avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(userInfo)
      }
    })


    //同步读取用户数据
    var userInfo = wx.getStorageSync("userInfo")
    if(userInfo)
    {
      that.globalData.isLogin = userInfo.isLogin
      that.globalData.userGuid = userInfo.userInfo.guid
      that.globalData.userInfo = userInfo.userInfo
    }
  },
  globalData: {

    //登录状态（经过考虑，不使用自动登录，把状态保存在本地，用于进入应用的一个判定）
    isLogin: false,

    //登录状态改变（用于登录后刷新各个页面）
    loginStatuChange:false,

    //基础接口请求地址
    baseurl: 'https://gaapi.jl.gov.cn/econsole',

    userGuid: '',

    //用户授权code
    code:"",

    // nickName
    nickName: "",

    // avatarUrl 头像
    avatarUrl: "",

    //用户数据（guid）等
    userInfo:{}
  }
})