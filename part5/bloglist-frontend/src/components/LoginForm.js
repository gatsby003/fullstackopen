
import React, { useState } from 'react'
import { addUser } from '../reducers/userReducer'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({
  setLoggedIn
}) => {

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  
  const handleSubmit =  async (e) => {
    e.preventDefault()
    const result =  await loginService.login(username, password)
    console.log(result)
    if (result){
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(result.data)
      )
      setUserName('')
      setPassword('')
      dispatch(addUser(result.data))
      console.log(result.data)
    }else{
      alert('wrong crednetials')
      setUserName('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="UserName"
          id="Username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          id="Password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <Button 
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  )


}



export default LoginForm