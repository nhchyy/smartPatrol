//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:'',
    car:'',
    mobile:'',
    name:'',
    date:'2019-10-01'
  },
  onLoad: function (option) {
    this.setData({
      id: option.id,
      mobile: app.globalData.mobile,
      name: app.globalData.name
    })
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/carid/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: option.id,
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
            duration: 2000
          })
        }
      },
      //网络或服务器异常
      fail: res => {
        wx.showToast({
          title: '网络异常，请重试',
          icon: "none",
          duration: 2000
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
        mobile: this.data.mobile,
        name: this.data.name,
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
          wx.navigateTo({
            url: 'index',
          });
        } else {
          //参数错误
          wx.showToast({
            title: '参数错误',
            icon: "none",
            duration: 2000
          })
        }
      },
      //网络或服务器异常
      fail: res => {
        wx.showToast({
          title: '网络异常，请重试',
          icon: "none",
          duration: 2000
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
