<template>
    <div class="contain_box">
        <div 
            class="echartsOne" 
            ref="echartsPie1"
            style="width:90%;height:80%;border:1px solid gray;backgroundColor:#4e6ca3;"
        ></div>
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
    mounted() {
        this.myChartPie1()
    },
    watch: {},
    created() { },
    methods: {
        myChartPie1() {

            let dataList = [
                // { value: 2154, name: '小名', sex: '男' },
                // { value: 3854, name: '小李', sex: '女' }
            ]
            let option={

            }

            let newOption = {};
            if (dataList.length) {
                newOption = option;
            } else {
                newOption = {
                    title: {
                        text: "暂无数据",
                        x: "center",
                        y: "center",
                        textStyle: {
                            color: "#8994a1",
                            fontWeight: "normal",
                            fontSize: this.setFontSize(18),
                        },
                    },
                };
            }

            let myChartPie = this.$echarts.getInstanceByDom(
                this.$refs.echartsPie1
            );
            if (myChartPie === undefined) {
                myChartPie = this.$echarts.init(this.$refs.echartsPie1);
            }
            
            // myChartPie.off("click");
            // myChartPie.on("click", (params) => {
            //     console.log(params);
            // });

            myChartPie.setOption(newOption);
            const chartObserver = new ResizeObserver(() => {
                myChartPie.setOption(newOption, true);
                myChartPie.resize();
            });
            chartObserver.observe(this.$refs.echartsPie1);
        },
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
    justify-content: center;
    align-items: center;
}
</style>