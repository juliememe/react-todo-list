import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from "react-redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "./state";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
