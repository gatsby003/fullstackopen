import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import anecdoteReducer, { initAnec } from './reducers/anecdoteReducer'
import notifyReducer from './reducers/notifyReducer';
import filterReducer from './reducers/filterReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
    anecdotes : anecdoteReducer,
    notification: notifyReducer,
    filter: filterReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))



export default store;