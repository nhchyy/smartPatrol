

var app = getApp()
Page({
    data: {
        warnList: [],
        type: 1,
        roleID: 1,
        nolistMessage: '没有工单'
    },

    /** 巡检人 **/
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


    /** 巡检负责人 **/
    bindGetUnOfferWarnList: function () {
        this.setData({
            type: 1
        })
        this.getWarnList('getUnOfferWarnList')
    },
    bindGetHadOfferWarnList: function () {
        this.setData({
            type: 2
        })
        this.getWarnList('getHadOfferWarnList')
    },
    bindGetHadSubmitWarnList2: function () {
        this.setData({
            type: 3
        })
        this.getWarnList('getHadSubmitWarnListFrom')
    },
    bindGetHadDealWarnList2: function () {
        this.setData({
            type: 4
        })
        this.getWarnList('getHadDealWarnList')
    },


    /** 总负责人 **/
    bindGetUnOfferWarnList3: function () {
        this.setData({
            type: 1
        })
        this.getWarnList('getUnOfferWarnList')
    },
    bindGetHadOfferWarnList3: function () {
        this.setData({
            type: 2
        })
        this.getWarnList('getHadOfferWarnList')
    },
    bindGetDealingWarnList: function () {
        this.setData({
            type: 3
        })
        this.getWarnList('getDealingWarnList')
    },
    bindGetHadDealWarnList3: function () {
        this.setData({
            type: 4
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
            data: { "mobile": "18688283883" },
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


        // app.request({
        //     url: app.globalData.serverUrl + '/zhyw/api/yhsel/',
        //     data: {"mobile":"18688283883"},
        //     method: 'POST',
        //     success(result) {
        //         if (result.data.code != 1) {
        //             if (result.data.code == -2) {
        //                 that.setData({
        //                     warnList: [],
        //                     nolistMessage: result.data.msg
        //                 });
        //             }
        //             return;
        //         }
        //         that.setData({
        //             warnList: result.data.content.warnList
        //         });
        //     }
        // });
    },
    /*getUncheckWarnList:function () {
        let that = this;
        app.request({
            url: app.globalData.serverUrl + '/warn/getUncheckWarnList',
            data:{
            },
            method: 'POST',
            login: true,
            success(result) {
                if(result.data.code != 1) {
                    return;
                }
                that.setData({
                    warnList:result.data.content.warnList
                });
            }
        });
    },
    getDealwithList:function () {
        let that = this;
        app.request({
            url: app.globalData.serverUrl + '/warn/getDealwithList',
            data:{},
            method: 'POST',
            login: true,
            success(result) {
                if(result.data.code != 1) {
                    return;
                }
                that.setData({
                    warnList:result.data.content.warnList
                });
            }
        });
    },*/
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

        
        

        if (this.data.type == 1) { this.getWarnList('getHadSubmitWarnList')}
        if (this.data.type == 2) { this.getWarnList('getUnDealWarnList')}
        if (this.data.type == 3) { this.getWarnList('getHadDealWarnList')}
        


    }
    ,
    onLoad: function () {
        this.setData({
            roleID: app.globalData.roleID
        });
    }
})
