// pages/dettext/dettext.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   var that = this;
    let newid = options.newid;
    console.log("详情页接收到的id值：" + newid);

    //请求文字详情页
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/artid/',
      header: {
        'content-type': 'application/json'
      },
      method: "get",
      data: {
        // mobile: '18607851317',
        artid:newid,
      },
      success: res =>  {
        var article = res.data.xq[0].neir;
        console.log(res);
        WxParse.wxParse('article', 'html', article, this, 5);
        //console.log(xq);
      }
    });
   
    // var article = '<div style="color:red">我是<br>HTML代码</div>';
    // var that = this;
    // WxParse.wxParse('article', 'html', article, that, 5);


  }

})