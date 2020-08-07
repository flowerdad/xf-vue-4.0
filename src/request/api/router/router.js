const router = {
  getRouter(res) {
    return init(res, []);
    function init(data, arr) {
      data.forEach((datas, index) => {
        arr.push({
          path: datas.path,
          name: datas.name,
          component: () => import("../../../views/public/view.vue"),
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
