<template>
    <div class="contain_box">
        <div class="big_box">
            <!-- 线1 -->
            <div class="line_box">
                <div class="left_radio">
                    <div class="top1"></div>
                    <div class="bot1"></div>
                </div>
                <div class="item_box" v-for="(item2,index2) in 5" :key="index2">
                    <div class="item_box_line">
                        <div class="item_box_cicle"></div>
                    </div>
                </div>
                <div class="right_radio">
                    <div class="top2"></div>
                    <div class="bot2"></div>
                </div>
            </div>
            <!-- 线2 -->
            <div class="line_box">
                <div class="left_radio">
                    <div class="top3"></div>
                    <div class="bot3"></div>
                </div>
                <div class="item_box" v-for="(item2,index2) in 5" :key="index2">
                    <div class="item_box_line">
                        <div class="item_box_cicle"></div>
                    </div>
                </div>
                <div class="right_radio">
                    <div class="top4"></div>
                    <div class="bot4"></div>
                </div>
            </div>
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

    .big_box{
        width: 100%;
        height:100%;
        .line_box{
            width: 98%;
            height:100px;
            border: 2px dashed #2cc62c;
            display: flex;
            .left_radio{
                height: 100px;
                width:50px;
                .top1{
                    width: 50px;
                    height: 50px;
                    border: 2px solid #00b0f0;
                    // 左下角
                    border-top: 0;
                    border-right: 0;
                    border-radius: 0 0 0 50px;
                }
                .bot1{
                    width: 50px;
                    height: 50px;
                }
                .top3{
                    width: 50px;
                    height: 50px;
                }
                .bot3{
                    width: 50px;
                    height: 50px;
                    border: 2px solid #00b0f0;
                    // 左上角
                    border-bottom: 0;
                    border-right: 0;
                    border-radius: 50px 0 0 0;
                }
            }
            .right_radio{
                height: 100px;
                width:50px;
                .top2{
                    width: 50px;
                    height: 50px;
                }
                .bot2{
                    width: 50px;
                    height: 50px;
                    border: 2px solid #00b0f0;
                    // 右上角
                    border-bottom: 0;
                    border-left: 0;
                    border-radius: 0 50px 0 0;
                }
                .top4{
                    width: 50px;
                    height: 50px;
                    border: 2px solid #00b0f0;
                    // 右下角
                    border-top: 0;
                    border-left: 0;
                    border-radius: 0 0 50px 0;
                }
                .bot4{
                    width: 50px;
                    height: 50px;
                }
            }
            .item_box{
                height: 100%;
                width:calc((100% - 50px - 50px) / 5);
                display: flex;
                justify-content: center;
                align-items: center;
                .item_box_line{
                    width: 100%;
                    border: 1px solid #00b0f0;
                    position: relative;
                }
                .item_box_cicle{
                    position: absolute;
                    left: calc(50% - 10px);
                    top: calc(50% - 10px);
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #00b0f0;
                }
            }
        }
    }
}

</style>
