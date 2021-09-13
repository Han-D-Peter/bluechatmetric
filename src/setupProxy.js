const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://52.79.149.180:443/AI/sendMessage/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 하위 url 초기화
      },
    })
  );
};
