const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''

    // 代理目标地址
    // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
    if (req.url.startsWith('/api')) {
        target = 'http://202.193.53.235:8080'
        res.json({ code: 111 });
    }

    // 创建代理对象并转发请求
    // createProxyMiddleware({
    //     "target": target, //这里填写项目真实的后台接口地址
    //     changOrigin: true, //设置允许跨域
    //     pathRewrite: { //这个重写不可省略！因为我们真正请求的地址并不含 /api
    //         '^/api': ''
    //     }
    // })(req, res)

}