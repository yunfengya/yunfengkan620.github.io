<template>
    <div class="contain_box">
        <el-carousel :interval="4000" type="card" height="90%" style="width:90%;height:60%;">
            <el-carousel-item v-for="(item,index) in itemsList" :key="index">
                <div class="bg_box" :class="`bg_img_${index}`"></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: "index",
    components:{
        
    },
    data() {
        return {
            itemsList:[
                {url:require('../../../assets/lunbo.png')},
                {url:require('../../../assets/lunbo2.png')},
                {url:require('../../../assets/lunbo3.png')},
                {url:require('../../../assets/lunbo4.png')},
                {url:require('../../../assets/lunbo5.png')},
            ],
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #9cabc8; */

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .bg_box{
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center;
    }
    .bg_img_0{
        background-image: url('../../../assets/lunbo.png');
    }
    .bg_img_1{
        background-image: url('../../../assets/lunbo2.png');
    }
    .bg_img_2{
        background-image: url('../../../assets/lunbo3.png');
    }
    .bg_img_3{
        background-image: url('../../../assets/lunbo4.png');
    }
    .bg_img_4{
        background-image: url('../../../assets/lunbo5.png');
    }
}

</style>
