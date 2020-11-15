var app = getApp()
Page({
  data: {
    name: "",
    mobile: "",
    warnID: 0,
    warnDetail: {},
    roleID: 1
  },

  getWarnDetail: function (warnID) {
    let that = this;
    wx.request({
      url: app.globalData.serverUrl + '/zhyw/api/yhselid/',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { id: warnID },
      method: 'POST',

      success(result) {
        if (result.data.errcode != 0) {
          return;
        }
        let warnDetail = result.data.yh[0];
        let path = result.data.path;
        let thumbs = [];
        path.forEach(function (item) {
          console.log(item.path);
          thumbs.push(item.path);
        })
        warnDetail.thumbs = thumbs;
        that.setData({
          warnDetail: warnDetail
        });
      }
    })
  },

  onLoad: function (option) {
    this.setData({
      warnID: option.id,
      roleID: app.globalData.roleID,
      name: app.globalData.name,
      mobile: app.globalData.mobile
    })
    this.getWarnDetail(option.id);
  },

  previewImage: function (e) {
    // debugger;
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
      header: { "Content-Type": "application/x-www-form-urlencoded" },
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
