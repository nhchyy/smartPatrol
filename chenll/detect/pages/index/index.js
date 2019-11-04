//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

    // list:  [{
    //   id: '',
    // }, {
    //     title: ''
    //   }]
  },

  click:function () {
    var that = this;
    var id="";
    wx.scanCode({
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        console.log(this.show);
        id = res.result;
        // that.setData({
        //   id: res.result
        // })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../detailinfo/detailinfo?id='+id,
         
          　　success: function () {
            　　　　console.log('接口调用成功')
            
          　　},
          　　fail: function () {
            　　　　console.log('接口调用成功')
          　　},
          　　complete: function () {
            　　　　console.log('调用结束，调用成功失败都会执行')
          　　}
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }
})
