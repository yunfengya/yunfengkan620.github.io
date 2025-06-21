<template>
  <div class="editor_container">
    <div style="border: 1px solid #ccc;">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :default-config="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="content"
        :default-config="editorConfig"
        @on-created="handleEditorCreated"
      />
    </div>
    <div class="button_container">
      <el-button type="primary" @click="saveContent">保存</el-button>
      <el-button @click="cancelEditing">取消</el-button>
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { message } from 'element-ui';

export default {
  name: 'RichTextEditor',
  components: {
    Editor,
    Toolbar
  },
  data() {
    return {
      editor: null,
      content: '',
      toolbarConfig: {
        // 工具栏配置
        toolbarKeys: [
          'headerSelect', // 标题
          'bold', // 加粗
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'fontFamily', // 字体
          'fontSize', // 字号
          'lineHeight', // 行高
          'indent', // 缩进
          'alignLeft', // 左对齐
          'alignCenter', // 居中
          'alignRight', // 右对齐
          'alignJustify', // 两端对齐
          'listOrdered', // 有序列表
          'listBullet', // 无序列表
          'quote', // 引用
          'code', // 插入代码
          'link', // 插入链接
          'image', // 插入图片
          'video', // 插入视频
          'table', // 表格
          'splitLine', // 分割线
          'undo', // 撤销
          'redo' // 重做
        ]
      },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: 'your-upload-url', // 替换为您的图片上传接口
            fieldName: 'file',
            headers: {
              Authorization: 'your-auth-token' // 替换为您的认证信息
            },
            customInsert: (res, insertFn) => {
              if (res.code === 0) {
                insertFn(res.data.url);
              } else {
                message.error('图片上传失败');
              }
            }
          }
        }
      }
    };
  },
  methods: {
    handleEditorCreated(editor) {
      this.editor = editor;
    },
    saveContent() {
      // 保存逻辑，例如发送到服务器
      message.success('内容已保存');
      // 这里可以添加您的保存逻辑，例如发送请求到服务器
    },
    cancelEditing() {
      this.content = '';
      message.info('编辑已取消');
    }
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.editor_container {
  padding: 20px;
}

.button_container {
  margin-top: 20px;
  text-align: right;
}
</style>