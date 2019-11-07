// http://112.93.119.181:8090/zhyw/dimg/20191105142959694.png
// http://112.93.119.181:8090/zhyw/dimg/20191105142959586.png
// http://112.93.119.181:8090/zhyw/dimg/20191105142959695.png
// http://112.93.119.181:8090/zhyw/dimg/20191105155129837.png




var app = getApp()
Page({
  data: {
    warnID: 0,
    warnDetail: {
      title: '线路隐患',
      placeName: '忻州xxx',
      contentName: '',
      textDescription: '啊是多久啊饭卡阿斯弗啊师傅哈桑\nasfsasasdfaskfasfja',
      voiceDescription: '',
      photo: '',
      thumbs: ["http://112.93.119.181:8090/zhyw/dimg/20191105220824214.png",
        "http://112.93.119.181:8090/zhyw/dimg/20191105220824457.png",
        "http://112.93.119.181:8090/zhyw/dimg/20191105220824457.png",
        "http://112.93.119.181:8090/zhyw/dimg/20191105220824457.png",
        "http://112.93.119.181:8090/zhyw/dimg/20191105220824324.png"],
      name: '陈源一',
      updateTime: 0,
      cheskMsg: ["aaa"],
      checkUserMsg: {
        roleID: 0,
        userID: 0,
        checkName: '',
        status: 0,
        statusText: '',
        checkUpdateTime: ''
      },
      copyUserMsg: {
        copyName: ''
      }
    },
    roleID: 0,
    note: ''
  },
  //事件处理函数
  bindDealWarn: function () {
    // app.request({
    //   url: app.globalData.serverUrl + '/warn/dealWarn',
    //   data: {
    //     warnID: this.data.warnID
    //   },
    //   method: 'POST',
    //   login: true,
    //   success(result) {
    //     if (result.data.code != 1) {
    //       return;
    //     }
    //   }
    // });
  },
  bindOfferWarn: function () {
    // app.request({
    //   url: app.globalData.serverUrl + '/warn/offerWarn',
    //   data: {
    //     warnID: this.data.warnID,
    //     note: "这是一个来自巡检负责人的提议"
    //   },
    //   method: 'POST',
    //   login: true,
    //   success(result) {
    //     if (result.data.code != 1) {
    //       return;
    //     }
    //   }
    // });
  },
  bindSubmitWarn: function () {
    // app.request({
    //   url:   ,
    //   data: {
    //     warnID: this.data.warnID,
    //     note: "这是一个来自巡检负责人的上报"
    //   },
    //   method: 'POST',
    //   login: true,
    //   success(result) {
    //     if (result.data.code != 1) {
    //       return;
    //     }
    //   }
    // });
  },
  bindAgreeWarn: function () {
    // app.request({
    //   url: app.globalData.serverUrl + '/warn/agreeWarn',
    //   data: {
    //     warnID: this.data.warnID
    //   },
    //   method: 'POST',
    //   login: true,
    //   success(result) {
    //     if (result.data.code != 1) {
    //       return;
    //     }
    //   }
    // });
  },
  getWarnDetail: function (warnID) {
    let that = this;
    wx.request({
      url: app.globalData.serverUrl + '/zhyw/api/yhselid/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { id: warnID },
      method: 'POST',

      success(result) {
        if (result.data.errcode != 0) {
          return;
        }

        let aaa = result.data.yh[0];
        let bbb = result.data.path;
        let thumbs = [];

        bbb.forEach(function (item) {
          console.log(item.path);
          thumbs.push(item.path);
        })

        aaa.thumbs = thumbs;

        that.setData({
          warnDetail: aaa
        });

      }



    })


  },

  onLoad: function (option) {
    this.setData({
      warnID: option.id,
      roleID: 1
      // roleID:app.globalData.userInfo.roleID
    })


    this.getWarnDetail(option.id);
  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.warnDetail.thumbs // 需要预览的图片http链接列表
    })
  }

})
