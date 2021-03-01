const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src', 'assets'),
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@services': path.resolve(__dirname, 'src', 'services')
      }
    }
  }
}
