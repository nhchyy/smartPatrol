// pages/loglist/loglist.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: "",
    listshow: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let eqpid = options.id;
    that.setData({
      id: eqpid
      //res代表success函数的事件对，data是固定的，list是数组
    })


  },
  detail: function (e) {


    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  // console.log(e);
  // wx.navigateTo({
  //   url: '../logdetail/logdetail?id=' + e.currentTarget.id,

  //   success: function() {
  //     console.log('接口调用成功')

  //   },
  //   fail: function() {
  //     console.log('接口调用成功')
  //   },
  //   complete: function() {
  //     console.log('调用结束，调用成功失败都会执行')
  //   }
  // })



  addlog: function () {
    var id = this.data.id;
    console.log('接口调用成功传参数' + this.data.id)
    wx.navigateTo({


      url: '../logadd/logadd?id=' + this.data.id,


      success: function () {
        console.log('接口调用成功传参数')

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var listshow = [];
    wx.request({

      url: 'http://112.93.119.181:8090/zhyw/api/mtceqpid/',
      method: 'post',
      data: util.json2Form({
        eqp_id: that.data.id
      }),

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        console.log(res.data.mtclog);
        listshow = res.data.mtclog;
        for (var i = 0; i < listshow.length; i++) {
          listshow[i] = that.extend(listshow[i], { open: false });
        }
        that.setData({
          list: listshow
        })
        console.log("讨厌" + that.data.list[0].open);
        // that.setData({
        //   listshow: res.data.mtclog,
        //   //res代表success函数的事件对，data是固定的，list是数组

        // })


      },
      fail: function (err) {
        console.log("失败")
      }


    })




  },
  extend: function (data, dataExtend) {
    var res = {};
    for (var key in data) {
      res[key] = data[key];
    }
    for (var key in dataExtend) {
      res[key] = dataExtend[key];
    }
    return res;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})