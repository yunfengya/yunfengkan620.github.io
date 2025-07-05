<template>
    <div class="contain_box">
        <div>
            控制台只需一行代码，任意网页秒变可编辑！
            <br>
            打开 document.designMode = "on";
            <br>
            关闭 document.designMode = "off"
            <br>
            Iframe嵌套页面的编辑：iframeNode.contentDocument.designMode = "on";

        </div>
    </div>
</template>

<script>
export default {
    name: "index",
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
    height: 100%;
    // background-color: rgb(177, 175, 175);
}

</style>
