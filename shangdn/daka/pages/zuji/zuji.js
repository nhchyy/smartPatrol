Page({

  // 页面的初始数据
  data: {
    num:'', //打卡次数
    range:'', //公里数
    row:'',//天安门广场圈数
    date:'', //接收上页面的日期
    month:'', //月度
    mobile:'', //接收上页面的电话
    latitude: '', //地图中心点经度
    longitude: '', //地图中心点纬度
    markers: '',  //标记点
    flag:1 //标识
  },

  //生命周期函数--监听页面加载
  onLoad: function (option) {

    //接收上一个页面的数值
    this.setData({
      mobile: option.mobile,
      date: option.date,
      month: option.date.substring(0, 7),//截取日期为年月格式，2019-10,
    })

    //初始化，以所在位置为地图显示的中心点
    wx.getLocation({
      success:res => {

        //地图上的中心点需要先设置
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        }),

        //定位成功后，请求当月打卡数据
        wx.request({
          url: 'http://112.93.119.181:8090/zhyw/api/dakaseldy/',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            mobile: this.data.mobile,
            date: this.data.date.substring(0, 7) //截取日期为年月格式，2019-10,
          },
          method: 'POST',
          //数据请请求成功
          success: res => {
            if (res.data.errcode == 0) {
              this.setData({
                num: res.data.num,
                range: res.data.range,
                row:res.data.row,
                markers: res.data.markers,
                flag: 0
              })
            }else{
              wx.showToast({
                title: '当月无打卡记录',
                icon: "loading",
                duration: 3000
              })
            }
          },
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