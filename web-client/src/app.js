import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'datamodel/store';
import App from `${__dirname}/containers/App`;

const store = configureStore();

document.addEventListener('DOMContentLoaded', function() {
  render(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
