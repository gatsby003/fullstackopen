import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser, removeUser } from "../reducers/userReducer"
import { Button } from "@material-ui/core"
const Hero = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      const userJSON =window.localStorage.getItem('loggedBlogUser')
      if (userJSON){
          const user = JSON.parse(userJSON)
          dispatch(addUser(user))
      }
    }, [])

    const user = useSelector(state => state.user)

    const handleLogout = () => {
      dispatch(removeUser())
      // setLoggedIn(false)
      window.localStorage.removeItem('loggedBlogUser')
    }
  
    const logout = () => {
      return (
      <div>
          <Button variant="outlined" onClick={handleLogout}>logout</Button>
      </div>
      )
    }

    if (user == null){
      return (<h2>blogs</h2>)
    }else {
      return( 
      <div>
        <p>
          <h2>blogs</h2>
          {user.name} is logged in!
          {logout()}
        </p>
      </div>
      ) 
    }
  }

export default Hero