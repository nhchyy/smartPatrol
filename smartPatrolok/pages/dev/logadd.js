// pages/logadd/logadd.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /*
     eqp_i:维护日志对应的设备
     styles：picker选项数据
     sindex：picker默认选项
   */

  data: {
    eqp_id: "",
    styles: ["数据修订", "更换设备板", "更换光模块", "除尘"],
    sindex: 0,

  },

  // 页面加载时获取前页传来的参数
  onLoad: function(options) {
    var that = this;
    that.setData({
      eqp_id: options.id
    })
  },

  // 表单提交后插入数据库
  formSubmit: function(e) {
    var that = this;
    let mtc_type = "数据修订";
    let mtc_typee = e.detail.value.mtc_type;
    console.log("mtc_type" + mtc_type);
    let description= e.detail.value.description;
    switch (mtc_typee) {
      case "0":
        mtc_type = "数据修订";
        break;
      case "1":
        mtc_type = "更换设备板";
        break;
      case "2":
        mtc_type = "更换光模块";
        break;
      case "3":
        mtc_type = "除尘";
    }
    if (description == "") {
      wx.showToast({
        title: '数据都不为空',
        icon: 'success',
        duration: 2000
      })
    } else if (parseInt(description.length) > 200) {
      wx.showToast({
        title: '描述过长',
        icon: 'success',
        duration: 2000
      })
    }else{
        wx.request({
          url: 'http://112.93.119.181:8090/zhyw/api/mtcadd/',
          method: 'post',
          data: util.json2Form({
            eqp_id: this.data.eqp_id,
            mtc_type: mtc_type,
            maintainer_name: app.globalData.name,
            maintainer_tel: app.globalData.mobile,
            description: description
          }),
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1 // 返回上一页
            });
          },
          fail: function(err) {
            wx.showToast({
              title: '失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
    }
    
  },

  //表单reset后重置picker
  formReset: function(e) {
    this.setData({
      sindex: 0
    })
  },

  // picker选择改变后调用
  styleChange: function(e) {
    this.setData({
      sindex: e.detail.value
    })
  }
})