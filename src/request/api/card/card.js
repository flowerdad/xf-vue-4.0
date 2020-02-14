import axios from "../../http"; // 导入http中创建的axios实例

const card = {
  card() {
    return axios.get("/simulation/card.json");
  }
};

export default card;
