Page({
    bindQrcode: function () {
        var that = this;
        var id = "";
        wx.scanCode({
            success: (res) => {
                id = res.result;
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
                wx.navigateTo({
                    url: '../dev/eqpinfo?id=' + id,

                })
            },
            fail: (res) => {
                wx.showToast({
                    title: '失败',
                    icon: 'success',
                    duration: 2000
                })
            },
            complete: (res) => {
            }
        })
    },

    bindDev: function () {
        wx.navigateTo({
            url: '../dev/eqplist'
        })
    },

    bindCar: function () {
        wx.navigateTo({
            url: '../cheliang/index'
        })
    },

    bindDaka: function () {
        wx.navigateTo({
            url: '../daka/information'
        })
    },

    bindWarn: function () {
        wx.navigateTo({
            url: '../index/warn'
        })
    },

    bindWarnCheck: function () {
        wx.navigateTo({
            url: '../index/warnCheck'
        })
    },

    bindClock: function () {
        wx.navigateTo({
            url: '../daka/clock'
        })
    }
})
