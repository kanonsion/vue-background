<template>
  <div>
    <div class="top">
      <div class="top-inner">
        <div>评论所属标签:</div>
        <el-select
          v-model="value1"
          placeholder="请选择标签"
          @change="tagChange"
        >
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.tag"
            :value="item.children"
          >
          </el-option>
        </el-select>
      </div>

      <div v-if="options2.length" class="top-inner">
        <div>评论所属文章:</div>
        <el-select
          v-model="value2"
          placeholder="请选择文章标题"
          @change="ariticeChange"
        >
          <el-option
            v-for="item in options2"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>

      <el-button type="primary" @click="select">筛选</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" border row-key="_id">
      <el-table-column prop="date" :formatter="dateFormat" label="日期">
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column
        prop="comment"
        label="评论内容"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.page"
        :page-sizes="paginations.pageSizes"
        :page-size="paginations.pageSize"
        :layout="paginations.layout"
        :total="paginations.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getTags, getList, del } from "@/api/comment";
import { dateFormat } from "@/utils/filter";

export default {
  data() {
    return {
      options: [],
      options2: [],
      value1: "",
      value2: "",
      paginations: {
        pageSize: 5,
        total: 0,
        pageSizes: [5, 10, 20, 50],
        layout: "total, sizes, prev, pager, next",
        page: 1,
      },
      /*  */
      id: "",
      tableData: [],
    };
  },
  methods: {
    //时间格式化
    dateFormat(cellValue) {
      return dateFormat(cellValue);
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
    async _getTags() {
      this.options = await getTags();
    },
    async _getList(params) {
      let res = await getList(params);
      console.log(res);
      this.tableData = res.list;
      this.paginations.total = res.total | 0;
    },
    async del(id, params) {
      let res = await del(id, params);
      this.$message({
        message: res.msg,
        type: "success",
      });
      this._getList({ ...this.paginations, id: this.id });
    },
    tagChange(val) {
      this.options2 = val;
      this.id = "";
    },
    ariticeChange(val) {
      this.id = val;
    },
    select() {
      this._getList({ ...this.paginations, id: this.id });
    },
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.pageSize = val;
      this._getList({ ...this.paginations, id: this.id });
    },
    handleCurrentChange(val) {
      this.paginations.page = val;
      this._getList({ ...this.paginations, id: this.id });
    },
    handleDelete(index, val) {
      console.log(val);
      let isReply = val.children ? !val.children.length === 0 : true;
      this.del(val._id, { isReply });
    },
  },
  created() {
    this._getTags();
    this._getList(this.paginations);
  },
};
</script>

<style lang="scss" scoped>
.top {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .top-inner {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 20px;
    div:first-child {
      margin-right: 10px;
      font-size: 14px;
    }
  }
}
/deep/.el-table__row--level-1 {
  &:nth-child(2n) {
    background-color: #fdf5e6;
  }
  &:nth-child(2n - 1) {
    background-color: #f0f9eb;
  }
}
.pagination {
  margin-top: 30px;
  width: 100%;
  text-align: right;
}
</style>
