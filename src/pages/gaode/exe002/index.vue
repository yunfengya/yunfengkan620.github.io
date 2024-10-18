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
                this.map = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "3D", // 是否为3D地图模式
                    zoom: 11, // 初始化地图级别
                    center: [116.397428, 39.90923], // 初始化地图中心点位置
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
