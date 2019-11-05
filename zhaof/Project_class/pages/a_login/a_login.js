// pages/a_login/a_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    uid:''
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      mobiles: options.mobile,
      userids: options.userid
    })
    console.log(that.data.mobiles)
  },

})