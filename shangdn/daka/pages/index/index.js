Page({
  data: {
    latitude: 39.9096045,
    longitude: 116.397228,
    mobile:'',
    name:'',
    markers: [{
      id: 1, 
      latitude: 39.90890, 
      longitude: 116.39750, 
      title: '天安门'
    }]
  },
  //接收上一页面跳转过来的mobile和name参数
  onLoad: function (option) {
    this.setData({
      mobile: '15637251568',    //上线后改为   option.mobile
      name: '尚丹娜'  //上线后改为  option.name
    })
  },
  //页面跳转
  jilu:function(){
    wx.navigateTo({
      url: '../logs/index?mobile=' + this.data.mobile,
    })
  },
  //点击打卡
  daka:function() {
    //启动定位服务
    wx.getLocation({
      //定位成功
      success: res => {
        //修改地图中显示的位置
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
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
            wjd: res.longitude,
            wwd: res.latitude
          },
          method: 'POST',
          //服务器打卡数据成功保存
          success: res => {
            if (res.data.errcode == 0) {
              wx.showToast({
                title: '打卡成功',
                icon:"success"
              })
              //10分钟以内不可重复打卡，服务器端已做出限制
            } else {
              wx.showToast({
                title: '频率过高，重试',
                icon: "loading"
              })
            }
          },
          //网络或服务器异常
          fail: res => {
            wx.showToast({
              title: '服务异常，重试',
              icon: "loading"
            })
          },
        })
      },
      //定位失败
      fail:res => {
        wx.showToast({
          title: '定位失败',
          icon: "loading"
        })
      }
    })
  }
})