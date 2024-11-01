<template>
    <div class="contain_box">
        <el-form :inline="true" :model="formInline" size="mini" ref="ruleForm" :rules="rules">
            <el-form-item label="楼层" prop="floor">
                <el-select v-model="formInline.floor" clearable filterable placeholder="楼层选择"
                    @change="changeFloor()" style="width: 13rem">
                    <el-option label="1F" value="1F"></el-option>
                    <el-option label="2F" value="2F"></el-option>
                    <el-option label="3F" value="3F"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div>{{ messageArr }}</div>
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
            formInline: {
                building: "W2",
                floor: "2F",
            },
            messageArr:[],
            rules: {
                floor: [
                    {
                        required: true,
                        message: "请选择楼层",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    watch: {},
    created() { },
    mounted() {
        this.connectWebSocket();// WebSocket
    },
    methods: {
        changeFloor() {
            this.connectWebSocket()
        },
        connectWebSocket() {
            this.selectedFloor = `${this.formInline.building}-${this.formInline.floor}`
            if (this.ws) {
                this.ws.close(); // 关闭现有的WebSocket连接（如果有的话）
            }
            const url = `ws://10.68.16.14:8080/mlbdt/${this.selectedFloor}`;// LXKJ C3 1F this.selectedFloor="C3-1F"
            this.ws = new WebSocket(url);

            this.ws.onopen = () => {
                // 如果需要，可以在这里发送消息给服务器
                console.log('WebSocketURL' + url);
                // 发送请求给服务器，希望以一秒的频率接收数据
                // this.ws.send(JSON.stringify({ request: 'pushData', frequency: 1000 }));
            };
            this.ws.onmessage = (event) => {
                // console.log('Message使用', JSON.parse(event.data));
                this.messageArr = JSON.parse(event.data);
                // this.messageArr=[
                //     {visable:true,name:'LK_01',x:10,y:20,status:'1'},
                //     {visable:true,name:'LK_02',x:20,y:90,status:'2'},
                // ]
            };
            this.ws.onerror = (error) => {
                console.log('WebSocket Error ', error);
            };
            this.ws.onclose = () => {
                console.log('WebSocket Connection Closed');
                this.messageArr = []
            };
        },
    },
};
</script>
  
<style scoped lang="scss">
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
</style>