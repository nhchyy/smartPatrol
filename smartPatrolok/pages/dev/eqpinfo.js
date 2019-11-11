// pages/dev/eqpinfo.js
const app = getApp();
var util = require('../../utils/util.js');
Page({
  /*
     id:设备编号
     open：控制显示隐藏
     navbar:选项卡选项名
     currentTab：选项卡选项值
     listlog：维护日志信息数组
     touchS:滑动事件开始坐标
     touchE:滑动事件终止坐标
     angle: 滑动角度
   */
  data: {
    id: "",
    open: false,
    navbar: ['设备信息', '维护日志', '备注信息'],
    currentTab: 0,
    listlog: [],
    touchS: [0, 0],
    touchE: [0, 0],
    angle: ""
  },

  //页面加载时获取前页传来的设备编号
  onLoad: function(options) {
    var that = this;
    let eqpid = options.id;
    // let eqpid ="10000000";
    that.setData({
      id: eqpid,
      open: false
    })

  },

  // 跳转函数，跳转到本设备数据修订页面
  dataMod: function() {
    wx.navigateTo({
      url: '../dev/eqpmod?id=' + this.data.id,
    })
  },

  // 跳转函数，跳转到本设备的维护日志页面
  logList: function() {
    wx.navigateTo({
      url: '../dev/loglist?id=' + this.data.id,
    })
  },

  // 点击显示/隐藏详细信息
  kindToggle: function(e) {
    this.setData({
      open: !this.data.open,
    });
  },

  // 监听页面显示，回到该页面时查询一次数据库。
  onShow: function() {
    var that = this;
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/equipment/',
      method: 'post',
      data: util.json2Form({
        id: that.data.id
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        that.setData({
          list: res.data,
          open: false
        })
      },
      fail: function(err) {
        // console.log("失败")
      }
    })
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
      success: function(res) {
        console.log(res.data);
        if (res.data.errcode == "0") {
          listshow = res.data.mtclog;
        }
        if (listshow != []) {
          for (var i = 0; i < listshow.length; i++) {
            listshow[i] = that.extend(listshow[i], {
              open: false
            });
          }
        }
        that.setData({
          listlog: listshow
        })
      },
      fail: function(err) {
        // console.log("失败")
      }
    })
  },

  //选项卡点击事件。
  navbarTap: function(e) {
    var that = this
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })

  },

  // 跳转函数，跳转到信息修改界面。
  dataMod: function() {
    wx.navigateTo({
      url: '../dev/eqpmod?id=' + this.data.id,
    })
  },

  // 点击打开查看详细日志。
  clickOpen: function(e) {
    var id = e.currentTarget.id,
      listlog = this.data.listlog;
    for (var i = 0, len = listlog.length; i < len; ++i) {
      if (listlog[i].id == id) {
        listlog[i].open = !listlog[i].open
      } else {
        listlog[i].open = false
      }
    }
    this.setData({
      listlog: listlog
    });
  },

  // 跳转函数，跳转到维护添加界面
  addLog: function() {
    var id = this.data.id;
    wx.navigateTo({
      url: '../dev/logadd?id=' + this.data.id,
    })
  },

  // 对象数据扩展
  extend: function(data, dataExtend) {
    var res = {};
    for (var key in data) {
      res[key] = data[key];
    }
    for (var key in dataExtend) {
      res[key] = dataExtend[key];
    }
    return res;
  },

  // 监听手指滑动开始，获取坐标
  touchstart: function(e) {
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.setData({

      touchS: [sx, sy]
    })
  },

  // 监听手指滑动事件获取坐标
  touchmove: function(e) {
    // let ex = e.touches[0].pageX;
    // let ey = e.touches[0].pageY;
    let startX = this.data.touchS[0], //开始X坐标
      startY = this.data.touchS[0], //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标

    //获取滑动角度
    this.data.angle = this.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
    this.data.touchE = [touchMoveX, touchMoveY]
  },

  // 监听手指滑动事件结束，判断滑动防线改变当前tap
  touchend: function() {
    let idx = this.data.currentTab;
    let start = this.data.touchS
    let end = this.data.touchE
    //滑动超过45度角 return
    if (Math.abs(this.data.angle) > 45) return;

    if (start[0] < end[0] - 50) { //右滑
      this.setData({
        currentTab: idx == 3 - 1 ? idx : idx + 1,
      })
    } else if (start[0] > end[0] + 50) {
      this.setData({

        currentTab: idx == 0 ? 0 : idx - 1,
      })
      // console.log('左滑')
    }
    // if (start[0] < end[0] - 70) {
    //   this.setData({
    //     currentTab: idx == 3 - 1 ? idx : idx + 1,
    //   })
    //   // console.log('右滑')
    // } else if (start[0] > end[0] + 70) {
    //   this.setData({

    //     currentTab: idx == 0 ? 0 : idx - 1,
    //   })
    //   // console.log('左滑')
    // } else {
    //   // console.log('静止')
    // }
  },
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  }

})