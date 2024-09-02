<template>
    <div class="contain_box">
        <h2>
            点我有惊喜
            <span>点我有惊喜</span>
            <span>点我有惊喜</span>
            <span>哈哈，假的</span>
        </h2>
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

    h2 {
        /* width:100%; */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        padding: 0;
        font-size: 6em;
        color: transparent;
    }
    span{
        width: 100%;
        text-align: center;
    }

    h2 span:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        color: #000;
        transition: 0.5s;
        clip-path: polygon(0 0, 100% 0, 100% 50%, 2% 50%);
        overflow: hidden;
    }

    h2:hover span:nth-child(1) {
        transform: translateY(-18px);
    }

    h2 span:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        color: #000;
        transition: 0.5s;
        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0% 100%);
        overflow: hidden;
    }

    h2:hover span:nth-child(2) {
        transform: translateY(18px);
    }

    h2 span:nth-child(3) {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%) scaleY(0);
        /* width: 91%; */
        color: #000;
        background: skyblue;
        font-size: 0.25em;
        letter-spacing: 0.7em;
        text-align: center;
        transition: .5s;
    }

    h2:hover span:nth-child(3) {
        transform: translateY(-50%) scaleY(1);
    }
}
</style>