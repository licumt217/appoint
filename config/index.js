/**
 * Created by liqiang on 2017/5/23.
 */
let path=require('path')

module.exports={
    local: {
        env: {
            NODE_ENV: '"local"'
        },
        port: 8007,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/appoint_wx': {
                // target: 'http://www.zhuancaiqian.com/',//后端接口地址
                target: 'http://127.0.0.1:8350/',//后端接口地址
                changeOrigin: true,//是否允许跨越
                // pathRewrite: {
                //     '/appoint_wx/': '',//重写,
                // }
            }
        },
        cssSourceMap: true,
        sourceMap: true
    },
    prep:{
        env:{
            NODE_ENV:'"prep"'
        },
        index:path.resolve(__dirname,'../appoint/index.html'),
        assetsRoot:path.resolve(__dirname,'../appoint'),
        assetsSubDirectory:'static',
        assetsPublicPath:'/appoint/',
        productionSourceMap: false, //是否打开打包映射文件
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        sourceMap:false
    },
    prod:{
        env:{
            NODE_ENV:'"prod"'
        },
        index:path.resolve(__dirname,'../appoint/index.html'),
        assetsRoot:path.resolve(__dirname,'../appoint'),
        assetsSubDirectory:'static',
        assetsPublicPath:'/appoint/',
        productionSourceMap: false, //是否打开打包映射文件
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        sourceMap:false
    }
}

