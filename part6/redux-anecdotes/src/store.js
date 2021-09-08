import { createStore, combineReducers } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer'
import notifyReducer from './reducers/notifyReducer';
import filterReducer from './reducers/filterReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes : anecdoteReducer,
    notification: notifyReducer,
    filter: filterReducer,
})

const store = createStore(reducer,composeWithDevTools())

export default store;