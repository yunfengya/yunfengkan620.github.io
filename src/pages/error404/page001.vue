<template>
    <div class="contain_box">
        <div class="card">
            <div class="card_inner">
                <div style="color:#314ee4;cursor:;font-weight: 600;font-size: 20px;">当前页面不存在</div>
                <div @click="goHome()" style="color:#314ee4;cursor:pointer;font-weight: 600;font-size: 20px;">返回首页</div>
            </div>
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
    // background: url("@/assets/404bg1.png") no-repeat;
    background: url("@/assets/404bg1.png");
    background-size: auto 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .card {
        width: 190px;
        height: 254px;
        background: #07182E;
        position: relative;
        display: flex;
        place-content: center;
        place-items: center;
        overflow: hidden;
        border-radius: 20px;
    }

    .card::before {
        content: '';
        position: absolute;
        width: 50%;
        background-image: linear-gradient(180deg, #00b7ff, #ff30ff);
        height: 130%;
        animation: rotBGimg 3s linear infinite;
        transition: all 0.2s linear;
    }

    .card:hover:before {
        background-image: linear-gradient(180deg, #51ff00, #f4b822);
        animation: rotBGimg 3s linear infinite;
    }

    @keyframes rotBGimg {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    /* .card::after {
        content: '';
        position: absolute;
        background: #07182E;
        inset: 5px;
        border-radius: 15px;
    } */

    .card .card_inner {
        z-index: 1;
        color: white;
        position: absolute;
        background: #07182E;
        /* 相对定位，让他占满距离父盒子5px 的中间部分，类似加了一个外边距 */
        inset: 5px;
        border-radius: 15px;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
}
</style>