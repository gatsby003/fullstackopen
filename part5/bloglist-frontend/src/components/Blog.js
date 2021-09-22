import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlogAction, likeBlogAction } from '../reducers/blogReducer'
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  return(
    <div key={blog.id}>
      {blog.title} by {blog.author}
      Likes : {blog.likes}
      <button onClick={() => dispatch(likeBlogAction(blog))}>
        Like
      </button>
      <button onClick={() => dispatch(deleteBlogAction(blog.id))}>
        Delete
      </button>
    </div>
)}

export default Blog