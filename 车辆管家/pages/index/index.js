//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    carList:[],
    showModalStatus: false,
    ishow: true,
    loading:true
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } ,
  //添加车辆
  addCar:function()
  {
    if (!app.globalData.isLogin)
    {
      wx.navigateTo({
        url: '/pages/loginmode/loginmode',
      })
    }else{
      wx.navigateTo({
        url: '/pages/caradd/caradd',
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userGuid == '') {
      this.setData({
        loading: false
      })
    }else {
       this.getList()
    }
  },
  onReady: function () {
    this.util('open')
  },
  close: function(){
    this.util('close')
  },
  getList: function(){
    var that = this
    wx.request({
      url: app.globalData.baseurl + "/weixin/clgj/wdcl?userGuid=" + app.globalData.userGuid,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var carInfos = res.data.data.resultCar.mycarList
        that.setData({
          carList: carInfos,
          loading: false
        })
        if (that.data.carList.length < 3){
          that.setData({
            ishow: true
          })
        }else {
          that.setData({
            ishow: false
          })
        }
      }
    })
  },
  delcar: function(e){
    var that = this;
    var clxq_guid = e.currentTarget.dataset.carguid
    console.log(clxq_guid)
    wx.showModal({
      title: '解绑',
      content: '是否确定解绑该车辆？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseurl + "/weixin/clgj/delMyCar?userGuid=" + app.globalData.userGuid + '&clxq_guid=' + clxq_guid,
            method: 'GET',
            data:{
              userGuid: app.globalData.userGuid,
              clxq_guid: clxq_guid
            },
            success: function(res){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
})
