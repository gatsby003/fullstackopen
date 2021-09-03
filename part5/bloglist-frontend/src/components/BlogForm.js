import React , { useState, useRef }from 'react'

const BlogForm = ({ newBlog, blogFormRef, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    const result = newBlog(title, author, url)
    setNotification(`a new blog ${title} by ${author}`)
    setTimeout(() => {setNotification(null)}, 5000)
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