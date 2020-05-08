<template>
  <el-header>
    <el-row justify="center" type="flex" align="center">
      <el-col :span="1">
        <span class="icon">
          <i class="el-icon-s-fold" @click="toggleIcon" v-if="!collapse"></i>
          <i class="el-icon-s-unfold" @click="toggleIcon" v-if="collapse"></i>
        </span>
      </el-col>
      <el-col :span="20">
        <breadcrumb />
      </el-col>
      <el-col :span="1" class="user">
        <div class="userinfo">
          <img :src="user.avatar" alt />
        </div>
      </el-col>
      <el-col :span="1" class="user">
        <span>{{ user.name }}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item divided command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import breadcrumb from "@/components/breadcrumb.vue";
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      collapse: false
    };
  },
  methods: {
    ...mapActions(["clearUser"]),
    handleCommand(command) {
      switch (command) {
        case "info":
          this.$alert(this.user, "个人信息", {
            confirmButtonText: "确定"
          });
          break;
        case "exit":
          this.clearUser();
          this.$router.push("/login");
      }
    },
    toggleIcon() {
      this.collapse = !this.collapse;
      this.$emit("isCollapse", this.collapse);
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
      .icon {
        i {
          color: #333 !important;
        }
      }
    }
    .el-col:nth-child(1) {
      display: flex;
      justify-items: center;
      align-items: center;
      margin-left: -30px;
      i {
        font-size: 25px;
        color: #fff;
      }
    }
    .user {
      display: flex;
      justify-items: center;
      align-items: center;
      .userinfo {
        width: 70%;
        margin-right: 5px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #cccccc;
        img {
          width: 100%;
        }
      }
      span {
        color: block;
      }
      .el-dropdown {
        i {
          color: block;
        }
      }
    }
  }
}
</style>
