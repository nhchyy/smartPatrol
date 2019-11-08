
let amap = require("../../utils/amap");
var app = getApp()
Page({
    data: {
        xwz:"",
        userInfo: {},
        mapCtx: {},
        placeContentList: [],
        contentIndex: 0,
        thumbShow: false,
        thumbItemUrl: '',
        thumbs: [],
        thumbsForDatabase: [],
        warnForm: {
            contentID: 0,
            textDescription: '',
            voiceDescription: '',
            photoList: [],
            checkUser: [],
            copyUser: []
        },
        voice: '',
        checkUser: [],
        copyUser: [],
        loaction: {}
    },
    bindUploadFile: function () {
        let that = this;
        wx.chooseImage({
            count: 3, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                if (that.data.thumbs.length > 2) {
                    wx.showModal({
                        title: '提示',
                        content: '最能只能传三张图片',
                        showCancel: false
                    })
                    return;
                }

                //更新显示
                res.tempFilePaths.forEach(function (item, index) {

                    //更新显示
                    let thumbs = that.data.thumbs;
                    thumbs.push(item)
                    that.setData({
                        thumbs: thumbs
                    });

                    //更新数据库

                    wx.uploadFile({
                        url: app.globalData.serverUrl + '/zhyw/api/yhload/', //仅为示例，非真实的接口地址
                        filePath: item,
                        name: 'file',
                        formData: {},
                        success: function (_res) {
                            console.log(_res);
                            let data = JSON.parse(_res.data);
                            that.pushThumbForDatabase(data.path, item);
                            /*                            thumbsForDatabase.push(data.content.imgUrl);
                                                        console.log(index);
                                                        if(index == res.tempFilePaths.length - 1) {
                                                            that.setData({
                                                                thumbsForDatabase:thumbsForDatabase
                                                            });
                                                        }*/
                        },
                        fail: function (_res) {
                            console.log(_res);
                        }
                    })
                });
            }
        })
    },
    bindGoCheckUser: function () {
        wx.navigateTo({
            url: '../index/warnDepartment' + '?' + 'from=' + 1,
        })
    },
    bindOk: function (e) {
        var delta = e.target.dataset.delta;
        wx.navigateTo({
            url: '../index/msg' + '?' + 'delta=' + delta,
        })
    },




    bindInput: function (e) {
        let warnForm = this.data.warnForm;
        warnForm.textDescription = e.detail.value;
        this.setData({
            warnForm: warnForm
        })
    },
    bindShowThumb: function (e) {
        let that = this;
        let thumbItemUrl = '';
        this.data.thumbs.forEach(function (item) {
            if (item == e.currentTarget.dataset.url) {
                that.data.thumbsForDatabase.forEach(function (_item) {
                    if (item == _item.local) {
                        thumbItemUrl = _item.url;
                    }
                });
            }
        });

        this.setData({
            thumbItemUrl: thumbItemUrl,
            thumbShow: true
        });
    },
    submitPatrol: function () {




        let that = this;
        let contentID = this.data.placeContentList.length ? this.data.placeContentList[this.data.contentIndex].contentID : 0;
        let checkUserID = [];
        let copyUserID = [];
        this.data.checkUser.forEach(function (item) {
            checkUserID.push(item.userID);
        });
        this.data.copyUser.forEach(function (item) {
            copyUserID.push(item.userID);
        });

        let photoList = [];

        this.data.thumbs.forEach(function (item) {
            that.data.thumbsForDatabase.forEach(function (_item) {
                if (item == _item.local) {
                    photoList.push(_item.url);
                }
            });
        });

        let warnForm = {
            xtype: '线路',
            xwz: that.data.xwz,
            xwt: that.data.warnForm.textDescription,
            ximgpath: photoList,
            xmobile: app.globalData.mobile,
            xname: app.globalData.name,
            xjd: this.data.loaction.longitude,
            xwd: this.data.loaction.latitude
        };

        wx.request({
            url: app.globalData.serverUrl + '/zhyw/api/yhadd/',
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

        // app.request({
        //     url: app.globalData.serverUrl + '/patrol/submitPatrol',
        //     data:warnForm,
        //     method: 'POST',
        //     login: true,
        //     success(result) {
        //         if(result.data.code != 1) {
        //             return;
        //         }
        //         that.setData({
        //             placeContentList:result.data.content.placeContentList
        //         });
        //     }
        // });
    },
    pushThumbForDatabase: function (item, index) {
        let thumbsForDatabase = this.data.thumbsForDatabase;
        thumbsForDatabase.push({
            url: item,
            local: index
        });
        this.setData({
            thumbsForDatabase: thumbsForDatabase
        });
    },
    getPlaceContentList: function () {
        let that = this;
        // app.request({
        //     url: app.globalData.serverUrl + '/place/getPlaceContentList',
        //     data:{},
        //     method: 'POST',
        //     login: true,
        //     success(result) {
        //         if(result.data.code != 1) {
        //             return;
        //         }
        //         that.setData({
        //             placeContentList:result.data.content.placeContentList
        //         });
        //     }
        // });
    },
    onShow: function () {
        let that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function (loaction) {
                that.setData({
                    loaction: loaction
                });
            }
        });


        //copyUser
        try {
            let copyUser = wx.getStorageSync('copyUser');
            if (copyUser) {
                this.setData({
                    copyUser: copyUser
                })
            }
        } catch (e) { }

        //checkUser
        try {
            let checkUser = wx.getStorageSync('checkUser');
            if (checkUser) {
                this.setData({
                    checkUser: checkUser
                })
            }
        } catch (e) { }

        //调用应用实例的方法获取全局数据
        this.getPlaceContentList();

    },
    onLoad(e) {
        amap.getRegeo()
            .then(d => {
                console.log(d);
                this.setData({
                    xwz: d[0].desc
                });

                
            })
            .catch(e => {
                console.log(e);
            })
    }
})
