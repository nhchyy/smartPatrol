// pages/dev/eqplist.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: "",
    listb: [],
   
      styles: ["请选择","服务器", "交换机", "传输设备", "交换设备","基站设备"],
    sindex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
  },

  detail: function (e) {
  
  console.log(e);
  wx.navigateTo({
    url: 'detailinfo?id=' + e.currentTarget.id,

    success: function() {
      console.log('接口调用成功')

    },
    fail: function() {
      console.log('接口调用成功')
    },
    complete: function() {
      console.log('调用结束，调用成功失败都会执行')
    }
  })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  searchSubmit: function (e) {
  
      const that = this, 
        app = getApp();
  
    wx.showToast({
      title: '搜索中',
      icon: 'loading'
    });
    let tpe ="";
    console.log( "返回结果"+e.detail.value);
      switch ( tpe = e.detail.value.type) {
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
      console.log(e);
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

      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
       
        console.log(res.data);
        that.setData({
          list: res.data.eqp,
          listb: res.data.eqp
        })


        wx.hideToast();
      },
      fail: function (err) {
        console.log("失败")
      }

    })
     
     
         
      
    
  },

 styleChange: function (e) {
    this.setData({
      sindex: e.detail.value
    })
  },
 resetSindex: function (e) {
    this.setData({
      sindex:0
    })
  },

 
})