// import base from "../../base"; // 导入接口域名列表
import axios from "../../http"; // 导入http中创建的axios实例
// import qs from "qs"; // 根据需求是否导入qs模块

const router = {
  // 获取router
  getRouterGet() {
    return axios.get("/simulation/router.json");
  },
  getRouterPromise(data) {
    return new Promise((resolve, reject) => {
      axios
        .get("/simulation/router.json", { params: data })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async getRouter(val) {
    let res = await router.getRouterPromise();
    return init(res.data[val], []);
    function init(data, arr) {
      data.forEach((datas, index) => {
        arr.push({
          path: datas.path,
          name: datas.name,
          component: () => import("../../../views/" + datas.component + ".vue"),
          children: [],
          nav: datas.nav,
          icon: datas.icon,
          meta: datas.meta
        });
        if (datas.children && datas.children.length > 0) {
          let childArr = init(datas.children, []);
          arr[index].children = childArr;
        }
      });
      return arr;
    }
  }
};

export default router;
