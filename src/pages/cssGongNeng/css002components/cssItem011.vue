<template>
    <div class="contain_box">
        <input type="text" placeholder="请输入内容" class="gradient-input" />
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

    /* 渐变边框输入框 */
    .gradient-input {
        width: 400px;
        height: 40px;
        padding: 5px 12px;
        font-size: 16px;
        font-family: 'Arial', sans-serif;
        color: #333;
        outline: none;

        /* 渐变边框 */
        border: 1px solid transparent;
        background: linear-gradient(white, white) padding-box,
            linear-gradient(45deg, #ff7eb3, #65d9ff, #c7f464, #ff7eb3) border-box;
        border-radius: 20px;

        /* 平滑过渡 */
        transition: background 0.3s ease, box-shadow 0.3s ease;
    }

    /* 

/* Hover 状态 */
    .gradient-input:hover {
        background: linear-gradient(white, white) padding-box,
            linear-gradient(135deg, #ff0076, #1eaeff, #28ffbf, #ff0076) border-box;
        box-shadow: 0 0 5px rgba(255, 0, 118, 0.5), 0 0 20px rgba(30, 174, 255, 0.5);
    }

    /* Focus 状态 */
    .gradient-input:focus {
        background: linear-gradient(white, white) padding-box,
            linear-gradient(45deg, #ff0076, #1eaeff, #28ffbf, #ff0076) border-box;
        box-shadow: 0 0 15px rgba(255, 0, 118, 0.7), 0 0 25px rgba(30, 174, 255, 0.7);
        color: #000;
        /* 聚焦时文本颜色 */
    }

    /* Placeholder 样式 */
    .gradient-input::placeholder {
        color: #aaa;
        font-style: italic;
    }
}
</style>
