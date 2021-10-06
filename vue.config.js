module.exports = {
    publicPath: './',
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: 'localhost',
        port: 8070,
        //https:{type:Boolean}
        https: false, 
        proxy: {
            '/article': {
                target: 'http://localhost:8006', // 后面换成线上后端地址
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    '^/article': ''
                }
            },
            '/auth': {
                target: 'http://localhost:8006', // 后面换成线上后端地址
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    '^/auth': ''
                }
            },
        }
    }
}