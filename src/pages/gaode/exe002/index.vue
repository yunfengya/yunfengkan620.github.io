<template>
    <div class="contain_box">
        <div id="container"></div>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
    name: "index",
    data() {
        return {
            // 遮罩层，用于加载时显示的状态
            loading: true,
        };
    },
    mounted() {
        this.initAMap();
        
    },
    unmounted() {
        this.map?.destroy();
    },
    beforeDestroy() {

    },
    methods: {
        // 清除标记点的方法
        clearMarker() {
            if (this.marker) {
                this.map.remove(this.marker);
                this.marker = null;
            }
        },
        initAMap() {
            window._AMapSecurityConfig = {
                securityJsCode: "16650193f5dbeb0d9c804c1cbcd081f4",
            };
            AMapLoader.load({
                key: "d49126ab4c25960612aa4c0e60976654", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
            }).then((AMap) => {

                const layer = new AMap.createDefaultLayer({
                    zooms: [3, 20], //可见级别
                    visible: true, //是否可见
                    opacity: 1, //透明度
                    zIndex: 0, //叠加层级
                });
                // 3d
                this.map = new AMap.Map('container', {
                    mapStyle: "amap://styles/normal", //设置地图的显示样式 normal whitesmoke grey dark light graffiti
                    pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
                    viewMode: '3D', //地图模式
                    rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
                    pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
                    zoom: 17, //初始化地图层级
                    rotation: -15, //初始地图顺时针旋转的角度
                    zooms: [2, 20], //地图显示的缩放级别范围
                    center: [116.333926, 39.997245], //初始地图中心经纬度
                    layers: [layer], //layer为创建的默认图层
                });

                // 添加标记点
                const markerContent = `
                    <div class="custom-content-marker">
                        <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
                        <div class="close-btn" onclick="clearMarker()">X</div>
                    </div>
                `;
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(116.333926, 39.997245), // 标记点位置
                    title: '标记点标题', // 标记点标题，鼠标移到标记点上时显示
                    content: markerContent, // 自定义标记点内容
                    // 可以设置更多属性，如图标、偏移量等
                    offset: new AMap.Pixel(-13, -30), //以 icon 的 [center bottom] 为原点
                });
                // 将标记点添加到地图
                this.map.add(marker);
                // 保存标记点到组件实例，以便后续清除
                this.marker = marker;
                document.querySelector(".close-btn").onclick = this.clearMarker; //绑定点击事件

                // 为地图添加折线 Polyline
                const polyline = new AMap.Polyline({
                    path: [
                        [116.333926, 39.997245], // 折线的起点
                        [116.343926, 39.987245], // 折线的一个中间点
                        [116.353926, 39.997245], // 折线的另一个中间点
                        // 可以继续添加更多的点来构成折线
                    ],
                    strokeColor: "#FF33FF", // 折线颜色
                    strokeOpacity: 1, // 折线透明度
                    strokeWeight: 3, // 折线宽度
                    strokeStyle: "solid", // 折线样式，可以是 'solid'、'dashed' 等
                    lineJoin: 'round', // 折线拐点连接处样式，可以是 'miter'、'round'、'bevel'
                });
                // 将折线添加到地图
                this.map.add(polyline);

                // 为地图添加交通图层
                const traffic = new AMap.TileLayer.Traffic({
                    autoRefresh: true, //是否自动刷新，默认为false
                    interval: 180, //刷新间隔，默认180s
                });
                this.map.add(traffic); //通过add方法添加图层
                traffic.show(); //显示路况图层
                // traffic.hide(); //隐藏路况图层

                //异步加载控件
                AMap.plugin('AMap.ToolBar', () => {
                    var toolbar = new AMap.ToolBar(); //缩放工具条实例化
                    this.map.addControl(toolbar); //添加控件
                });
                toolbar.show(); //缩放工具展示
                // toolbar.hide(); //缩放工具隐藏


                
                // console.log(this.map);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>

<style scoped lang="scss">
/* 外部容器的样式，100% 占满父容器 */
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    #container {
        width: 100%;
        height: 100%;
    }
}

.custom-content-marker {
    position: relative;
    width: 25px;
    height: 34px;
}

.custom-content-marker img {
    width: 100%;
    height: 100%;
}

.custom-content-marker .close-btn {
    position: absolute;
    top: -6px;
    right: -8px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    background: #ccc;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 15px;
    box-shadow: -1px 1px 1px rgba(10, 10, 10, .2);
}

.custom-content-marker .close-btn:hover {
    background: #666;
}
</style>
