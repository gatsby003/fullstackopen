import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'


const counterReducer = (state=0, action) => {
  switch(action.type){
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
    case "ZERO":
      return 0
    default:
      return state
  }
}

// can also send preLoaded state
const store = createStore(counterReducer,5)
console.log(store.getState())
const App = () => {
  return (
    <div>
    <div>
      {store.getState()}
    </div>
    <button 
      onClick={e => store.dispatch({ type: 'INCREMENT' })}
    >
      plus
    </button>
    <button
      onClick={e => store.dispatch({ type: 'DECREMENT' })}
    >
      minus
    </button>
    <button 
      onClick={e => store.dispatch({ type: 'ZERO' })}
    >
      zero
    </button>
  </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

store.subscribe(renderApp)

export default App;
