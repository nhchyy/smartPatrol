var app = getApp()

Page({
    data: {
        departmentList: [],
        
    },

    bindGoWarnUserList: function (e) {
        console.log(e.currentTarget.dataset)
        wx.navigateTo({
            url: '../index/warnUserList' + '?' + 'dep=' + e.currentTarget.dataset.dep
        })
    },

    getUsualUserList: function () {
        let that = this;
        wx.request({
            url: app.globalData.serverUrl + '/zhyw/api/userselall/',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: { text: "" },
            method: 'POST',
            success: function (res) {
                console.log(res.data.list);
                that.setData({
                    departmentList: Array.from(new Set(res.data.list.map(a => a.dep)))
                })
            }
        })
    },
    
    onLoad: function () {
        this.getUsualUserList();
    }
})
