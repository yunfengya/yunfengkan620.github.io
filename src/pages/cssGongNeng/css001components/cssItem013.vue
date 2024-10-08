<template>
    <div class="contain_box">
        <div class="loader">
            <div style="--i:0"></div>
            <div style="--i:1"></div>
            <div style="--i:2"></div>
            <div style="--i:3"></div>
            <div style="--i:4"></div>
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
    height: calc(100vh - 4.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */

    .loader {
        display: flex;
        flex-direction: row;
    }

    .loader div {
        position: relative;
        width: 40px;
        height: 200px;
        margin: 20px;
        overflow: hidden;
        border-radius: 40px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5));
        border: 2px solid #272727;
        box-shadow: -5px -5px 5px rgba(92, 92, 92, 0.1),
            10px 10px 10px rgba(0, 0, 0, 0.4),
            inset -5px -5px 5px rgba(82, 82, 82, 0.2),
            inset 10px 10px 10px rgba(0, 0, 0, 0.4);
    }

    .loader div::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        border-radius: 40px;
        box-shadow: -5px -5px 5px rgba(92, 92, 92, 0.1),
            10px 10px 10px rgba(0, 0, 0, 0.4), inset -5px -5px 5px rgba(82, 82, 82, 0.2),
            inset 10px 10px 10px rgba(0, 0, 0, 0.4);
    }

    .loader div::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 36px;
        height: 36px;
        background: #343434;
        border-radius: 50%;
        box-shadow: inset -5px -5px 5px rgba(0, 0, 0, 0.2), 0 420px 0 400px #ffe700;
        animation: animate 2.5s ease-in-out infinite;
        transform: translateY(160px);
        animation-delay: calc(-0.5s * var(--i));
    }

    @keyframes animate {
        0% {
            transform: translateY(160px);
            filter: hue-rotate(180deg);
        }

        50% {
            transform: translateY(0px);
        }

        100% {
            transform: translateY(160px);
            filter: hue-rotate(0deg);
        }
    }
}
</style>
