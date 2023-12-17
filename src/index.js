import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import logger from './middleware/logger'
import analytics from './middleware/analytics'
import apiMiddleware from './middleware/api'
import './app/index.css'
import reportWebVitals from './reportWebVitals'
import App from './app/App'
import todosSlice from './state/todosSlice'

const store = configureStore({
    reducer: {
        todosReducer: todosSlice.reducer
    }
})
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Provider store={store}>
    <App />
</Provider>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
