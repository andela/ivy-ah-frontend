const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        test: /\.js$/
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /plugin\.css$/,
        loaders: [
          'style-loader', 'css-loader',
        ],
      },
    ]
  },

  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: 'bundle.map',
    publicPath: '/'
  },
  devtool: '#source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    },
    minimizer: [new UglifyJsPlugin()]
  },
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'src/actions/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Api: path.resolve(__dirname, 'src/api/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Helpers: path.resolve(__dirname, 'src/helpers/'),
      Reducers: path.resolve(__dirname, 'src/reducers/'),
      Store: path.resolve(__dirname, 'src/store/'),
      Test: path.resolve(__dirname, 'src/test/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
    }
  }
};
