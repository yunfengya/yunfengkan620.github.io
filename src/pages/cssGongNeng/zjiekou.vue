<template>
    <div class="contain_box">
        <el-button type="primary" @click="submitForm('')">查询接口</el-button>
        <div>{{tableList}}</div>
    </div>
</template>

<script>
// 导入api.js中的callApi函数
import { callApi } from '@/api/fatp_api.js';
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
            this.fetchData()
        },

        async fetchData() {
            // 定义接口URL、参数和token
            const endpoint = 'http://10.190.196.161:8301/peopleManagement/userActivity/activityRanking';
            const params = {
                date: '2025-02-17',
                type: '0'
                // ... 其他参数
            };
            // 你应该从某处获取这个token
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjdkMWI1ZjhiLTEyMzUtNDYwMS1iZGJmLWYzZGFhMDdlOTUwZiJ9.UUrq3-g2_9r6cQLwtjgAaDkxOtCdgXKlEIHoBleNqOztUoBmSpGLlT22MqwjU-JZ4J_Kv4KlgDmPJi-ehYwL9A'; 
            const method = 'get'; // 或者'GET', 'PUT', 'DELETE'等
            const timeout = 10000; // 10秒超时
            const responseType = 'json'; // 或者'blob'
            try {
                // 调用封装好的接口函数
                const data = await callApi(endpoint, params, token, method, timeout, responseType);
                // 处理响应数据
                console.log(data);
                if(data.code==200){
                    this.tableList = data.rows||[]
                }else{
                    this.$message.error(data.msg)
                }
            } catch (error) {
                // 处理错误
                console.error('There was a problem fetching the data:', error);
            }
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
