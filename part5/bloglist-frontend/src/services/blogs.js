import axios from 'axios'
import { token } from './login'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = async (title, author, url) => {
  const request = {
    title,
    author,
    url
  }
  const config = {
    headers: {
      Authorization: token,
    }
  }

  const result = await axios.post(
    baseUrl,
    request,
    config
  )
  return result
}

export default {
  getAll ,
  newBlog

}