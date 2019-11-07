// pages/member/fankui.js
Page({

  data: {
    message: ""
  },

  onKeyInput: function (e) {
    this.setData({
      message: "你输入的内容是：" + e.detail.value
    })
  },

  // 打开 模态对话框
  tapModal: function (event) {

    wx.showModal({
      title: '提示',
      content: '是否提交？',
      // showCancel: false,
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
})