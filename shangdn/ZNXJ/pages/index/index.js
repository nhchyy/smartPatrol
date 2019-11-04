//index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 39.9096045,
    longitude: 116.397228,
    tz: "",
    jilu:"",
    markers: [{
      id: 1,
      latitude: 39.90310,
      longitude: 116.39780,
      title: '天安门广场'
    },]
  },
  dw: function (e) {
    wx.getLocation({
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        }),
          wx.request({
            url: 'http://39.104.94.115/zhyw/api/daka/',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              wjd: res.longitude,
              wwd: res.latitude,
              mobile:'15637251568',
              name:'尚丹娜'
            },
            method: 'POST',
            success: res => {
              if(res.data.errcode == 0 ){
                this.setData({
                  jilu:res.data.dak_log
                }),
                wx.showToast({
                  title: '打卡成功'
                })
              }else{
                wx.showToast({
                  title: '打卡失败'
                })
              }
            },
            
            fail: res => {
              wx.showToast({
                title: '打卡失败，请重新打卡',
                duration: 2000,
                icon: 'none'
              })
            }
          })
      },
    })
  },
})