import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [notification, setNotification] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  const Notification = ({ message }) => {
    if (message == null){
      return null
    }
    return (
      <div>
        {message}
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  useEffect(() => {
    const userJSON =window.localStorage.getItem('loggedBlogUser')
    if (userJSON){
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setLoggedIn(false)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const logout = () => {
    return (
      <div>
        <p>{user.username} is logged in </p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }



  const loginForm = () => {

    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          setUser={setUser}
          setLoggedIn={setLoggedIn}
        />
      </Togglable>
    )
  }

  const newBlog = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          newBlog={blogService.newBlog}
          blogFormRef={blogFormRef}
          setNotification={setNotification}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message={notification}/>
      {
        user == null ?
          loginForm() :
          <div>
            <h2>blogs</h2>
            {newBlog()}
            {logout()}
          </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App