
var app = getApp();

Page({

  //页面的初始数据
  data:{
    userlist: ''
  },
  
  //发送post请求，获取用户列表
  onLoad: function (option) {
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/userselall/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        mobile: app.globalData.mobile
      },
      method: 'POST',
      success: res => {
        
        //请求成功时
        if (res.data.errcode == 0) {
          this.setData({
            userlist: res.data.list
          })
        } else {
          wx.showToast({
            title: '参数错误，请检查',
            icon: "none",
            duration: 2000
          })
        }
      },

      //服务或网络断开
      fail: res => {
        wx.showToast({
          title: '网络断开，请检查',
          icon: "none",
          duration: 2000
        })
      },
    })
  },

  //界面跳转
  tapitem: function (e){
    wx.navigateTo({
      url: 'record?mobile=' + e.currentTarget.id,
    })
  }
})