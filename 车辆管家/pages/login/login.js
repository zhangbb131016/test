// pages/logon/logon.js

// 从从60到到0倒计时
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      timeOutString: "获取验证码",
      isPhoneLength: true,
      second:60
    });
    return;
  }
  var time = setTimeout(function () {
    var currentSecond = that.data.second
    that.setData({
      isPhoneLength: false,
      second: currentSecond - 1,
      timeOutString: that.data.second + "秒"
    });
    countdown(that);
  }
    , 1000)
}
function getImageCode(that)
{
  //加载图形验证码
  var that = that
  var random = "";
  for (var i = 0; i < 6; i++) {
    random = random + Math.floor(Math.random() * 10)
  }
  console.log(random)
  that.setData({
    randRomNum: random
  })
  wx.request({
    url: getApp().globalData.baseurl + "/api/sms/createImgCode?id=" + that.data.randRomNum,
    success: (function (res) {
      var str = res.data.data.replace(/\s+/g, "")
      that.setData({
        imageCodeUrl: 'data:image/png;base64,' + str
      })
      console.log(that.data.imageCodeUrl)
    })
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhoneLength:false,
    timeOutString:"获取验证码",
    second:60,
    randRomNum:"",
    imageCodeUrl:"",
    phoneNum:"",
    imageCodeStr:"",
    codeString:""
  },

  //登录
  login: function () {
    console.log(this.data.phoneNum)
    if (this.data.phoneNum.length == 0)
    {
      wx.showToast({
        title: "请输入手机号",
        image: "/images/toast_error.png"
      })
    }
    else if (this.data.phoneNum.length != 11){
      wx.showToast({
        title: "请输入正确的手机号",
        image: "/images/toast_error.png"
      })
    }
    else{
      if (this.data.codeString.length == 0)
      {
        wx.showToast({
          title: "请输入验证码",
          image: "/images/toast_error.png"
        })
      } else if (this.data.codeString.length != 6)
      {
        wx.showToast({
          title: "请输入正确的验证码",
          image: "/images/toast_error.png"
        })
      }else{
        console.log(getApp().globalData.code)
        wx.request({
          url: getApp().globalData.baseurl +"/weixin/clgj/auth",

          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            mobile:this.data.phoneNum,
            validateCode: this.data.codeString,
            code: getApp().globalData.code
          },
          method:"POST",
          success: (function(res){
            if(res.data.succ)
            {
              var userInfo = {"isLogin":true,"userInfo":res.data.data}
              var info = {}
              wx.setStorage({
                key: 'userInfo',
                data: userInfo
              })

              getApp().globalData.isLogin = true
              getApp().globalData.userInfo = res.data.data
              getApp().globalData.userGuid = res.data.data.guid
              getApp().globalData.loginStatuChange = true


              wx.navigateBack({
                delta:2
              })

              wx.showToast({
                title: "登录成功"
              })

            }else{
              wx.showToast({
                title: res.data.msg,
                image: "/images/toast_error.png"
              })
            }
          })
        })
      }
    }
  },

  //手机号输入框监听
  phoneImport: function(res)
  {
    var phonelength = res.detail.value.length
    var imageCodelength = this.data.imageCodeStr.length
    console.log(res.detail.value)
    this.setData({
      phoneNum: res.detail.value
    })
    console.log(phonelength, imageCodelength)
    if (phonelength == 11 && imageCodelength ==4)
    {
      this.setData({
        isPhoneLength:true
      })
    }else{
      this.setData({
        isPhoneLength:false
      })
    }
  },
  //图形验证码输入
  imageCodeImport:function(res)
  {
    var phonelength = this.data.phoneNum.length
    var imageCodelength = res.detail.value.length
    this.setData({
      imageCodeStr: res.detail.value
    })
    console.log(phonelength,imageCodelength)
    if (phonelength == 11 && imageCodelength == 4) {
      this.setData({
        isPhoneLength: true
      })
    } else {
      this.setData({
        isPhoneLength: false
      })
    }
  },
  //短信验证码监听
  codeImport:function(res)
  {
    console.log(res.detail.value)
    this.setData({
      codeString: res.detail.value
    })
  },

  //获取验证码
  getCode:function()
  {
    var that = this
    if (this.data.isPhoneLength)
    {
      wx.request({
        url: getApp().globalData.baseurl +"/api/sms/send",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          tel: this.data.phoneNum,
          type: "2",
          expire:"",
          content:"",
          id: this.data.randRomNum,
          imgCode: this.data.imageCodeStr,
          pt :"I"
        },
        method:"POST",
        success: function (res) 
        {
          if(res.data.succ)
          {
            countdown(that)
            wx.showToast({
              title: res.data.msg,
            })
          }else{
            getImageCode(that)
            wx.showToast({
              title: res.data.msg,
              image:"/images/toast_error.png"
            })
          }
          console.log(res)
        }
      })

    }
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    getImageCode(this)

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