<template>
    <div class="contain_box">
        <div class="container">
            <Zoomable>
                <!-- style="width:100%;height:100%;" -->
                <div class="img_box"></div>
            </Zoomable>
        </div>
    </div>
</template>

<script>
import Zoomable from './Zoomable.vue';
export default {
    name: "index",
    components: {
        Zoomable,
    },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 4.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */
    .container {
        width: 600px;
        height: 500px;
        border: 1px solid #000;
        overflow: hidden;
        .img_box{
            width:100%;height:100%;
            background: url("../../../assets/404bg1.png") no-repeat;
            background-size:100% 100%;
        }
    }
}

</style>
