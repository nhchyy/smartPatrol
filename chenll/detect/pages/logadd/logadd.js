// pages/logadd/logadd.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eqp_id:"",
    styles: ["数据修订", "更换设备板", "更换光模块", "除尘"],
    sindex: 0,

  },
  onLoad: function (options) {
    console.log("传参传参loglog"+options.id);
    var that=this;
   
    that.setData({
      eqp_id: options.id
    })

  },

  formSubmit: function (e) {
    var that = this;
    console.log("提交结果" + e.detail.value.mtc_type);
    console.log("设备ID" + that.data.eqp_id);
    let mtc_type="";
    switch (e.detail.value.mtc_type){
      case "0":
      mtc_type="数据修订";
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
    wx.request({ 


      url: 'http://112.93.119.181:8090/zhyw/api/mtcadd/',
      method: 'post',
     
      data: util.json2Form({
        
        eqp_id: this.data.eqp_id,
        mtc_type: mtc_type,
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
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack({
          delta: 1         // 返回上一页
        });
      },
      fail: function (err) {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      }

    })
  },
  formReset: function (e) {
    e.detail.value.mtc_type=0,
       
       e.detail.value.description=""
  },

  styleChange:function(e)
  {
    this.setData({
      sindex: e.detail.value
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }

})