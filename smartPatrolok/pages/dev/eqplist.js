// pages/dev/eqplist.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /*
    id:设备编号
    list：页面显示数据
    styles：picker数据
    sindex：picker默认选择
   */

  data: {
    list: [],
    id: "",
    styles: ["请选择", "服务器", "交换机", "传输设备", "交换设备", "基站设备"],
    sindex: 0,
  },

  // 跳转函数，跳转到详细信息页面
  detail: function(e) {
    wx.navigateTo({
      url: 'eqpinfo?id=' + e.currentTarget.id,
    })
  },


  // 查询表单提交函数
  searchSubmit: function(e) {
    const that = this,
      app = getApp();
    wx.showToast({
      title: '搜索中',
      icon: 'loading'
    });
    let tpe = "";
    switch (tpe = e.detail.value.type) {
      case "-1":
        tpe = "";
        break;
      case "0":
        tpe = "";
        break;
      case "1":
        tpe = "服务器";
        break;
      case "2":
        tpe = "交换机";
        break;
      case "3":
        tpe = "传输设备";
        break;
      case "4":
        tpe = "交换设备";
        break;
      case "5":
        tpe = "基站设备";
    }
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/eqpsel/',
      method: 'post',
      data: util.json2Form({
        type: tpe,
        ename: e.detail.value.ename,
        wz: e.detail.value.wz,
        mname: e.detail.value.mname,
        pname: e.detail.value.pname
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        that.setData({
          list: res.data.eqp
        })
        wx.hideToast();
      },
      fail: function(err) {
        // console.log("失败")
      }
    })
  },


  //picker选择改变
  styleChange: function(e) {
    this.setData({
      sindex: e.detail.value
    })
  },

  //form表单reset时重置picker
  resetSindex: function(e) {
    this.setData({
      sindex: 0
    })
  }

})