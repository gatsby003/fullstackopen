import axios from 'axios'
import { token } from './login'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getconfig = () => {
  const user = JSON.parse(localStorage.getItem('loggedBlogUser'))
  console.log(user)
  return {
    headers: {
      Authorization: `bearer ${user.token}`,
    }
  }

}

const newBlog = async (title, author, url) => {
  const request = {
    title,
    author,
    url,
    likes : 0
  }

  const result = await axios.post(
    baseUrl,
    request,
    getconfig()
  )
  return result.data
}



const deleteBlog = async(id) =>{
  await axios.delete(
    `${baseUrl}/${id}`,

    getconfig()
  )
}

const likeBlog = async(blog) => {
  console.log(blog)
  const likedBlog = {
    title : blog.title,
    author : blog.author,
    url : blog.url,
    likes : blog.likes + 1,

  }
  await axios.put(
    `${baseUrl}/${blog.id}`,
    likedBlog,
    getconfig()
  )
}

export default {
  getAll ,
  newBlog,
  deleteBlog,
  likeBlog

}