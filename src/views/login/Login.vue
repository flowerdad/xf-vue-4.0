<template>
  <div>
    <h1>This is login</h1>
    <el-button @click="toLogin('role1')">权限1登录</el-button>
    <el-button type="primary" @click="toLogin('role2')">权限2登录</el-button>
    <el-button type="success" @click="toLogin('role3')">权限3登录</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "@/router/index";
export default {
  data () {
    return {
      role: []
    };
  },
  methods: {
    ...mapActions(["set_roleRouterRules"]),
    async toLogin (val) {
      await this.initRouter(val);
    },
    async initRouter (val) {
      let res = await this.$api.router.getRouterPromise();
      return init(res.data[val], []);
      function init (data, arr) {
        data.forEach((datas, index) => {
          arr.push({
            path: datas.path,
            name: datas.name,
            component: () => import("../" + datas.component + ".vue"),
            children: []
          });
          if (datas.children && datas.children.length > 0) {
            let childArr = init(datas.children, []);
            arr[index].children = childArr;
          }
        });
        let noeFound = [
          {
            path: "*",
            name: "404",
            component: () => import("@/views/error/404.vue")
          }
        ];
        router.addRoutes(arr.concat(noeFound));
        return arr.concat(noeFound);
      }
    }
  }
};
</script>
