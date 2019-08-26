<template>
  <el-main>
    <breadcrumb/>
    <el-row class="row-list">
      <el-col :span="22">
        <div class="filter">
          <el-date-picker
            v-model="filtetime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-input placeholder="按用户名搜索" v-model="filtename" class="filter-input"/>
        </div>
        <el-button type="primary" size="medium" @click="handlefilter">筛选</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="info" plain size="medium" @click="handleAdd">添加信息</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="list.slice((paginations.currentPage-1)*paginations.pageSize,paginations.currentPage*paginations.pageSize)"
      border
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="identity" label="身份"></el-table-column>
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
    <userdialog :dialog="dialog" :form="form" @updatePage="_profile"/>
  </el-main>
</template>


<script>
import breadcrumb from "components/breadcrumb.vue";
import userdialog from "./userDialog";
import { users, deleteUser } from "api/account";
export default {
  data() {
    return {
      list: [],
      filterList: [],
      dialog: {
        show: false
      },
      form: {},
      paginations: {
        pageSize: 5,
        total: 0,
        pageSizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper",
        currentPage: 1,
      },
      filtetime: "",
      filtename: ""
    };
  },
  components: {
    breadcrumb,
    userdialog
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
    async _profile() {
      try {
        this.list = await users();
        this.list = this.list.data;
        console.log(this.list)
        this.filterList = this.list;
        this.paginations.total = this.list.length;
      } catch (error) {
        this.$message({
          message: "错误",
          type: "error"
        });
      }
    },
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
    async handleDelete(index, row) {
      let id = row["_id"];
      await deleteUser(id);
      this._profile();
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "用户编辑",
        add: false,
        ref: "edit",
        id: row._id
      };
      this.form = {
        name: row.name,
        email: row.email,
        identity: row.identity
      };
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加用户",
        add: true,
        ref: "add"
      };
      this.form = {};
    },
    handleSizeChange(val) {
      this.paginations.pageSize = val;
    },
    handleCurrentChange(val) {
      this.paginations.currentPage = val;
    },
    handlefilter() {
      this.list = this.filterList.filter(item => {
        let time = this.formateDate(item.date);
        return (
          time >= this.formateDate(this.filtetime[0]) &&
          time <= this.formateDate(this.filtetime[1]) &&
          item.name.indexOf(this.filtename) != -1 ||
          item.name.indexOf(this.filtename) != -1
        );
      });
    },
    //格式化时间
    formateDate(value) {
      return new Date(value).getTime();
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
    this._profile();
  },
};
</script>

<style lang="stylus">
.row-list
  margin 10px 0
  .filter
    display inline
    .filter-input
      width 200px
.pagination
  margin 10px 0
  text-align right
</style>
