<template>
  <el-main>
    <el-form ref="article" :rules="rules" :model="article" label-width="10px">
      <el-form-item prop="title">
        <el-input
          v-model="article.title"
          placeholder="请输入文章标题"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="article.tag"
          placeholder="请输入或选择标签"
        ></el-input>
      </el-form-item>
      <!-- 标签 -->
      <el-form-item>
        <el-tag
          @click="selectTag(item.tag)"
          v-for="(item, index) in tags"
          :key="index"
          :type="item.type"
          effect="plain"
          disable-transitions
          :style="{ borderColor: item.tagColor, color: item.tagColor }"
          >{{ item.tag }}</el-tag
        >
      </el-form-item>

      <!-- MarkDown -->
      <el-form-item>
        <mavon-editor
          ref="me"
          :ishljs="true"
          style="min-height:600px"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
          v-model="article.content"
        />
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="submitForm('article')"
          >提交</el-button
        >
        <el-button @click="resetForm('article')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { upload, imgDel as imgDelete } from "@/api/account";
import { ariticeSave } from "@/api/aritices";
import { getList } from "@/api/tags";
import { Message } from "element-ui";
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
      msg: "",
      tags: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        tag: [{ required: true, message: "请输入或选择标签", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this._saveAritice();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectTag(value) {
      this.article.tag = value;
    },
    async _saveAritice() {
      let res = await ariticeSave(this.article);
      this.article = {};
      Message.success(res.msg);
    },
    async _getList() {
      this.tags = await getList();
    },
    async imgAdd(filename, imgfile) {
      let formdata = new FormData();
      formdata.append("files", imgfile);
      await upload(formdata).then((res) => {
        this.$refs.me.$img2Url(
          filename,
          process.env.VUE_APP_BASEURL + "/upload/" + res
        );
      });
    },
    async imgDel(filename) {
      await imgDelete({ name: filename[1].name }).then((res) => {
        if (res) {
          this.msg = "删除图片成功";
          this.open1();
        } else {
          this.msg = "删除图片失败";
          this.open2();
        }
      });
    },
  },
  created() {
    this._getList();
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
/deep/.el-main {
  .el-form-item {
    display: flex;
    justify-content: center;
  }
}
</style>
