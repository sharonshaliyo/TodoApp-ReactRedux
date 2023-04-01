import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import tasks from './reducers'
import './index.css'

import logger from './middleware/logger'
import analytics from './middleware/analytics'
import apiMiddleware from './middleware/api'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()


// const store = createStore(
//   tasks,
//   composeWithDevTools(applyMiddleware(thunk, apiMiddleware, logger, analytics))
// //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

const store = createStore(
  tasks,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
