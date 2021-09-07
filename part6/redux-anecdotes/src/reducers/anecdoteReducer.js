const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
      const content = action.data.content
      const note = asObject(content)
      const newstate = [...state, note].sort((a,b) => a.votes > b.votes ? -1 : 1) 
      return newstate
    }

    default:
      return state
  }
  
}

export const castVote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const addQuote = (content) => {
  return {
    type: 'ADD',
    data: {content}
  }
}

export default reducer