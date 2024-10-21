<template>
    <!-- 容器元素 -->
    <div class="contain_box">
        <!-- 地图容器 -->
        <div id="container"></div>
        <!-- 搜索结果面板 -->
        <div id="panel"></div>
        <!-- 搜索框和搜索按钮 -->
        <div class="search_box">
            <input v-model="keyword" type="text" placeholder="输入地点">
            <button @click="searchPlace">搜索</button>
        </div>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
    name: "index",
    data() {
        return {
            loading: true,
            map: null,  // 地图对象
            keyword: '',  // 搜索关键词
        };
    },
    mounted() {
        // 初始化地图
        this.initAMap();
    },
    beforeDestroy() {
        // 销毁地图对象
        this.map?.destroy();
    },
    methods: {
        // 初始化地图方法
        initAMap() {
            window._AMapSecurityConfig = {
                securityJsCode: "16650193f5dbeb0d9c804c1cbcd081f4",
            };
            AMapLoader.load({
                key: "d49126ab4c25960612aa4c0e60976654",
                version: "2.0",
                plugins: ["AMap.Scale", "AMap.PlaceSearch", "AMap.Geolocation"],
            })
                .then((AMap) => {
                    // 创建地图实例
                    this.map = new AMap.Map("container", {
                        viewMode: "2D",
                        zoom: 11,
                        resizeEnable: true,
                    });

                    // 加载定位插件
                    AMap.plugin('AMap.Geolocation', () => {
                        const geolocation = new AMap.Geolocation();
                        // 添加定位控件到地图
                        this.map.addControl(geolocation);
                        // 获取当前位置
                        geolocation.getCurrentPosition((status, result) => {
                            if (status === 'complete') {
                                // 设置地图中心点为用户的当前位置
                                this.map.setCenter(result.position);
                            } else {
                                console.log(result.message);
                            }
                        });
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 搜索方法
        searchPlace() {
            AMap.plugin(["AMap.PlaceSearch"], () => {
                // 创建地点搜索实例
                var placeSearch = new AMap.PlaceSearch({
                    pageSize: 5,
                    pageIndex: 1,
                    city: this.keyword, // 使用输入框中的值作为搜索的城市
                    map: this.map, // 搜索结果显示在这个地图上
                    panel: "panel", // 搜索结果显示在这个面板上
                    autoFitView: true // 是否自动调整地图视野以适合搜索结果
                });
                // 执行搜索
                placeSearch.search(this.keyword,(status, result)=>{
                });
            });
        }
    },
};
</script>

<style scoped lang="scss">
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
        min-width: 280px;
    }
    .search_box {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        input {
            width: 200px;
            height: 30px;
            padding: 0 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            height: 30px;
            margin-left: 10px;
            padding: 0 10px;
            border: none;
            background-color: #409eff;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
        }
    }
}
</style>
