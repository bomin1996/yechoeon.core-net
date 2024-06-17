const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:26429";

//const context = ["/weatherforecast", "/graphql", "/DeviceNotificationHub", "/api/**"]; // public 밑에 이미지 접근을 개발환경에서도 가능하도록 등록
const context = [
  "/weatherforecast",
  "/graphql",
  "/DeviceNotificationHub",
  "/api",
  "/serverimages",
  "/gosiimages",
  "/content",
];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    // headers: {
    //   Connection: 'Keep-Alive'
    // }
    ws: true,

    // signalr 프록시 설정 keep-alive 삭제하고 ws:true 설정하기
  });

  app.use(appProxy);
};
