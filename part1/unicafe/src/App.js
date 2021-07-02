import React, { useState }from 'react'

const Header = ({heading}) => {
  return (
      <h1>{heading}</h1>
  )
}

const Button = ({clickHandle, name}) => {
  return (
    <>
      <button onClick={clickHandle}>{name}</button>
    </>
  )
}

const Statistics = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const StatSection = ({stats, good, bad, neutral}) => {
  if (good === 0 && bad === 0 && neutral === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return stats
}

 
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = 
    <table>
      <tbody>
      <Statistics name="Good" value={good}/>
      <Statistics name="Neutral" value={neutral}/>
      <Statistics name="Bad" value={bad}/>
      <Statistics name="Average" value={(good + bad + neutral)/3}/>
      <Statistics name="Positive" value={good*100/(good + bad + neutral)}/>
      </tbody>
    </table>
  
  return (
  <div>
    <Header heading="Give Feedback"/>
    <Button clickHandle={() => setGood(good + 1)} name={"Good"}/>
    <Button clickHandle={() => setNeutral(neutral + 1)} name={"Neutral"}/>
    <Button clickHandle={() => setBad(bad + 1)} name="Bad"/>
    <Header heading="Statistics"/>
    <StatSection stats={stats} good={good} bad={bad} neutral={neutral}/>
  </div>)
}

export default App;