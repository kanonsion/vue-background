<template>
  <el-main>
    <el-table :data="list" border style="width: 100%;">
      <el-table-column
        prop="date"
        label="日期"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="identity" label="身份"></el-table-column>
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
    <userdialog
      :dialog="dialog"
      :form="form"
      @updatePage="_profile"
      @close="handleClose"
    />
  </el-main>
</template>

<script>
import userdialog from "./userDialog";
import { users, deleteUser } from "@/api/account";
import { dateFormat } from "@/utils/filter";
export default {
  data() {
    return {
      list: [],
      filterList: [],
      dialog: {
        show: false,
      },
      form: {},
      paginations: {
        pageSize: 5,
        total: 0,
        pageSizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next",
        currentPage: 1,
      },
      filtetime: "",
      filtename: "",
    };
  },
  components: {
    userdialog,
  },
  methods: {
    handleollapse(data) {
      this.isCollapse = data;
      if (data) {
        this.asideWidth = 65;
      } else {
        this.asideWidth = 200;
      }
    },
    async _profile(page, pageSize) {
      let list = await users({
        page: page,
        pageSize: pageSize,
      });
      this.paginations.total = list.total;
      this.list = list.user;
    },
    dateFormat(cellValue) {
      return dateFormat(cellValue);
    },
    async handleDelete(index, row) {
      let id = row["_id"];
      await deleteUser(id);
      this._profile(this.paginations.currentPage, this.paginations.pageSize);
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "用户编辑",
        add: false,
        ref: "edit",
        id: row._id,
      };
      this.form = {
        name: row.name,
        email: row.email,
        identity: row.identity,
      };
    },
    handleAdd() {
      this.form = {};
      this.dialog = {
        show: true,
        title: "添加用户",
        add: true,
        ref: "add",
      };
    },
    handleSizeChange(val) {
      this.paginations.pageSize = val;
    },
    handleCurrentChange(val) {
      this.paginations.currentPage = val;
    },
    handlefilter() {
      this.list = this.filterList.filter((item) => {
        let time = this.formateDate(item.date);
        return (
          (time >= this.formateDate(this.filtetime[0]) &&
            time <= this.formateDate(this.filtetime[1]) &&
            item.name.indexOf(this.filtename) != -1) ||
          item.name.indexOf(this.filtename) != -1
        );
      });
    },
    //格式化时间
    formateDate(value) {
      return new Date(value).getTime();
    },
    handleClose() {
      this.form = {};
    },
    //搜索高亮
    /*  showDate(val) {
      val = val + "";
      if (val.indexOf(this.filtename) !== -1 && this.filtename !== "") {
        return val.replace(
          this.filtename,
          '<font color="#409EFF">' + this.filtename + "</font>"
        );
      }else{
        return val
      }
    } */
  },
  created() {
    this._profile(this.paginations.currentPage, this.paginations.pageSize);
  },
};
</script>

<style lang="scss" scoped>
.row-list {
  margin: 10px 0;
  .filter {
    display: inline;
    .filter-input {
      width: 200px;
    }
  }
}
.pagination {
  margin: 10px 0;
  text-align: right;
}
</style>
