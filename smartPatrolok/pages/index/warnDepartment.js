
function unique(arr) {
    return Array.from(new Set(arr))
}

var app = getApp()

Page({
    data: {
        placeContentList: [],
        contentIndex: 0,
        thumbs: [],
        thumbsForDatabase: [],
        departmentList: [
            {
                departmentID: 1,
                departmentName: "运维部"

            },
            {
                departmentID: 2,
                departmentName: "财务部"

            }

        ],
        userList: [
            {
                userID: 1,
                userName: "陈源一",
                selected: true

            },
            {
                userID: 2,
                userName: "赵峰",
                selected: false

            }
        ],
        option: {
            from: 0
        },
        selectUserStorageName: ''
    },
    bindGoWarnUserList: function (e) {
        console.log(e.currentTarget.dataset)

        wx.navigateTo({
            
            url: '../index/warnUserList' + '?' + 'dep=' + e.currentTarget.dataset.dep + '&from=' + this.data.option.from
        })
    },
    
    bindOk: function (e) {
        var delta = e.target.dataset.delta;
        wx.navigateTo({
            url: '../index/msg' + '?' + 'delta=' + delta,
        })
    },
   
    bindPlayAudio: function () {
        let that = this;
        wx.playVoice({
            filePath: that.data.warnForm.voiceDescription,
            complete: function () {

            }
        })
    },
    bindRangeChange: function (e) {
        this.setData({
            contentIndex: e.detail.value
        })
    },
    bindInput: function (e) {
        let warnForm = this.data.warnForm;
        warnForm.textDescription = e.detail.value;
        this.setData({
            warnForm: warnForm
        })
    },
    submitPatrol: function () {
        let that = this;
        let contentID = this.data.placeContentList.length ? this.data.placeContentList[this.data.contentIndex].contentID : 0;

        let warnForm = {
            contentID: contentID,
            textDescription: that.data.warnForm.textDescription,
            voiceDescription: that.data.warnForm.voiceDescription,
            photoList: that.data.thumbsForDatabase
        };

        console.log(warnForm);
        // app.request({
        //     url: app.globalData.serverUrl + '/patrol/submitPatrol',
        //     data: warnForm,
        //     method: 'POST',
        //     login: false,
        //     success(result) {
        //         if (result.data.code != 1) {
        //             return;
        //         }
        //         that.setData({
        //             placeContentList: result.data.content.placeContentList
        //         });
        //     }
        // });
    },
    
    getUsualUserList: function () {
        let that = this;
        wx.request({
            url: app.globalData.serverUrl + '/zhyw/api/userselall/',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
                // 'Content-Type': 'application/json'
            },
            data: {text: ""},
            method: 'POST',
            success: function (res) {
                console.log(res.data.list);
                console.log(Array.from(new Set(res.data.list.map(a => a.dep))));
                that.setData({
                    departmentList: Array.from(new Set(res.data.list.map(a => a.dep)))
                })

                var aaa=res.data.list.filter(function (x) {
                    return x.dep == "数据专业";
                    
                }).map(a=>a.name)

                console.log(aaa)
                 



            }
        })

    },
    bindSelectUser: function (e) {
        let userList = this.data.userList;
        userList.forEach(function (item) {
            if (e.currentTarget.dataset.id == item.userID) {
                item.selected = !item.selected;
            }
        });

        this.setData({
            userList: userList
        });
    },
    bindfinish: function () {
        let userList = [];
        this.data.userList.forEach(function (item) {
            if (item.selected) {
                userList.push(item);
            }
        });
        wx.setStorageSync(this.data.selectUserStorageName, userList);

        wx.navigateBack({
            delta: 1
        })
    },
    onLoad: function (option) {
        let that = this;
        this.setData({
            option: option
        });
        this.data.option.from = 1
        if (this.data.option.from == 1) {
            this.setData({
                selectUserStorageName: 'checkUser'
            });
        }
        else if (this.data.option.from == 2) {
            this.setData({
                selectUserStorageName: 'copyUser'
            });
        }

        this.getUsualUserList();
    }
})
