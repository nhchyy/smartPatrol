// shoupage/shoupage.js
Page({
  data: {},
  // 打开设备维护
  tapActionSheet1: function (event) {
    wx.showActionSheet({
      itemList: ['故障上报', '故障工单查询'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  // 打开信息查询
  tapActionSheet3: function (event) {
    wx.showActionSheet({
      itemList: ['二维码扫码查询信息', '仓库信息'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})