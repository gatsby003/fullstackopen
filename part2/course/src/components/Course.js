import React from 'react'

  const Header = ({course}) => {
    return (
      <>
        <h2>{course.name}</h2>
      </>
    )
  }
  
  const Part = ({part}) => {
    return (
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Content = ({course}) => {
    const rows = []
    for (var i = 0; i < course.parts.length; i++){
      rows.push(<Part key={course.parts[i].id} part={(course.parts)[i]}/>)
    }
    return (
      <>
        {rows}
      </>
    )
  }
  
  const Total = ({course}) => {
    
    const total = course.parts
        .map(part => part.exercises)
        .reduce((sum, part) => sum+part)
    return (
      <>
        <h3>total of {total} exercises</h3>
      </>
    )
  }

  const Course = ({courses}) => {
      const content = []
      courses.forEach(course => {
          content.push(
              <div key={course.key}>
                <Header course={course}/>
                <Content course={course}/>
                <Total  course={course}/>
              </div>
          )
      })

      return (content)
  }

  export default Course;