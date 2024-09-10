<template>
    <div class="contain_box">
        <div class="bar">
            <div class="ball"></div>
        </div>
        <div @click="goHome()" style="color:#314ee4;cursor:pointer;font-weight: 600;font-size: 20px;">返回首页</div>
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
    methods: {
        goHome(){
            this.$router.push({ 
                path: '/home',
                query: { }
            })
        }
    },
};
</script>
  
<style scoped lang="scss">
.contain_box {
    width: 100%;
    // height: 100%;
    height: calc(100% - 4.2rem);
    overflow: auto;
    // background: url("@/assets/bgc.jpg") no-repeat;
    // background-size: 100% 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .bar {
        width: 200px;
        height: 12.5px;
        background: #FFDAAF;
        border-radius: 30px;
        transform: rotate(-15deg);
        animation: up-down6123 3s ease-in-out 1s infinite alternate;
        .ball {
            position: relative;
            bottom: 50px;
            left: calc(100% - 20px);
            width: 50px;
            height: 50px;
            background: #fff;
            border-radius: 50%;
            animation: ball-move8234 3s ease-in-out 1s infinite alternate;
        }

        .ball::after {
            position: absolute;
            content: '';
            top: 25px;
            right: 5px;
            width: 5px;
            height: 5px;
            background: #000;
            border-radius: 50%;
        }
    }

    @keyframes up-down6123 {
        from {
            transform: rotate(-15deg);
        }

        to {
            transform: rotate(15deg);
        }
    }

    @keyframes ball-move8234 {
        from {
            left: calc(100% - 40px);
            transform: rotate(360deg);
        }

        to {
            left: calc(0% - 20px);
            transform: rotate(0deg);
        }
    }
}
</style>