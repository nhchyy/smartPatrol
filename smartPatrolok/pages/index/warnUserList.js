
var app = getApp()
Page({
    data: {
        placeContentList:[],
        contentIndex:0,
        thumbs:[],
        thumbsForDatabase:[],
        userList: [],
        option:{
            from:0
        },
        selectUserStorageName:''
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

    bindSelectUser:function (e) {
        let userList = this.data.userList;
        userList.forEach(function (item) {
            if(e.currentTarget.dataset.id == item.mobile) {
                item.selected = !item.selected;
            }
        });

        this.setData({
            userList:userList
        });
    },
   
    
    getDepartmentUserList: function (dep) {
        let that = this;
        wx.request({
            url: app.globalData.serverUrl + '/zhyw/api/userselall/',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
                // 'Content-Type': 'application/json'
            },
            data: { text: "" },
            method: 'POST',
            success: function (res) {
                console.log(res.data.list);
                console.log(Array.from(new Set(res.data.list.map(a => a.dep))));


               

                var aaa = res.data.list.filter(function (x) {
                    return x.dep == dep;

                }).map(a => {
                    a.selected = false
                    return a
                })



                // let { b, c, ...obj2 } = obj

                console.log(aaa)

                that.setData({
                    userList: aaa
                })




            }
        })

    },

    onLoad: function (option) {
        let that = this;
        this.setData({
            option:option
        });

        if(this.data.option.from == 1) {
            this.setData({
                selectUserStorageName: 'checkUser'
            });
        }
        else if(this.data.option.from == 2) {
            this.setData({
                selectUserStorageName: 'copyUser'
            });
        }

        //调用应用实例的方法获取全局数据
        this.getDepartmentUserList(option.dep);

    }
})
