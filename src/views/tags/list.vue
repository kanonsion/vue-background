<template>
  <div>
    <el-table
      :data="list"
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
      <el-table-column prop="tag" label="标签"></el-table-column>
      <el-table-column prop="tagColor" label="标签颜色">
        <template slot-scope="scope">
          <div
            class="tagColor"
            :style="{ background: scope.row.tagColor }"
          ></div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
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

    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-form label-width="80px">
        <el-form-item label="标签">
          <el-input v-model="form.tag" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item label="标签颜色">
          <el-color-picker v-model="form.tagColor" show-alpha></el-color-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="_edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/filter";
import { getListAll, tagDelete, tagEdit } from "@/api/tags";
export default {
  data() {
    return {
      list: [],
      paginations: {
        pageSize: 5,
        total: 0,
        pageSizes: [5, 10, 20, 50],
        layout: "total, sizes, prev, pager, next",
        currentPage: 1,
      },
      dialogVisible: false,
      form: {},
    };
  },
  methods: {
    dateFormat(cellValue) {
      return dateFormat(cellValue);
    },
    async _getList(page, pageSize) {
      let list = await getListAll({
        page: page,
        pageSize: pageSize,
      });
      this.paginations.total = list.total;
      this.list = list.tags;
    },
    async _edit() {
      let res = await tagEdit(this.form._id, this.form);
      this.form = {};
      this.dialogVisible = false;
      this._getList(this.paginations.currentPage, this.paginations.pageSize);
      this.$message({
        message: res.msg,
        type: "success",
      });
    },
    handleEdit(index, value) {
      this.form = value;
      this.dialogVisible = true;
    },
    async handleDelete(index, value) {
      let res = await tagDelete(value._id);
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
  },
  created() {
    this._getList(this.paginations.currentPage, this.paginations.pageSize);
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 30px;
  width: 100%;
  text-align: right;
}
.tagColor {
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
</style>
