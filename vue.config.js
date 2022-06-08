const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets'
      }
    }
  },

  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.plugin('html').tap((args) => {
        args[0].isProd = true
        return args
      })
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          // filename: "[path][base].gz[query]",
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    })
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap((args) => {
        args[0].isProd = false
        return args
      })
    })
  }
}
