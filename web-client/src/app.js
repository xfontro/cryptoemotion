import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'datamodel/store';
var app_dir = path.resolve(__dirname, './containers/App');
const App = require(app_dir);

const store = configureStore();

document.addEventListener('DOMContentLoaded', function() {
  render(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
