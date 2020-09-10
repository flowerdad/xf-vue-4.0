module.exports = {
  publicPath: "./",
  configureWebpack(config) {
    config.externals = {
      AMap: "AMap", // 高德地图配置
      annyang: 'annyang'
    };
  }
};
