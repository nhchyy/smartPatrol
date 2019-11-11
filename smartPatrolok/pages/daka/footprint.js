Page({

  // 页面的初始数据
  data: {
    date: '',  //接收上页面的日期
    mobile: '',  //接收上页面的电话
    latitude: '',  //地图中心点经度
    longitude: '',  //地图中心点纬度
    markers: '',  //标记点
  },

  //接收上一个页面的数值
  onLoad: function (option) {
    this.setData({
      mobile: option.mobile,  
      date: option.date, 
    })

    //初始化，以所在位置为地图显示的中心点
    wx.getLocation({
      success:res => {

        //地图上的中心点需要先设置
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        }),

        //定位成功后，请求当日打卡数据
        wx.request({
          url: 'http://112.93.119.181:8090/zhyw/api/dakasel/',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            mobile: this.data.mobile,
            date: this.data.date
          },
          method: 'POST',
         
          //数据请求成功
          success: res => {
            if (res.data.errcode == 0) {
              this.setData({
                markers: res.data.markers
              })
            }else{
              wx.showToast({
                title: '当日无打卡记录',
                icon: "loading",
                duration: 3000
              })
            }
          },

          //数据请求失败
          fail: res => {
            wx.showToast({
              title: '网络或服务故障',
              icon: "loading"
            })
          }
        })
      },

      //定位服务故障
      fail:res=> {
        wx.showToast({
          title: '定位服务故障',
          icon:'loading'
        })
      }
    })
  }
})