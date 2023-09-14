import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { /* devToolsEnhancer,*/ composeWithDevTools } from 'redux-devtools-extension'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { combineReducers } from 'redux';
import { projectsReducer, tasksReducer, pageReducer, } from './reducers'
import './index.css'

import logger from './middleware/logger'
import analytics from './middleware/analytics'
import apiMiddleware from './middleware/api'

// const reducer = combineReducers(projectsReducer, tasksReducer, pageReducer)

const rootReducer = (state = {}, action) => {
  return {
    projects: projectsReducer(state.projects, action),
    tasks: tasksReducer(state.tasks, action),
    page: pageReducer(state.page, action)
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware, logger, analytics))
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

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
