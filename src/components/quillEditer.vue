<template>
  <el-form ref="article" :model="article" label-width="80px">
    <el-form-item prop="title">
      <el-input
        v-model="article.title"
        placeholder="请输入文章标题"
        class="title"
      ></el-input>
    </el-form-item>
    <el-form-item prop="title">
      <el-input
        v-model="article.tag"
        placeholder="请输入标签"
        class="title"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        plain
        size="small"
        autofocus="true"
        @click="untilFlag = !untilFlag"
        >MarkDown</el-button
      >
      <el-button
        type="primary"
        plain
        size="small"
        @click="untilFlag = !untilFlag"
        >富文本</el-button
      >
    </el-form-item>

    <!-- MarkDown -->
    <el-form-item v-if="untilFlag">
      2333555
    </el-form-item>
    <!-- 富文本 -->
    <el-form-item prop="content" v-if="!untilFlag">
      <quill-editor
        v-model="article.content"
        ref="quillEditor"
        :options="editorOption"
      ></quill-editor>
    </el-form-item>

    <el-form-item>
      <el-upload
        action="/api/api/upload"
        list-type="picture"
        name="imageFile"
        class="upload"
        style="display:none"
        :multiple="true"
        :before-upload="beforeUpdate"
        :on-success="upSuccess"
      >
        <el-button size="small" type="primary" id="upload">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item class="btns">
      <el-button type="primary" @click="submitForm('article')">提交</el-button>
      <el-button @click="resetForm('article')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Quill from "quill";
import { addQuillTitle } from "@/utils/quill-title.js";
import hljs from "highlight.js";
import "highlight.js/styles/atelier-lakeside-dark.css";
import { saveAritice } from "@/api/account";
//工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["image"],
  ["clean"],
];
export default {
  data() {
    return {
      file: {},
      flag: false,
      article: {
        title: "",
        content: "",
        tag: "",
      },
      untilFlag: true,
      editorOption: {
        placeholder: "请输入文章内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
          },
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value, //语法高亮
          },
        },
      },
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    /* onEditorBlur(quill) {
      console.log("editor blur!", quill);
      console.log(this.content);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    }, */
    submitForm() {
      this._saveAritice();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async _saveAritice() {
      console.log(this.article);
      await saveAritice(this.article);
    },
    imgHandler(state) {
      if (state) {
        let upload = document.getElementById("upload");
        upload.click();
      }
    },
    //上传之前获取文件名
    beforeUpdate(file) {
      this.file = file;
    },
    upSuccess(file) {
      console.log(file);
      this.$refs.quillEditor.quill.getSelection();
      let url = `/api/upload/${this.file.name}`;
      this.$refs.quillEditor.quill.insertEmbed(
        0,
        "image",
        url,
        Quill.sources.USER
      );
      this.$refs.quillEditor.quill;
    },
  },
  computed: {
    editor() {
      return this.$refs.quillEditor.quill;
    },
    uploadUrl() {
      return "/api/api/upload";
    },
  },
  mounted() {
    addQuillTitle(); //中文提示
    this.$refs.quillEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler);
  },
};
</script>

<style lang="scss" scoped>
.ql-container {
  min-height: 300px;
}
.btns {
  text-align: right;
}
.upload {
  text-align: right;
}
</style>
