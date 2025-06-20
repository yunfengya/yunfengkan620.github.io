<template>
    <div class="contain_box">
        <div style="border: 1px solid #ccc;">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 200px; overflow-y: hidden;"
                v-model="html"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
            />
        </div>
        <div class="result_box">
            <el-button type="primary" size="mini" @click="btnFn()">点击生成</el-button>
            <el-button type="primary" size="mini" @click="clearFn()">清空</el-button>
            <div v-html="resultHtml"></div>
        </div>
    </div>
</template>

<script>
// 富文本文档 https://www.wangeditor.com/v5/for-frame.html#demo
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    name: "index",
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '<h2><span style="color: rgb(235, 144, 58);"><strong>hello</strong></span></h2>',
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'

            resultHtml:'',
        };
    },
    mounted() {
        // // 模拟 ajax 请求，异步渲染编辑器
        // setTimeout(() => {
        //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        // }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      },
      btnFn(){
        console.log(this.html);
        this.resultHtml = this.html;
      },
      clearFn(){
        this.html = ''
        this.resultHtml = ''
      },
    },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: 100%;
    // background-color: rgb(177, 175, 175);
    .result_box{
        border: 2px solid #ecd149;
        width: 100%;
        min-height: 100px;
    }
}

</style>
