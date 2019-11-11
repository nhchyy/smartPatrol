var app = getApp()
Page({
    data: { userList: [] },

    bindfinish: function () {
        let userList = [];
        this.data.userList.forEach(function (item) {
            if (item.selected) {
                userList.push(item);
            }
        });
        wx.setStorageSync('checkUser', userList);
        wx.navigateBack({
            delta: 2
        })
    },

    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        let userList = this.data.userList;
        userList.forEach(function (item) {
            item.selected = item.mobile === e.detail.value
        });

        this.setData({
            userList: userList
        });
    },

    getDepartmentUserList: function (dep) {
        let that = this;
        wx.request({
            url: app.globalData.serverUrl + '/zhyw/api/userselall/',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: { text: "" },
            method: 'POST',
            success: function (res) {
                var userList = res.data.list.filter(x => x.dep == dep).map(a => {
                    a.selected = false
                    return a
                })
                that.setData({
                    userList: userList
                })
            }
        })
    },

    onLoad: function (option) {
        let that = this;
        this.setData({
            option: option
        });
        this.getDepartmentUserList(option.dep);
    }
})
