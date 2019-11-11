// pages/eqpmod/eqpmod.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /*
    id:设备编码
    list:页面显示数据
   */

  data: {
    id: "",
    list: {}
  },

  //页面加载时以设备编号查询设备信息
  onLoad: function(options) {
    var that = this;
    let eqpid = options.id;
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/equipment/',
      method: 'post',
      data: util.json2Form({
        id: eqpid
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        that.setData({
          list: res.data,
          id: eqpid
        })
      },
      fail: function(err) {
        // console.log("失败")
      }
    })
  },

  // 提交表单修改数据库中当前信息
  formSubmit: function(e) {
    var that = this;
    let address = e.detail.value.address,
      longtitude = e.detail.value.longtitude,
      latitude = e.detail.value.latitude,
      principal_name = e.detail.value.principal_name,
      principal_tel = e.detail.value.principal_tel,
      mfr_tel = e.detail.value.mfr_tel,
      comment = e.detail.value.comment;
    if ((address == "") || (longtitude == "") || (latitude == "") || (principal_name == "") || (principal_tel == "") || (mfr_tel == "") || (comment == "")) {
      wx.showToast({
        title: '数据都不为空',
        icon: 'success',
        duration: 2000
      })
    } else if (parseInt(address.length) > 100) {
      wx.showToast({
        title: '地址过长',
        icon: 'success',
        duration: 2000
      })
    } else if (parseInt(comment.length) > 2000) {
      wx.showToast({
        title: '备注过长',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'http://112.93.119.181:8090/zhyw/api/eqpedit/',
        method: 'post',
        data: util.json2Form({
          eqp_id: that.data.id,
          mtc_type: "数据修订",
          maintainer_name: app.globalData.name,
          maintainer_tel: app.globalData.mobile,
          description: "数据修订",
          address: address,
          longtitude: longtitude,
          latitude: latitude,
          principal_name: principal_name,
          principal_tel: principal_tel,
          mfr_tel: mfr_tel,
          comment: comment
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

  }
})