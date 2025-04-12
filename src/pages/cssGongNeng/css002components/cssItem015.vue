<template>
    <div class="contain_box">
        <div>
            <div>ppt在线预览方案：</div>
            <div> github作者：https://github.com/501351981/vue-office</div>
            <div>https://juejin.cn/post/7450420067802726437</div>
            <div>当前使用的ppt预览：https://github.com/501351981/pptx-preview</div>
            <div>https://juejin.cn/post/7418389059287908404</div>
        </div>
        <h1>------------------------------------------------------</h1>
        <div>
            <el-button class="button" size="mini" @click="lookToFlow1()">查看(office文件)</el-button>
        </div>
        <h1>------------------------------------------------------</h1>
        
        <!-- 下载和预览 -->
        <el-dialog v-dialogDrag title="" :visible.sync="drawer" append-to-body v-if="drawer" width="1060px" :center="true"
            :with-header="false" @close="close()">
            <p class="fileName">{{ fileName }}</p>
            <div v-loading="fileLoading" style="">
                <div id="pptx-wrapper" style=""></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {init} from 'pptx-preview'
// 接口
import { fatp_getfile } from '@/api/fatp_apiOne.js';
export default {
    name: "index",
    components: { 
        
    },
    data() {
        return {
            drawer: false,
            fileName: "",
            fileLoading: false,
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        lookToFlow1() {
            // this.fileName = 'Epson机械手 负载-惯量-离心率说明.pdf';
            // this.urlPath = 'https://lzisilon.luxsan-mes.local:9000/fatp/library/20241018160642/Epson机械手 负载-惯量-离心率说明.pdf';
            this.fileName = '锁附原理介绍 .pptx';
            this.urlPath = 'https://lzisilon.luxsan-mes.local:9000/fatp/library/20240629130036/锁附原理介绍 .pptx';
            this.seeFile()
        },
        // 
        pptxPreviewFn(res){
            //调用库的init方法生成一个预览器
            let pptxPrviewer = init(document.getElementById('pptx-wrapper'), {
                width: 960,
                height: 540
            })
            //获取文件的 ArrayBuffer格式数据 res ，传给组件进行预览 调用预览器的preview方法
            pptxPrviewer.preview(res)
        },
        // 预览 和 下载
        seeFile() {
            let _data = {
                filename: this.fileName,
                filepath: this.urlPath
            }
            let fileLastName = this.fileName.split(".").slice(-1)[0].toLowerCase() || ''//文件后缀名
            this.drawer = true;
            this.fileLoading = true;
            fatp_getfile(_data).then(res => {
                if (res) {
                    console.log(res);
                    this.pptxPreviewFn(res);
                    // res 是文件流
                    this.fileLoading = false;
                }
            })
        },

        close() {
            //释放blob:url
        },
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: 100%;
    /* 外框样式 */
}

</style>
