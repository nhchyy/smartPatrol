let QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
let qqmapsdk;
// let amap = require("../../utils/amap");
var app = getApp()
Page({
    data: {
        types: ["光缆线路", "光交箱", "分线盒", "动力设备", "传输设备", "数据设备"],
        typesIndex: 0,
        xwz: "",
        loaction: {},
        userInfo: {},
        mapCtx: {},
        placeContentList: [],
        contentIndex: 0,
        thumbShow: false,
        thumbItemUrl: '',
        thumbs: [],
        thumbsForDatabase: [],
        warnForm: {},
        voice: '',
        checkUser: [
        ],
        copyUser: [],

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
        warnForm.xwt = e.detail.value;input
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

        this.data.warnForm.ximgpath = photoList

        wx.request({
            url: app.globalData.serverUrl + '/zhyw/api/yhadd/',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
                // 'Content-Type': 'application/json'
            },
            data: this.data.warnForm,
            method: 'POST',
            success: function (res) {
                console.log(res);
                wx.navigateBack({
                    delta: 1
                })


            }
        })

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
    
    onLoad: function (e) {
        let warnForm = this.data.warnForm;
        warnForm.xmobile = app.globalData.mobile
        warnForm.xname = app.globalData.name
        warnForm.xtype = this.data.types[this.data.typesIndex];
        this.setData({
            warnForm: warnForm
        })

        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function (loaction) {
                let warnForm = that.data.warnForm;
                warnForm.xjd = loaction.longitude;
                warnForm.xwd = loaction.latitude;
                that.setData({
                    warnForm: warnForm
                })

            }
        });
        qqmapsdk = new QQMapWX({ key: 'XYNBZ-ZC2LK-SIGJY-ACCBQ-ISWY6-MMBFN' });
        qqmapsdk.reverseGeocoder({
            success: function (addressRes) {
                console.log(addressRes);
                let warnForm = that.data.warnForm;
                warnForm.xwz = addressRes.result.formatted_addresses.recommend;
                that.setData({
                    warnForm: warnForm
                })
            }
        });
        wx.setStorageSync("checkUser", []);
        // amap.getRegeo()
        //     .then(d => {
        //         console.log(d);
        //         this.setData({
        //             xwz: d[0].desc
        //         });


        //     })
        //     .catch(e => {
        //         console.log(e);
        //     })


    },

    bindChangeLocation: function () {
        var that = this
        wx.chooseLocation({
            success: function (res) {
                let warnForm = that.data.warnForm;
                warnForm.xjd = res.longitude;
                warnForm.xwd = res.latitude;
                warnForm.xwz = res.address;
                that.setData({
                    warnForm: warnForm
                })
            },
            fail: function (err) {
                console.log(err)
            }
        });
    },

    bindTypeChange: function (e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            typesIndex: e.detail.value
        })

        let warnForm = this.data.warnForm;
        warnForm.xtype = this.data.types[e.detail.value];
        this.setData({
            warnForm: warnForm
        })
    },
    onShow: function () {
        let that = this;

        //checkUser
        try {
            let checkUser = wx.getStorageSync('checkUser');
            if (checkUser) {
                this.setData({
                    checkUser:checkUser
                })

                let warnForm = that.data.warnForm;
                warnForm.cname = checkUser[0].name;
                warnForm.cmobile = checkUser[0].mobile;
                that.setData({
                    warnForm: warnForm
                })
            }
        } catch (e) {}

    }
})
