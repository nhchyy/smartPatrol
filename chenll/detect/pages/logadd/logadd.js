// pages/logadd/logadd.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eqp_id:""

  },
  onLoad: function (options) {
    console.log(options);
    var that=this;
   
    that.setData({
      eqp_id: options.id
    })

  },

  formSubmit: function (e) {
    var that = this;
    console.log("提交结果" + e.detail.value.mtc_type);
    console.log("设备ID" + that.data.eqp_id);
    wx.request({


      url: 'http://39.104.94.115/zhyw/api/mtcadd/',
      method: 'post',
     
      data: util.json2Form({
        
        eqp_id: this.data.eqp_id,
        mtc_type: e.detail.value.mtc_type,
        maintainer_name: "陈玲玲",
        maintainer_tel: "18603377371",
        description: e.detail.value.description
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

      },
      fail: function (err) {
        console.log("失败")
      }

    })
  },
  formReset: function (e) {
    e.detail.value.mtc_type="",
       
       e.detail.value.description=""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  

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