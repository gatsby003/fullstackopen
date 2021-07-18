import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username 
        <input
          type="text"
          name ="Username"
          value = {username}
          onChange = {({target}) => {
            console.log(target.value)
            setUserName(target.value)
          }}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange = {({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blog = () => (
    <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
          username, password,
      })
      console.log(user)
      setUser(user)
      setUserName('')
      setPassword('')

    } catch (e) {
      console.log("bruh")
      console.log(e)
    }
  }

  return (
    <div>
    {user == null ? 
      loginForm() :
      blog()
    }
    </div>
  )
}

export default App