import React , { useState, useRef }from 'react'
import { notifyAction } from '../reducers/notifyReducer'
import { useDispatch } from 'react-redux'
import {newBlog} from '../services/blogs'
import { createBlogAction, initStore } from '../reducers/blogReducer'
const BlogForm = ({ newBlog, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(createBlogAction(title, author, url))
    dispatch(notifyAction(title, 5000, `Just Added ${title} by ${author}!`))
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <div>
        <form onSubmit={handleNewBlog}>
          <div>
            title :
            <input
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              type="text"
            />
          </div>
          <div>
            author :
            <input
              id="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              type="text"
            />
          </div>
          <div>
            url :
            <input
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              type="text"
            />
          </div>
          <div>
            <button type="submit" id="submit-btn">create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogForm