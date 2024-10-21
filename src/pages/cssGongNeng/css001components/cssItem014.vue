<template>
    <div class="contain_box">
        <div class="container">
            <LightCard />
            <LightCard :options="{ light: { color: '#ffffff', width: 100 } }" />
            <LightCard :options="{ light: { color: 'yellow' } }" />
        </div>
    </div>
</template>

<script>
import LightCard from '../../../components/LightCard/index.vue';
export default {
    name: "index",
    components: {
        LightCard,
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
        background: #3e3d3d;
        width: 70%;
        height: 70%;
        display: flex;
        justify-content: space-between;
    }
}
</style>
