module.exports = {
    devServer: {
        port: 46204,
        https: false,
        allowedHosts: "all",
        host: "localhost",
        proxy: {
            '/api': {     //这里最好有一个 /
                target: 'http://localhost:46018',  // 后台接口域名
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
        }
    }
}