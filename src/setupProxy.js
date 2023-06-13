const { createProxyMiddleware } = require("http-proxy-middleware");

const port = Number(process.env.SERVER_PORT) || 5000;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://localhost:${port}`,
      changeOrigin: true,
    })
  );
};
