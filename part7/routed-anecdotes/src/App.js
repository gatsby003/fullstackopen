import React, { useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Button, Alert } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect, useHistory
} from "react-router-dom"

import {useField} from './hooks/index'

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const a = anecdotes.find(anecdote => anecdote.id === id)
  console.log(anecdotes, id, a)
  return (
    <div>
      <div><h1>{a.content}</h1></div>
      <div><strong>~ {a.author}</strong></div>
      <div>Votes : {a.votes}</div>
      <a href={a.info}>Link</a>
    </div>
  )


}

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
    <tbody>
      {anecdotes.map(anecdote => <tr key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </tr>)}
    </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({addNew, setNotification}) => {
  const history = useHistory()

  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'info')


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content : content.value,
      author: author.value,
      info : info.value,
      votes: 0
    })
    history.push('/')
    setNotification(content.value)
  }

  const clearField = () => {
    content.clearme()
    author.clearme()
    info.clearme()
  }



  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control
              {...content}
          />
        <Form.Label>
          author
        </Form.Label>  
          <Form.Control {...author}/>
        <Form.Label>
          url for more info
        </Form.Label>
          <Form.Control {...info} />
        <Button variant="primary">create</Button>
        </Form.Group>
      </Form>
      <Button variant="danger" onClick={() => clearField()}>clear</Button>
    </div>
  )

}

const Notification = ({notification, setNotification}) => {
  setTimeout(() => setNotification(''), 5000)
  return (<Alert variant="success">
    just added {notification}!
  </Alert>)
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div class="container">
      <h1>Software anecdotes</h1>
      <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/create">create</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      {notification ? <Notification 
        notification={notification} 
        setNotification={setNotification}
      />  : <></>}
      
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes}/>
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} setNotification={setNotification}/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
    </div>
  )
}

export default App;