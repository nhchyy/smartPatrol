
var app = getApp()
Page({
    data: {
        warnList: [{ patrolWarnID: 1, title: "你好和好" }, { patrolWarnID: 2, title: "你好sas和好"}],
    },
    bindSelectUser:function (e) {
        wx.navigator({
            id:e.currentTarget.dataset.id
        });
    },
    bindGoWarnList:function () {
        /*wx.navigateTo({
            url: '../index/msg' + '?' + 'delta=' + 1 + '&msg=' + result.data.msg
        })*/
    },
    getPatrolUserWarnList:function (departmentID) {
        let that = this;
        // app.request({
        //     url: config.service.moduleUrl + '/warn/getPatrolUserWarnList',
        //     data:{
        //     },
        //     method: 'POST',
        //     login: false,
        //     success(result) {
        //         if(result.data.code != 1) {
        //             return;
        //         }
        //         that.setData({
        //             warnList:result.data.content.warnList
        //         });
        //     }
        // });
    },
    onLoad: function () {
        this.getPatrolUserWarnList();

    }
})
