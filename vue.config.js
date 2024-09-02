// const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // transpileDependencies: true,
  lintOnSave: false,
  // publicPath: '/',
  publicPath: '/yunfengkan620.github.io/',
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
