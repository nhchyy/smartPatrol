// pages/apitext/apitext.js

Page({
  data: {


    // 3:需在data中声明一个接收数据的变量。
    list1: [],
    list2: [],
    list3: [],

    // 轮播图数据
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    imgurl: [{
      url: '/images/1.jpg'
    }, {
      url: '/images/2.jpg'
    }, {
      url: '/images/3.jpg'
    }],
    currentTab: 0,

  },

  /**
   * 新闻点击操作
   */
  navNews: function (event) {
    console.log("按钮：" + event.currentTarget.dataset.navindex)
    var navindex = event.currentTarget.dataset.navindex
    //需要修改currentTab变量
    this.setData({
      currentTab: navindex

      // currentTab:navindex
    })
    console.log("当前navindex" + navindex)
  },

  swiperView: function (event) {
    //console.log(event)
    var current = event.detail.current
    this.setData({
      currentTab: current
    })
  },
  // 跳转到detail详情页
  goDetail(event) {
    var newid = event.currentTarget.dataset.newid;
    // var newid = event.currentTarget.id
    console.log(newid);
    // console.log(event);
    console.log("当前对应的id:" + newid);
    wx.navigateTo({
      url: '../menhu/dettext?newid=' + newid,
    });

  },


  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/art/',
      header: {
        'content-type': 'application/json'
      },
      method: "get",
      data: {
        leib: 1,

      },
      success: res => {
        //1:在控制台打印一下返回的res.data数据
        // console.log(res.data.art[0].title)
        //2:在请求接口成功之后，用setData接收数据
        this.setData({
          //第一个data为固定用法，第二个data是json中的data
          list1: res.data.art
        })
      }
    })

    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/art/',
      header: {
        'content-type': 'application/json'
      },
      method: "get",
      data: {
        leib: 3,

      },
      success: res => {
        //1:在控制台打印一下返回的res.data数据
        // console.log(res.data.art[0].title)
        //2:在请求接口成功之后，用setData接收数据
        this.setData({
          //第一个data为固定用法，第二个data是json中的data
          list2: res.data.art
        })
      }
    })


    wx.request({
      url: 'http://112.93.119.181:8090/zhyw/api/art/',
      header: {
        'content-type': 'application/json'
      },
      method: "get",
      data: {
        leib: 2,

      },
      success: res => {
        //1:在控制台打印一下返回的res.data数据
        // console.log(res.data.art[0].title)
        //2:在请求接口成功之后，用setData接收数据
        this.setData({
          //第一个data为固定用法，第二个data是json中的data
          list3: res.data.art
        })
      }
    })

  },
})