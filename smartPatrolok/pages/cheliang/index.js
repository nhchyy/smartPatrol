//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mobile:'',
    name:'',
    mycar:'',
    car:''
  },
  //借用车辆
  jy:function(e){
    wx.navigateTo({
      url: '../jie/index?id=' + e.currentTarget.id
    })
  },
  //归还车辆
  gh: function (e) {
    wx.navigateTo({
      url: '../gh/indexgh?id=' + e.currentTarget.id
    })
  },
  onLoad: function () {
    //接收上一页面跳转过来的mobile和name参数
    this.setData({
<<<<<<< HEAD

=======
>>>>>>> 05041599e0e08866ace756f54099192724f12d4e
      mobile: '15577554321',
      name: '蔡奕妥',
      mobile: app.globalData.mobile,
      name: app.globalData.name
    })
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/car/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        mobile: this.data.mobile,
      },
      method: 'POST',
      //服务器打卡数据成功保存
      success: res => {
        if (res.data.errcode == 0) {
          this.setData({
            mycar : res.data.mycar,
            car : res.data.car
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
        console.log(res)
        wx.showToast({
          title: '网络异常1，请重试',
          icon: "none",
        })
      },
    })
  },
})
