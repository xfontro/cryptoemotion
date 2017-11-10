const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
 
const compiler = webpack(webpackConfig);
 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});
app.use(express.static('public'));
app.use(express.static(__dirname + '/dist'));
 
app.use(webpackDevMiddleware(compiler, {
  filename: 'bundle.js',
  publicPath: '/public',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(require('webpack-hot-middleware')(compiler));
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
