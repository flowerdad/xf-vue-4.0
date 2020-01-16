// import base from "../../base"; // 导入接口域名列表
import axios from "../../http"; // 导入http中创建的axios实例
// import qs from "qs"; // 根据需求是否导入qs模块

const login = {
  // 获取router
  getRouter() {
    return axios.get("/login.json");
  },
  getRouterPromise(data) {
    return new Promise((resolve, reject) => {
      axios
        .get("/login.json", { params: data })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default login;
