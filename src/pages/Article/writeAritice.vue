<template>
  <el-main>
    <breadcrumb />
    <el-form ref="article" :model="article" label-width="80px">
      <el-form-item prop="title">
        <el-input v-model="article.title" placeholder="请输入文章标题" class="title"></el-input>
      </el-form-item>
      <el-form-item prop="title">
        <el-input v-model="article.tag" placeholder="请输入标签" class="title" ></el-input>
      </el-form-item>
      <!-- 标签 -->
      <el-form-item > 
        <el-tag @click="selectTag(item.tag)" v-for="(item, index) in tags" :key="index" :type="item.type">{{item.tag}}</el-tag>
      </el-form-item>
      <!-- MarkDown -->
      <el-form-item>
        <mavon-editor
          ref="me"
          @save="save"
          :ishljs="true"
          style="min-height:600px"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
        />
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="submitForm('article')">提交</el-button>
        <el-button @click="resetForm('article')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { saveAritice, upload, imgDel as imgDelete } from "api/account";
import breadcrumb from "components/breadcrumb.vue";
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      file: {},
      flag: false,
      article: {
        title: "",
        content: "",
        tag: ""
      },
      untilFlag: true,
      msg: "",
      tags:[
        {type:'',tag:'JavaScript'},
        {type:'success',tag:'Vue'},
        {type:'info',tag:'Html'},
        {type:'warning',tag:'杂谈'},
        {type:'danger',tag:'Etc'},
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this._saveAritice();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open1() {
      this.$notify({
        title: "成功",
        message: this.msg,
        type: "success",
        offset: 100
      });
    },
    open2() {
      this.$notify({
        title: "警告",
        message: this.msg,
        type: "error",
        offset: 100
      });
    },
    selectTag(value){
      this.article.tag = value
    },
    async _saveAritice() {
      await saveAritice(this.article);
    },
    save(value, render) {
      // 返回html代码
      this.article.content = render;
    },
    async imgAdd(filename, imgfile) {
      let formdata = new FormData();
      formdata.append("files", imgfile);
      await upload(formdata).then(res => {
        this.$refs.me.$img2Url(filename, res.data);
      });
    },
    async imgDel(filename) {
      await imgDelete({ name: filename[1].name }).then(res => {
        if (res.data) {
          this.msg = "删除图片成功";
          this.open1();
        } else {
          this.msg = "删除图片失败";
          this.open2();
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.el-form-item
  .el-tag
    margin-right 10px
    cursor pointer
</style>