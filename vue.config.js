// module.exports = {
//   lintOnSave: false,
//   publicPath: "./",
//   devServer: {
//     port: 9100,
//     disableHostCheck: true
//   }
// };

module.exports = {
  publicPath: "./",
  configureWebpack(config) {
    config.externals = {
      AMap: "AMap" // 高德地图配置
    };
  }
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // data: `@import "~@/assets/scss/variables.scss";`
  //       prependData: `@import "~@/assets/scss/variables.scss";`
  //     }
  //   }
  // }
};
