import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import notifyReducer  from './reducers/notifyReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    blogs : blogReducer,
    notification : notifyReducer,
    user: userReducer
})


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,    
    document.getElementById('root'))