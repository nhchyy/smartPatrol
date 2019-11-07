Page({
  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',  //接收跳转过来的
    date: '',  //日期传递到下个界面
    tag:"",  //标记数字，控制前台显示
    log:""  //打卡日志数组
  },
  /**
   * 生命周期函数--监听页面加载
   * 接收参数
   */
  onLoad: function (option) {
    this.setData({
      mobile: option.mobile
    })
  },
  //点选日期方法，页面进入时直接跳转至当前日期，同时被调用一次
  bindgetdate(e){
    //点选的日期e为对象格式，year,month,date，此处转化为数组
    let arr = [];
    for (let i in e.detail) {
      arr.push(e.detail[i]);
    }
    //将转化好的数组转化为日期格式的字符串，即 2019-11-02，用于POST传参，
    let time = arr.join("-");
    this.setData({
      date: time
    })
    //发送POST请求，获取当天的打卡记录
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/dakasel/',
      header: { 
        "Content-Type": "application/x-www-form-urlencoded" 
      }, 
      data: { 
        mobile: this.data.mobile, 
        date: time
      }, 
      method: 'POST', 
      success: res => {
        //请求成功时，设置tag标签值为1，和显示打卡记录
        if(res.data.errcode == 0){
          this.setData({
            tag:1,
            log: res.data.dak_log
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
  zj:function(){
    wx.navigateTo({
      url: '../daka/zuji?mobile=' + this.data.mobile + "&date=" + this.data.date,
    })
  }
})