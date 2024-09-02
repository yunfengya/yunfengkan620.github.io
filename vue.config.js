// const { defineConfig } = require('@vue/cli-service')
const path = require('path')
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
    open: true,
    hot: true,
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
  },
  
}
