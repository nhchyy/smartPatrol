var app = getApp()
Page({
    data: {
        warnList: [],
        type: 1,
        roleID: 1,
        nolistMessage: '没有工单'
    },

    bindGetHadSubmitWarnList: function () {
        this.setData({
            type: 1
        })
        this.getWarnList('getHadSubmitWarnList')
    },

    bindGetUnDealWarnList: function () {
        this.setData({
            type: 2
        })
        this.getWarnList('getUnDealWarnList')
    },

    bindGetHadDealWarnList: function () {
        this.setData({
            type: 3
        })
        this.getWarnList('getHadDealWarnList')
    },

    getWarnList: function (action) {
        let that = this;
        wx.request({
            url: app.globalData.serverUrl + '/zhyw/api/yhsel/',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: { "mobile": app.globalData.mobile },
            method: 'POST',
            success(result) {
                if (result.data.errcode != 0) {
                    that.setData({
                        warnList: [],
                        nolistMessage: result.data.errmsg
                    });
                    return;
                }

                var warnList = []
                if (action == 'getHadSubmitWarnList') { warnList = result.data.yh_log }
                if (action == 'getUnDealWarnList') {
                    warnList = result.data.yh_log.filter(function (o) {
                        return (o.xstate == 0) && (o.cmobile == app.globalData.mobile);
                    })

                }
                if (action == 'getHadDealWarnList') {
                    warnList = result.data.yh_log.filter(function (o) {
                        return o.xstate == 1;
                    })
                }

                that.setData({
                    warnList: warnList
                });
                wx.setStorageSync("warnList", warnList);
            }
        })
    },

    bindGoMap: function (e) {
        wx.navigateTo({
            url: '../index/map'
        })
    },

    bindGoWarnDetail: function (e) {
        wx.navigateTo({
            url: '../index/warnDetail?id=' + e.currentTarget.dataset.id
        })
    },

    onShow: function () {
        if (this.data.type == 1) { this.getWarnList('getHadSubmitWarnList') }
        if (this.data.type == 2) { this.getWarnList('getUnDealWarnList') }
        if (this.data.type == 3) { this.getWarnList('getHadDealWarnList') }
    },

    onLoad: function () {
        this.setData({
            roleID: app.globalData.roleID
        });
    }
})
