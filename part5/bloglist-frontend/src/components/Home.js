
import React, { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'
import { initStore } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { addUser, removeUser } from '../reducers/userReducer'
import {Link} from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { Table, TableContainer, TableCell, TableBody, TableRow } from '@material-ui/core'


const Home = () => {

    // const [loggedIn, setLoggedIn] = useState(false)
    const [loginVisible, setLoginVisible] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(initStore())
    },[])


    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const blogFormRef = useRef()

    const loginForm = () => {

        return (
        <Togglable buttonLabel='login'>
            <LoginForm/>
        </Togglable>
        )
    }

    const newBlog = () => {
        return (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
            newBlog={blogService.newBlog}
            blogFormRef={blogFormRef}
            />
        </Togglable>
        )
    }


        
    return(
    <div>
      <Notification/>
      {
        user == null ?
          loginForm() :
          <div>
            {newBlog()}
          </div>
      }
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {blogs.map(blog =>
            <TableRow key={blog.id}>
            <TableCell>
            <Link to={`/blogs/${blog.id}`}>
            {blog.title}
            </Link>
            </TableCell>
            <TableCell>
              {blog.author}
            </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
)}

export default Home