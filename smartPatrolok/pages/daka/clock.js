let amap = require("../../utils/amap");
var app = getApp();

Page({
 
  //页面的初始数据
  data: {
    latitude: 39.9096045,  //纬度
    longitude: 116.397228,  //经度
    mobile: '',  //手机号码
    name: '',  //姓名
    wz: "",  //详细地址
    markers:[{
      id: 1, 
      latitude: 39.90890, 
      longitude: 116.39750, 
      title: '天安门'
    }]
  },

  //接收上一页面跳转过来的mobile和name参数
  onLoad: function (option){
    this.setData({
      mobile: app.globalData.mobile,
      name: app.globalData.name
    })
    //获取地址逆向解析地址名称
    amap.getRegeo()
      .then(d => {
        this.setData({
          wz: d[0].desc
        });
      })
  },
  
  //点击打卡
  tapdaka:function() {
    //启动定位服务
    wx.getLocation({
      //定位成功
      success: res => {
        //修改地图中显示的位置
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          markers:[{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            title: ''
          }]
        }),
        //发送post请求，向服务器提交打卡数据
        wx.request({
          url: 'http://112.93.119.181:8090/zhyw/api/daka/',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            mobile: this.data.mobile,
            name: this.data.name,
            wz: this.data.wz,
            wjd: res.longitude,
            wwd: res.latitude            
          },
          method: 'POST',
          //服务器打卡数据成功保存
          success: res => {
            if (res.data.errcode == 0) {
              wx.showToast({
                title: '打卡成功',
                icon:"success",
                duration:2000
              })
              //10分钟以内不可重复打卡，服务器端已做出限制
            } else {
              wx.showToast({
                title: '频率过高，请10分钟后再打卡',
                icon: "none",
                duration: 2000
              })
            }
          },
          //网络或服务器异常
          fail: res => {
            wx.showToast({
              title: '服务异常，请稍后再试',
              icon: "none",
              duration: 2000
            })
          },
        })
      },
      //定位失败
      fail:res => {
        wx.showToast({
          title: '定位失败，请稍后再试',
          icon: "none",
          duration: 2000
        })
      }
    })
  }
})