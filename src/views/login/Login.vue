<template>
  <div>
    <h1>This is login</h1>
    <el-button @click="toLogin('role1')">权限1登录</el-button>
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
    toLogin(val) {
      this.$api.login.login().then(res => {
        if (res.status == 200) {
          this.$api.card.card().then(data => {
            if (data.status == 200) {
              this.initRouter(val);
              this.$store.commit("LOGIN_IN", {
                token: res.data.token,
                modules: JSON.stringify(data.data),
                role: val
              });
              this.$router.push("/home");
            }
          });
        }
      });
    },
    loginOut() {
      this.$store.commit("LOGIN_OUT");
    }
  }
};
</script>
