import noteService from "../services/anecdotes"




const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log(action)

  switch (action.type){
    case 'VOTE': {
      const id = action.data.id
      const notetochange = state.find(n => n.id === id)
      const newObject = {
        ...notetochange,
        votes : notetochange.votes++,
      }
      console.log(newObject)
      return state
              .map(note => note.id !== id ? note : notetochange)
              .sort((a,b) => a.votes > b.votes ? -1 : 1); 
    }
    case 'ADD': {
      const note = action.data
      const newstate = [...state, note].sort((a,b) => a.votes > b.votes ? -1 : 1) 
      return newstate
    }

    case 'INIT': {
      console.log(action.data)
      return action.data
    }

    default:
      return state
  }
  
}

export const castVote = (id) => {
  return async dispatch => {
    await noteService.makeVote(id)
    dispatch({
      type: 'VOTE',
      data: {id}
    })
  }
}

export const addQuote = (data) => {
  return async dispatch => {
    const newNote = await noteService.createNew(data)
    dispatch({
      type: 'ADD',
      data : newNote
    })
    
  }
}

export const initAnec = () => {
  return async dispatch => {
    const anecdotes = await noteService.getAll()
    console.log(anecdotes)
    dispatch({
      type : 'INIT',
      data : anecdotes,
    })
  }
}


export default anecdoteReducer