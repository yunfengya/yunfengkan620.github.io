<template>
    <div class="contain_box">
        <div class="container">
            <div class="box" v-for="(image, index) in images" :key="index">
                <img :src="image" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            images: [
                require('../../../assets/lunbo.png'),
                require('../../../assets/lunbo2.png'),
                require('../../../assets/lunbo3.png'),
                require('../../../assets/lunbo4.png'),
                require('../../../assets/lunbo5.png')
            ]
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
        // min-height: 100vh;
        height: 90%;
        width: 90%;
        background-color: #1a252c;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-x: hidden;
        flex-wrap: wrap;
        row-gap: 50px;
        transform-style: preserve-3d;

        .box {
            position: relative;
            width: 120px;
            height: 120px;
            -webkit-box-reflect: below 1px linear-gradient(transparent, #0002);
            transition: 0.5s;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
    /* 当鼠标悬停在 .container 元素上且其子元素不被悬停时，应用以下样式。 */
    .container:hover> :not(:hover) {
        margin-inline: -20px;
        filter: drop-shadow(0 0 25px #000) drop-shadow(0 0 45px #000);
        transform: perspective(500px) rotateY(45deg) scale(0.95);
    }

    /* 当鼠标悬停在 .container 元素内的 .box 元素之后的兄弟元素时，应用以下样式。 */
    .container .box:hover~.box {
        transform: perspective(500px) rotateY(-45deg) scale(0.95);
    }

    .container .box:hover {
        transform: perspective(500px) rotateY(0) scale(1.5);
        z-index: 100;
    }

}
</style>
