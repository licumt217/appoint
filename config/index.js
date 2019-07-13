/**
 * Created by liqiang on 2017/5/23.
 */
let path=require('path')

module.exports={
    local: {
        env: {
            NODE_ENV: '"local"'
        },
        port: 9080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: true,
        sourceMap: true
    },
    prep:{
        env:{
            NODE_ENV:'"prep"'
        },
        index:path.resolve(__dirname,'../questionpc/index.html'),
        assetsRoot:path.resolve(__dirname,'../questionpc'),
        assetsSubDirectory:'static',
        assetsPublicPath:'/questionpc/',
        productionSourceMap: false, //是否打开打包映射文件
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        sourceMap:false
    },
    prod:{
        env:{
            NODE_ENV:'"prod"'
        },
        index:path.resolve(__dirname,'../questionpc/index.html'),
        assetsRoot:path.resolve(__dirname,'../questionpc'),
        assetsSubDirectory:'static',
        assetsPublicPath:'/questionpc/',
        productionSourceMap: false, //是否打开打包映射文件
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        sourceMap:false
    }
}

