//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mycar:'',
    car:''
  },
  //借用车辆
  jy:function(e){
    wx.navigateTo({
      url: 'jie?id=' + e.currentTarget.id
    })
  },
  //归还车辆
  gh: function (e) {
    wx.navigateTo({
      url: 'gh?id=' + e.currentTarget.id
    })
  },
  onShow: function () {
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/car/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        mobile: app.globalData.mobile,
      },
      method: 'POST',
      //服务器打卡数据成功保存
      success: res => {
        if (res.data.errcode == 0) {
          this.setData({
            mycar : res.data.mycar,
            car : res.data.car
          })
        }
      },
      //网络或服务器异常
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '网络异常1，请重试',
          icon: "none",
        })
      },
    })
  },
})
