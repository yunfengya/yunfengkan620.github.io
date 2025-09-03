// const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // transpileDependencies: true,
  lintOnSave: false,
  // publicPath: '/',
  // publicPath: '/yunfengkan620.github.io/',
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/yunfengkan620.github.io/" : "/",
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    // host: '127.0.0.1',
    host: "localhost",
    port: 8080,
    open: true,//自动打开浏览器
    hot: true,//启用了热模块替换,允许您在不刷新页面的情况下更新模块
    // overlay: {
    //   warnings: false,
    //   errors: true,
    // },
  },
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') },
      alias: {
        '@': resolve('src'),
      },
    },
     plugins: [
      new CompressionWebpackPlugin({
        // cache: false, // 不启用文件缓存                  
        test: /\.(js|css|html|ttf|eot|woff|png|svg|jpg|jpeg)?$/i, // 压缩文件格式     
        filename: '[path].gz[query]', // 压缩后的文件名  
        algorithm: 'gzip', // 使用gzip压缩             
        // threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240
        minRatio: 0.8 // 压缩率小于1才会压缩                  
      }),
      new BundleAnalyzerPlugin(),// 打包分析插件,启动项目 后可以看到打包后的文件大小，方便优化
    ],
  },
  
}
