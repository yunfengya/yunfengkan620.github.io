<template>
    <div class="contain_box">
        <div class="box">
            <div class="dot"></div>
        </div>
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
    // height: 100%;
    height: calc(100% - 4.2rem);
    overflow: auto;
    border: 1px solid gray;

    .box {
        width: 300px;
        aspect-ratio: 1;
        /* 设置纵横比为 1:1 */
        /* height: 200px; */
        background-color: #717771;
        position: relative;
    }

    .dot {
        width: 20px;
        /* height: 20px; */
        aspect-ratio: 1;
        /* 设置纵横比为 1:1 */
        position: absolute;
        background-color: #e74d4d;
        box-shadow: 0 0 20px #5efb37;
        border-radius: 100px;
        z-index: 2;
        right: 10%;
        top: 10%;
        /* 小球在盒子边缘运动 */
        animation: moveDot1 6s linear infinite;

        /* 小球左右运动 */
        // animation: moveDot2 3s linear infinite;
    }

    /* 小球在盒子边缘运动 */
    @keyframes moveDot1 {

        0%,
        100% {
            top: calc(10% - 20px);
            right: calc(10% - 20px);
        }

        25% {
            top: calc(10% - 20px);
            right: calc(90%);
        }

        50% {
            top: calc(90% - 0px);
            right: calc(90%);
        }

        75% {
            top: calc(90% - 0px);
            right: calc(10% - 20px);
        }
    }

    /* 小球左右运动 */
    @keyframes moveDot2 {

        0%,
        100% {
            top: calc(10% - 20px);
            left: calc(10% - 20px);
        }

        50% {
            top: calc(10% - 20px);
            left: calc(90%);
        }
    }
}</style>