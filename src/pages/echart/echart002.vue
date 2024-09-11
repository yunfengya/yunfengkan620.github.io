<template>
    <div class="contain_box">
        <h1>echart002</h1>
    </div>
</template>
<script>
export default {
    name: "index",
    components: {},
    data() {
        return {
            // 遮罩层
            loading: true,
        };
    },
    watch: {},
    created() { },
    methods: {},
};
</script>
  
<style scoped lang="scss">
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;

    h1 {
        font-size: 3rem;
        color: #b4a4a4;
        text-align: center;
    }
}
</style>