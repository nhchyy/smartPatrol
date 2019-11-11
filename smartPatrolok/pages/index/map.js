Page({

  /**
   * 页面的初始数据
   */
  data: {

    warnList: [],
    latitude: 38.499081,
    longitude: 112.697517,
   
    mapWidth: '',
    mapHeight: ''

  },
  toaddress: function (e) {
    console.log(e)
    var id = e.markerId
    console.log(id)
    // wx.openLocation({
    //   latitude: this.data.markers[id].latitude,
    //   longitude: this.data.markers[id].longitude,
    // })
    wx.navigateTo({
      url: '/pages/index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindGoView: function (e) {
    wx.navigateBack({
      delta: 1 // 返回上一页
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sy = wx.getSystemInfoSync(),
      mapWidth = sy.windowWidth * 2,
      mapHeight = sy.windowHeight * 2;
    this.setData({
      mapWidth: mapWidth,
      mapHeight: mapHeight
    })
    let warnList = wx.getStorageSync('warnList')
    this.setData({
      warnList: warnList
    })


    var markers = warnList.map(a => {
      var marker = {}
      marker.id = a.id
      marker.latitude = a.xwd
      marker.longitude = a.xjd
      marker.alpha = 0.8

      var callout = {
        content: "",
        fontSize: 15,
        padding: 10,
        display: 'BYCLICK',
        textAlign: 'left',
        borderRadius: 10,
        borderColor:'#D3D3D3',
        borderWidth: 2,
      }
      callout.content = "类型：" + a.xtype + "\n地点：" + a.xwz + "\n描述：" + a.xwt + "\n上报人：" + a.xname + "\n日期：" + a.xtime
      marker.callout = callout
      return marker
    })

    this.setData({
      markers: markers
    })








  }
})
