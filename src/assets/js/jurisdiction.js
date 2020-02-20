import router from "../../router";
const jurisdiction = {
  cardIsDisplayed(type, card) {
    let displayed = false;
    let obj = JSON.parse(localStorage.getItem("modules"));
    // 找到相应路由，然后循环找出module集。
    obj[router.app._route.path].forEach(element => {
      if (element[type]) {
        // 找到module集后循环子模块。
        element[type].forEach(res => {
          if (res === card) {
            displayed = true;
          }
        });
      }
    });
    return displayed;
    // return router.app._route.path;
  }
};

export default jurisdiction;
