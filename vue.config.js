const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser")
      }
    }
  }
};

// vue.config.js
module.exports = {
  devServer: {
    proxy: 'http://127.0.0.1:8086'
  }
};

