const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    client: {
      webSocketURL: 'ws://0.0.0.0:3000/ws'
    },
    proxy: {
      '/api': {
        target: 'http://8.134.68.12:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
