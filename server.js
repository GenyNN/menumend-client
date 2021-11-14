const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: {
    index: 'landing.html',
    rewrites: [
      { from: /^\/profile/, to: '/profile.html' },
      { from: /^\/tc/, to: '/tc.html' },
      { from: /^\/pp/, to: '/pp.html' },
      { from: /^\/r/, to: '/landing.html' },
    ],
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}).listen(8080, 'localhost', (err, result) => {
  if (err) {
    return console.log(err)
  }

  console.log('Listening at http://localhost:8080/')
})
