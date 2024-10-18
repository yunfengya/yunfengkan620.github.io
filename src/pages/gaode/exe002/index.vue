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
        initAMap() {
            window._AMapSecurityConfig = {
                securityJsCode: "16650193f5dbeb0d9c804c1cbcd081f4",
            };
            AMapLoader.load({
                key: "d49126ab4c25960612aa4c0e60976654", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
            }).then((AMap) => {
                // this.map = new AMap.Map("container", {
                //     // 设置地图容器id
                //     viewMode: "3D", // 是否为3D地图模式
                //     zoom: 11, // 初始化地图级别
                //     center: [116.397428, 39.90923], // 初始化地图中心点位置
                // });

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
                });
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
</style>
