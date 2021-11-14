/* eslint-disable */

const path = require('path')
const webpack = require('webpack')

const appDirectory = path.resolve(__dirname, '../')

const host = process.env.WEBPACK_DEV_HOST || 'localhost'
const port = process.env.WEBPACK_DEV_PORT || '8080'
const serverUrl = `http://${host}:${port}`

const isDevserver = process.env.APP_ENV === 'devserver'
const isTestingTarget = process.env.APP_TARGET === 'testing'
const isDevelopmentBuild = process.env.NODE_ENV !== 'production'


function setupHotReload(entry) {
  return !isDevelopmentBuild ? entry : [
    `webpack-dev-server/client?${serverUrl}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ].concat(entry)
}

const babelOptions = {
  'presets': [
    '@babel/preset-react',
    ['@babel/preset-env', {
      'modules': false,
      'shippedProposals': true,
      'targets': {
        'browsers': [
          '> 1%',
          'last 3 versions',
          'ie >= 9',
          'ios >= 8',
          'android >= 4.2',
          'Explorer 11',
          'last 4 Edge versions'
        ]
      },
      'useBuiltIns': false
    }],
  ],
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'react-native-web',
    ['module-resolver', {
      'root': ['./src'],
      'extensions': ['.js', '.ios.js', '.android.js', '.web.js']
    }]
  ]
}

// add react-hot-loader plugin only in devserver environment, so it won't be
// included in vendor.bundle.js for small pages like landing
const babelHotOptions = {
  ...babelOptions,
  plugins: isDevserver ? [
    ...babelOptions.plugins,
    'react-hot-loader/babel'
  ] : babelOptions.plugins
}

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [
    path.resolve('./index.web.js'),
    path.resolve('./src'),
    path.resolve('./node_modules/react-native-uncompiled'),
  ],
  use: {
    loader: 'babel-loader',
    options: babelHotOptions
  },
}

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'react-native-web-image-loader?name=[hash].[ext]',
  },
}

const config = {
  context: __dirname,

  entry: {
    chat: './src/pages/chat/entry.js',
    //landing: './src/pages/landing/entry.js',
    restaurants: setupHotReload(['./src/pages/restaurants/entry.js']),
    questionnaire: setupHotReload(['./src/pages/questionnaire/entry.js']),
      profile: setupHotReload(['./src/pages/profile/entry.js']),
      tc: setupHotReload(['./src/pages/tc/entry.js']),
      pp: setupHotReload(['./src/pages/pp/entry.js']),
      components: setupHotReload(['./src/components/entry.js']),
  },

  output: {
    path: path.resolve('./dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['vendor.bundle.js'],
      moduleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BACKEND_HOST: JSON.stringify(process.env.BACKEND_HOST),
        BACKEND_PORT: JSON.stringify(process.env.BACKEND_PORT),
      },
      __CHAT_TOKEN__: JSON.stringify(process.env.CHAT_TOKEN),
      __GA_TOKEN__: JSON.stringify(process.env.GA_TOKEN),
      __DEV__: isDevelopmentBuild,
      __DEVSERVER__: isDevserver,
      __TESTING__: isTestingTarget,
    }),
  ],

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
    ],
  },

  resolve: {
    extensions: ['.js', '.web.js'],
      alias: {
              'react-native-svg': 'svgs',
      }
  },

  stats: {
    children: false,
    chunks: false,
  },

  watchOptions: {
    poll: false,
    ignored: /node_modules/,
  },

  node: {
    fs: 'empty',
  },

}


if (!isDevelopmentBuild) {
  config.mode = 'production'
  // config.optimization.minimize
  // Enabled in production mode. Elsewise disabled.
} else {
  config.mode = 'development'
  config.output.publicPath = serverUrl + config.output.publicPath
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  )
}

module.exports = config
