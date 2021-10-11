import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import { TodoReducer } from './redux/TodoReducer';
import { Provider } from 'react-redux';
import './index.css';

const store = createStore(TodoReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
