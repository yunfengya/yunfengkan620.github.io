<template>
    <div class="contain_box">
        <el-button type="primary" @click="submitForm('')">查询接口</el-button>
        <div>{{tableList}}</div>
    </div>
</template>

<script>
// 导入api.js中的callApi函数
import { fatp_activityRanking } from '@/api/fatp_apiOne.js';
export default {
    name: "index",
    data() {
        return {
            tableList:[],
        };
    },
    mounted() {

    },
    beforeDestroy() {
        
    },
    methods: {
        submitForm(){
            this.fatp_activityRanking()
        },
        fatp_activityRanking() {
            let _data={
                date: '2025-02-17',
                type: '0'
            }
            fatp_activityRanking(_data).then(res=>{
                // console.log('res',res);
                if(res.code==200){
                    this.tableList=res.rows||[]
                }
            })
        },
        
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
}

</style>
