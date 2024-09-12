<template>
    <div class="contain_box">
        <div 
            class="echartsOne" 
            ref="echartsPie1"
            style="width:70%;height:70%;border:1px solid gray;backgroundColor:#024d91;"
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
                { value: 2154, name: '小名', sex: '男' },
                { value: 3854, name: '小李', sex: '女' },
                { value: 3515, name: '小张', sex: '男' },
                { value: 3515, name: '小红', sex: '女' },
                { value: 3854, name: '小立', sex: '男' },
                { value: 2154, name: '小峰', sex: '女' }
            ]
            let option = {
                // backgroundColor: '#000',
                title: {
                    text: `总数量:1006`,
                    left: 'center',
                    // top: '53%',
                    top: 'center',
                    padding: [0, 0],
                    textStyle: {
                        color: '#fff',
                        fontSize: this.setFontSize(18),
                        align: 'center'
                    }
                },
                legend: {
                    right: '1%',
                    top: '1%',
                    textStyle: {
                        color: "#fff",
                        fontSize: this.setFontSize(14),
                    },
                },
                series: [{
                    name: '饼图1',
                    type: 'pie',
                    radius: ['42%', '50%'],
                    emphasis: {
                        scale: true // 高亮图
                    },
                    color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
                    label: {
                        color: '#fff',
                        fontSize: this.setFontSize(14),
                        formatter: (params, ticket, callback) => {
                            // console.log(params);
                            return `${params.name}\n${params.value}分\n${dataList[params.dataIndex].sex}`;
                        },
                    },
                    labelLine: {
                        show: true,
                        // normal: {
                        //     length: 55 ,
                        //     length2: 0,
                        //     lineStyle: {
                        //         color: '#0b5263'
                        //     }
                        // }
                    },
                    data: dataList
                }]
            };


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
                            fontSize: this.setFontSize(14),
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