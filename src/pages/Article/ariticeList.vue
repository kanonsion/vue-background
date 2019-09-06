<template>
  <el-main>
    <breadcrumb />
    <el-table
      :data="ariticeList.slice((paginations.currentPage-1)*paginations.pageSize,paginations.currentPage*paginations.pageSize)"
      border
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="watch" label="查看次数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.currentPage"
        :page-sizes="paginations.pageSizes"
        :page-size="paginations.pageSize"
        :layout="paginations.layout"
        :total="paginations.total"
      ></el-pagination>
    </div>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" :fullscreen="true" width="30%">
      <el-form>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <mavon-editor
            :ishljs="true"
            style="min-height:600px"
            v-model="form.content"
            @save="save"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
            ref="me"
          />
        </el-form-item>
        <el-form-item label="查看次数" :label-width="formLabelWidth">
          <el-input v-model="form.watch" placeholder="请输入用户名"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAritices">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import {
  ariticeList,
  ariticeEdit,
  ariticeDelete,
  upload,
  imgDel as imgDelete
} from "api/account";
import breadcrumb from "components/breadcrumb.vue";
export default {
  data() {
    return {
      ariticeList: [],
      paginations: {
        pageSize: 5,
        total: 0,
        pageSizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper",
        currentPage: 1
      },
      dialogVisible: false,

      /* dialog */
      formLabelWidth: "120px",
      form: {}
    };
  },
  methods: {
    async _getList() {
      let res = await ariticeList();
      this.ariticeList = res.data;
    },
    //时间格式化
    dateFormat(cellValue) {
      var date = new Date(cellValue.date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      return (
        year +
        "/" +
        month +
        "/" +
        day +
        "/" +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    handleEdit(index, value) {
      this.form = value;
      this.dialogVisible = true;
    },
    async handleDelete(index, value) {
      let res = await ariticeDelete(value._id);
      console.log(res);
      res.status === 200
        ? this._getList()
        : this.$message({
            message: "删除错误",
            type: "warning"
          });
    },
    /* 分页 */
    handleSizeChange(val) {
      this.paginations.pageSize = val;
    },
    handleCurrentChange(val) {
      this.paginations.currentPage = val;
    },
    /* 对话框 */
    async editAritices() {
      let { _id, title, content, watch } = this.form;
      let res = await ariticeEdit(_id, { title, content, watch });
      res.status === 200
        ? (this.dialogVisible = false)
        : this.$message({
            message: "修改错误",
            type: "warning"
          });
    },
    /* 渲染后的数据 */
    save(value, render) {
      // 返回html代码
      console.log(2333);
      this.form.content = render;
    },
    /* 图片 */
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
  },
  mounted() {
    this._getList();
  },
  components: {
    breadcrumb
  }
};
</script>

<style lang="stylus">
.cell
  max-height 42px
</style>