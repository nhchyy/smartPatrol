var app = getApp()
Page({
  data: {
    departmentList: [
      {
        departmentID: 1,
        departmentName: "运维部"

      }

    ],
    name: "",
    mobile: "",
    warnID: 0,
    warnDetail: {},
    roleID: 1,
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
      roleID: 1,
      name: app.globalData.name,
      mobile: app.globalData.mobile

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
  },

  bindInput: function (e) {
    let warnDetail = this.data.warnDetail;
    warnDetail.ctext = e.detail.value;
    this.setData({
      warnDetail: warnDetail
    })
  },
  submitHandle: function () {




    let that = this;
    var warnForm = {}
    warnForm.yhid = this.data.warnDetail.id
    warnForm.mobile = this.data.warnDetail.cmobile
    warnForm.name = this.data.warnDetail.cname
    warnForm.clyj = this.data.warnDetail.ctext
    


    wx.request({
      url: app.globalData.serverUrl + '/zhyw/api/yhedit/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
        // 'Content-Type': 'application/json'
      },
      data: warnForm,
      method: 'POST',
      success: function (res) {
        console.log(res);
        wx.navigateBack({
          delta: 1
        })


      }
    })
  }


  })
