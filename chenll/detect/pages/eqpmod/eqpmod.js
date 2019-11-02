// pages/eqpmod/eqpmod.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let eqpid = options.id;
    console.log("123")
    wx.request({

      url: 'http://39.104.94.115/zhyw/api/equipment/',
      method: 'post',
      data: util.json2Form({
        id: eqpid
      }),

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },


      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        console.log(res.data),
          that.setData({
            list: res.data,
            id: eqpid
            //res代表success函数的事件对，data是固定的，list是数组
          })

      },
      fail: function (err) {
        console.log("失败")
      }

    })

  },

  formSubmit: function (e) {
    var that = this;
    console.log("修订：" + that.data.id);
    console.log("提交结果" + e.detail.value.address);
    wx.request({


      url: 'http://39.104.94.115/zhyw/api/eqpedit/',
      method: 'post',
      data: util.json2Form({
        eqp_id: that.data.id,
        mtc_type: "数据修订",
        maintainer_name: "陈玲玲",
        maintainer_tel: "18603377371",
        description: "数据修订",
        address: e.detail.value.address,
        longtitude: e.detail.value.longtitude,
        latitude: e.detail.value.latitude,
        principal_name: e.detail.value.principal_name,
        principal_tel: e.detail.value.principal_tel,
        mfr_tel: e.detail.value.mfr_tel,
        comment: e.detail.value.comment,
      }),


      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },


      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        console.log(res.data),
          that.setData({

            //res代表success函数的事件对，data是固定的，list是数组
          })
        wx.navigateBack({
          delta: 1         // 返回上一页
        });

      },
      fail: function (err) {
        console.log("失败")
      }

    })
  },
  formReset: function (e) {
    var that = this;
    e.detail.value.address = "",
    e.detail.value.longtitude = "",
    e.detail.value.latitude = "",
    e.detail.value.principal_name = "",
    e.detail.value.principal_tel = "",
    e.detail.value.mfr_tel = "",
    e.detail.value.comment = ""
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