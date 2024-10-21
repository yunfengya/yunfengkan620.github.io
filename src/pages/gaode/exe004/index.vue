<template>
    <div class="contain_box">
        <div id="container"></div>
        <div id="panel"></div>
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
            map: null,
        };
    },
    mounted() {
        this.initAMap();
    },
    beforeDestroy() {
        this.map?.destroy();
    },
    methods: {
        initAMap() {
            window._AMapSecurityConfig = {
                securityJsCode: "16650193f5dbeb0d9c804c1cbcd081f4",
            };
            AMapLoader.load({
                key: "d49126ab4c25960612aa4c0e60976654", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ["AMap.Scale", "AMap.PlaceSearch"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
            })
                .then((AMap) => {
                    this.map = new AMap.Map("container", {
                        viewMode: "2D", //默认使用 2D 模式
                        zoom: 11, //地图级别
                        center: [116.397428, 39.90923], //地图中心点
                        resizeEnable: true,
                    });

                    // 使用箭头函数来保证 this 的指向正确
                    AMap.plugin(["AMap.PlaceSearch"], () => {
                        //构造地点查询类
                        var placeSearch = new AMap.PlaceSearch({
                            pageSize: 5, // 单页显示结果条数
                            pageIndex: 1, // 页码
                            city: "010", // 兴趣点城市
                            citylimit: true,  //是否强制限制在设置的城市内搜索
                            map: this.map, // 展现结果的地图实例
                            panel: "panel", // 结果列表将在此容器中进行展示。
                            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                        });
                        //关键字查询
                        placeSearch.search('北京大学');
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
    position: relative;
    #panel {
        position: absolute;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 10px;
        right: 10px;
        width: 280px;
    }
}
</style>
