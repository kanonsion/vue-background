<template>
  <el-main>
    <el-table
      :data="ariticeList"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date' }"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="watch" label="查看次数"></el-table-column>
      <el-table-column
        prop="tagId.tag"
        label="标签"
        :filter-method="filterTag"
        :filters="tags"
      >
        <template slot-scope="scope">
          <el-tag disable-transitions>{{ scope.row.tagId.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- 
              0:不需要审核
             -->
            <el-button
              size="mini"
              type="success"
              v-if="scope.row.status === 0"
              @click="auditing(1, scope.row._id)"
              >下架</el-button
            >
            <el-button
              size="mini"
              type="primary"
              v-else
              @click="auditing(0, scope.row._id)"
              >审核</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <el-dialog title="编辑" :visible.sync="dialogVisible" :fullscreen="true">
      <el-form>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model="tag" placeholder="请选择">
            <el-option
              v-for="item in selects"
              :key="item._id"
              :label="item.tag"
              :value="item.tag"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <mavon-editor
            :ishljs="true"
            style="min-height:600px"
            v-model="form.content"
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
import { upload, imgDel as imgDelete } from "@/api/account";
import { getList } from "@/api/tags";
import {
  ariticeList,
  ariticeEdit,
  ariticeDelete,
  auditing,
} from "@/api/aritices";
import { dateFormat } from "@/utils/filter";
export default {
  data() {
    return {
      ariticeList: [],
      paginations: {
        pageSize: 5,
        total: 0,
        pageSizes: [5, 10, 20, 50],
        layout: "total, sizes, prev, pager, next",
        currentPage: 1,
      },
      dialogVisible: false,

      /* dialog */
      formLabelWidth: "120px",
      form: {},
      tag: "",
      tags: [],
      selects: [],
    };
  },
  methods: {
    async _getList(page, pageSize) {
      let list = await ariticeList({
        page: page,
        pageSize: pageSize,
      });
      this.paginations.total = list.total;
      this.ariticeList = list.aritices;
    },
    getTags() {
      getList().then((res) => {
        this.selects = res;
        this.tags = res.map((item) => {
          return { text: item.tag, value: item.tag };
        });
      });
    },
    //时间格式化
    dateFormat(cellValue) {
      return dateFormat(cellValue);
    },
    handleEdit(index, value) {
      this.form = Object.assign({}, value);
      this.tag = value.tagId.tag;
      this.dialogVisible = true;
    },
    async handleDelete(index, value) {
      let res = await ariticeDelete(value._id);
      this.$message({
        message: res.msg,
        type: "success",
      });
      this._getList(this.paginations.currentPage, this.paginations.pageSize);
    },
    /* 分页 */
    handleSizeChange(val) {
      this.paginations.currentPage = 1;
      this.paginations.pageSize = val;
      this._getList(this.paginations.currentPage, this.paginations.pageSize);
    },
    handleCurrentChange(val) {
      this.paginations.currentPage = val;
      this._getList(this.paginations.currentPage, this.paginations.pageSize);
    },
    /* 对话框 */
    async editAritices() {
      let { _id, title, content, watch } = this.form;
      let tag = this.tag;
      let res = await ariticeEdit(_id, { title, content, watch, tag });
      this.dialogVisible = false;
      this.$message({
        message: res.msg,
        type: "success",
      });
      this._getList(this.paginations.currentPage, this.paginations.pageSize);
    },
    /* 图片 */
    async imgAdd(filename, imgfile) {
      let formdata = new FormData();
      formdata.append("files", imgfile);
      await upload(formdata).then((res) => {
        this.$refs.me.$img2Url(filename, res);
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
    filterTag(value, row) {
      console.log(value);
      console.log(row);
      return row.tagId.tag === value;
    },
    /* 文章审核 */
    async auditing(status, id) {
      let res = await auditing({ id, status });
      this.$message({
        message: res.msg,
        type: "success",
      });
      this._getList(this.paginations.currentPage, this.paginations.pageSize);
    },
  },
  mounted() {
    this._getList(this.paginations.currentPage, this.paginations.pageSize);
    this.getTags();
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 30px;
  width: 100%;
  text-align: right;
}
</style>
