// pages/basicinfo/basicinfo.js
var app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    show: "",
    epid: ""
  
  },

  onLoad: function (options) {
    console.log("传参" + options.id);
    var that = this;
    let eqpid = options.id;
    that.setData({ epid: eqpid})
    console.log(eqpid);
   
  },
  details: function (){
    console.log('接口调用djkslkdjdflskk'+this.data.epid)
    wx.navigateTo({
      
      url: '../detailinfo/detailinfo?id=' + this.data.epid,
    
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
  loglist:function (){
    wx.navigateTo({
      url: '../loglist/loglist?id=' + this.data.epid,
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

 
  onShow: function () {
    var that=this;
    wx.request({

      url: 'http://39.104.94.115/zhyw/api/equipment/',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      method: 'post',
      data: util.json2Form({
        id: that.data.epid
      }),

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },


      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        console.log(res.data),
          that.setData({
            list: res.data,

            //res代表success函数的事件对，data是固定的，list是数组
          })

      },
      fail: function (err) {
        console.log("失败")
      }

    })
  }

})
