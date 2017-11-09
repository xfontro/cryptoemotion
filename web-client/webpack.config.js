const path = require('path');
const webpack = require('webpack');

 
module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        include: [/src/],
        loader: 'babel-loader',
        exclude: [/node_modules/, /dist/, /server/],
        query: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader',
        include: [/src/],
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      datamodel: path.resolve(__dirname, './src/datamodel'),
      helpers: path.resolve(__dirname, './src/helpers'),
      middlewares: path.resolve(__dirname, './src/middlewares'),
      staticdata: path.resolve(__dirname, './src/staticdata'),
      styles: path.resolve(__dirname, './src/styles'),
    }
  },
};
