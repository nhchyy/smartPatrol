//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:'',
    car:'',
    date:'2019-10-01'
  },
  onLoad: function (option) {
    this.setData({
      id: option.id,
    })
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/carid/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: this.data.id,
      },
      method: 'POST',
      success: res => {
        if (res.data.errcode == 0) {
          this.setData({
            car: res.data.car
          })
        } else {
          //参数错误
          wx.showToast({
            title: '参数错误',
            icon: "none",
          })
        }
      },
      //网络或服务器异常
      fail: res => {
        wx.showToast({
          title: '网络异常，请重试',
          icon: "none",
        })
      },
    })
  },
  //申请使用
  formSubmit: function (e) {
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/carsq/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: this.data.id,
        mobile: app.globalData.mobile,
        name: app.globalData.name,
        ldd: e.detail.value.wz,
        ldate: e.detail.value.date,
        lyy: e.detail.value.yy
      },
      method: 'POST',
      success: res => {
        if (res.data.errcode == 0) {
          wx.showToast({
            title: '申请成功'
          })
          wx.navigateBack({
            delta: 1     // 1返回上一个界面，2返回上上个页面
          });
        } else {
          //参数错误
          wx.showToast({
            title: '参数错误',
            icon: "none"
          })
        }
      },
      //网络或服务器异常
      fail: res => {
        wx.showToast({
          title: '网络异常，请重试',
          icon: "none"
        })
      },
    })
  },
  //选择日期
  sd: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
})
