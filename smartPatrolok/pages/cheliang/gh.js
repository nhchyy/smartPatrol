//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:'',
    clc:'',
    date:'2019-10-01'
  },
  onLoad: function (option) {
    this.setData({
      id: option.id
    })
  },
  //确认归还
  formSubmit: function (e) {
    //判断输入不为空
    if(e.detail.value.clc == ''){
      wx.showToast({
        title: '您还没填里程数',
        icon: "none"
      })
      return false;
    }
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/cargh/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        carid: this.data.id,
        clc: e.detail.value.clc
      },
      method: 'POST',
      //服务器打卡数据成功保存
      success: res => {
        if (res.data.errcode == 0) {
          wx.showToast({
            title: '归还成功',
          })
          wx.navigateBack({
            delta: 1     // 1返回上一个界面，2返回上上个页面
          });
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
  }
})
