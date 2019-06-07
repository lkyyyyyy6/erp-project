<template>
  <div id="container"></div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.397428, 39.90923], //地图中心点
        zoom: 12 //地图显示的缩放级别
      });
      //添加构造器
      AMap.plugin(
        ["AMap.Driving", "AMap.Transfer", "AMap.Walking"],
        function() {
          map.addControl(new AMap.Driving());
          map.addControl(new AMap.Transfer());
          map.addControl(new AMap.Walking());
        }
      );
      AMap.plugin("AMap.Driving", function() {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME
        });

        var startLngLat = [116.379028, 39.865042];
        var endLngLat = [116.427281, 39.903719];

        driving.search(startLngLat, endLngLat, function(status, result) {
          // 未出错时，result即是对应的路线规划方案
        });
      });
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);

      // 移除已创建的 marker
      map.remove(marker);
    }
  }
};
</script>

<style>
#container {
  width: 100%;
  height: 100%;
}
</style>
