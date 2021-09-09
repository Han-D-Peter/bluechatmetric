const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "http://ec2-54-180-203-163.ap-northeast-2.compute.amazonaws.com/AI/sendMessage/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 하위 url 초기화
      },
    })
  );
};
