
Page({
  
  //页面的初始数据
  data: {
    mobile: '',  //接收跳转过来的
    date: '',  //日期传递到下个界面
    tag: "",  //标记数字，控制前台显示
    log: ""  //打卡日志数组
  },

  //接收上一页面跳转过来的mobile参数
  onLoad: function (option) {
    this.setData({
      mobile: option.mobile
    })
  },

  //点选日期方法，页面进入时直接跳转至当前日期，同时被调用一次
  bindgetdate(e){
    this.setData({
      date: e.detail.year.toString() + e.detail.month.toString() + e.detail.date.toString()
    })
    //发送POST请求，获取当天的打卡记录
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
      success: res => {
        //请求成功时，设置tag标签值为1，和显示打卡记录
        if(res.data.errcode == 0){
          this.setData({
            tag:1,
            log: res.data.markers
          })
        }else{
          //没有打卡记录
          this.setData({
            tag: 2
          })
        }
      }, 
      //服务或网络断开
      fail: res => {
        this.setData({
          tag:3
        })
      },
    })
  },
  
  //界面跳转
  tapzj:function(){
    wx.navigateTo({
      url: 'footprint?mobile=' + this.data.mobile + "&date=" + this.data.date,
    })
  }
})