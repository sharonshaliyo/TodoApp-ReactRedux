import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { projectsReducer, tasksReducer, pageReducer, } from './reducers'

import logger from './middleware/logger'
import analytics from './middleware/analytics'
import apiMiddleware from './middleware/api'

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
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Provider store={store}>
    <App />
</Provider>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
