<template>
    <div class="contain_box">
        <div class="battery"></div>
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

    .battery {
        width: 140px;
        height: 70px;
        border: 1px #61E8EA solid;
        border-radius: 2px;
        position: relative;
        animation: charge 5s linear infinite;
        margin: 0 auto;
    }

    .battery:after {
        width: 10%;
        height: 50%;
        background-color: #61E8EA;
        border-radius: 0px 1px 1px 0px;
        position: absolute;
        content: "";
        top: 25%;
        right: -10%;
    }

    @keyframes charge {
        0% {
            box-shadow: inset 0px 0px 0px #61E8EA;
        }

        100% {
            box-shadow: inset (140px + 10px) 0px 0px #61E8EA;
        }
    }
}</style>
