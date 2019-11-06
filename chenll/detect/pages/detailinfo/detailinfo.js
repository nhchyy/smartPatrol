// pages/detailinfo/detailinfo.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    id: "",
    open: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let eqpid = options.id;
    that.setData({
      id: eqpid,
      open: false
    })

  },
  onclick: function () {
    wx.navigateTo({
      url: '../eqpmod/eqpmod?id=' + this.data.id,

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
  kindToggle: function (e) {

    this.setData({
      open: !this.data.open,

    });

  },


  loglist: function () {

    wx.navigateTo({
      url: '../loglist/loglist?id=' + this.data.id,
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



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({

      url: 'http://112.93.119.181:8090/zhyw/api/equipment/',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      method: 'post',
      data: util.json2Form({
        id: that.data.id
      }),

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },


      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        console.log(res.data),
          that.setData({
            list: res.data,
            open: false
            //res代表success函数的事件对，data是固定的，list是数组
          })

      },
      fail: function (err) {
        console.log("失败")
      }

    })

  },


})