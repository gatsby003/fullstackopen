import React , {useState} from 'react'

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(Array(anecdotes.length).fill(0))
  const findMax = () => {
    const maxElement = Math.max(...votes)
    console.log(maxElement)
    return votes.indexOf(maxElement)
  }
  const handleRandom = () => {setSelected(Math.floor(Math.random() * anecdotes.length))}
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    updateVotes(copy)
  }


  return (
    <div>
      {anecdotes[selected]}
      {<br/>}
      <p>This has {votes[selected]} votes.</p>
      {<br/>}
      <Button name={"next anecdote"} handleClick={handleRandom}/>
      <Button name={"vote"} handleClick={handleVote}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[findMax()]}
      <p>This has {votes[findMax()]} votes.</p>
    </div>
  )
}

export default App;
