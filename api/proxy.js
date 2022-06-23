const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res, next) => {
    let target = ''

    // 代理目标地址
    // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径

    target = 'http://202.193.53.235:8080/'
        // res.json({ code: 111 });


    // 创建代理对象并转发请求
    createProxyMiddleware({
        target, //目标地址
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '/' } //这里重写路径
    })(req, res, next)

}