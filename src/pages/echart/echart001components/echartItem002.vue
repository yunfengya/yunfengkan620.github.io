<template>
    <div class="contain_box">
        <div class="echartsOne" ref="echartsPie1"
            style="width:90%;height:80%;border:1px solid gray;backgroundColor:#4e6ca3;"></div>
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
                // {
                //     value: 1603,
                //     name: '互联网/计算机',
                //     itemStyle: {
                //         color: '#4B96F3'
                //     }
                // },
                // {
                //     value: 1199,
                //     name: '通信/电子',
                //     itemStyle: {
                //         color: '#10C6A6'
                //     }
                // },
            ]

            let dataname = ['互联网/计算机', '通信/电子', '房地产/建筑', '专业服务/教育', '制药/医疗', '能源', '政府', '其他1', '其他2', '其他3', '其他4']
            let datvalue = [1603, 1599, 1000, 950, 500, 260, 240, 130, 120, 110, 100]
            let colorList = ['#4B96F3', '#10C6A6', '#F2AF4B', '#FF4D4F', '#AA7AF1'];
            datvalue.forEach((item,index)=>{
                dataList.push(
                    {
                        value: item,
                        name: dataname[index],
                        itemStyle: {
                            color: colorList[index%5],
                        } 
                    }
                )
            })

            // var data = []
            // for (var i = 0; i < dataname.length; i++) {
            //     data.push({
            //         value: datvalue[i],
            //         name: dataname[i],
            //         itemStyle: {
            //             color: colorList[i]
            //         }
            //     })
            // }

            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c}"
                },
                series: [{
                    type: 'treemap',
                    width: '80%',
                    height: '80%',
                    breadcrumb: {
                        show: false
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 16,
                            },
                        }
                    },
                    itemStyle: {
                        normal: {
                            show: true,
                            borderWidth: 1,
                            borderColor: '#fff',
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: dataList
                }]
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