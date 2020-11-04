import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './ducks/store';
import './index.css';
const Router = process.env.NODE_ENV==='development' ? HashRouter : BrowserRouter


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
