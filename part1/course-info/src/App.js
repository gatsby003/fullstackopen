import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  const rows = []
  for (var i = 0; i < props.course.parts.length; i++){
    rows.push(<Part part={(props.course.parts)[i]}/>)
  }
  return (
    <>
      {rows}
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.course.parts.forEach(t => total += t.exercises)

  return (
    <>
      Number of exercises {total}
    </>
  )
}

const App = () => {
  const course = {
    name : "Half Stack Application Development",
    parts : [
      {
        name : 'Fundamentals of React',
        exercises : 10
      },
      {
        name : 'Using props to pass data',
        exercises : 7
      },
      {
        name : 'State of a component',
        exercises : 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App;