
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({
  setUser,
  setLoggedIn
}) => {

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit =  async (e) => {
    e.preventDefault()
    const result =  await loginService.login(username, password)
    console.log(result)
    if (result){
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(result.data)
      )
      loginService.setToken(result.data.token)
      setUser(result.data)
      setLoggedIn(true)
      setUserName('')
      setPassword('')
    }else{
      alert('wrong crednetials')
      setUserName('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username
        <input
          id="Username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id="Password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button 
          type="submit"
          id="login-button"
        >
          Submit
        </button>
      </div>
    </form>
  )


}



export default LoginForm