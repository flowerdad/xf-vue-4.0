<template>
  <div>
    <h1>This is login</h1>
    <el-button @click="toLogin()">权限1登录</el-button>
    <el-button type="primary" @click="toLogin('role2')">权限2登录</el-button>
    <el-button type="success" @click="toLogin('role3')">权限3登录</el-button>
    <el-button type="danger" @click="loginOut()">退出登录</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import router from "@/router/index";
export default {
  data() {
    return {
      // role: []
    };
  },
  methods: {
    ...mapActions(["initRouter"]),
    toLogin() {
      this.$api.login.login().then(res => {
        if (res.status == 200) {
          // 初始化路由
          this.initRouter(res.data.projectConfig);
          // 初始全局配置
          this.$store.commit("login_in", {
            token: res.data.token,
            config: JSON.stringify(res.data),
            theme: res.data.theme
          });
          this.$router.push("/home");
        }
      });
    },
    loginOut() {
      this.$store.commit("login_out");
    }
  }
};
</script>
