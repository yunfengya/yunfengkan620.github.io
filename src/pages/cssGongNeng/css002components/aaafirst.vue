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
        <div>
            <div v-html="stringContain"></div>
            <button @click="copyFn(stringContain)">点击复制</button>
            <el-input v-model="inputValue" placeholder=""></el-input>
        </div>
        <div>一键千分位:{{ new Intl.NumberFormat('zh-CN').format(1234567) }}</div>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            stringContain: `<p style="color:orange;">这是复制的内容</p>`,
            inputValue:'',
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        async copyFn(stringContain){
            try {
                await navigator.clipboard.writeText(stringContain);
                this.$notify({
                    title: '复制成功',
                    message: stringContain,
                    type: 'success',
                    duration: 2000,
                    position: 'top-right'
                });
            } catch (err) {
                this.$notify({
                    title: '复制失败',
                    message: stringContain,
                    type: 'error',
                    duration: 2000,
                    position: 'top-right'
                });
            }
        }
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
