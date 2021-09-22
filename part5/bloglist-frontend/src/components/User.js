import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, TableContainer, TableCell, TableBody, TableRow } from '@material-ui/core'


const User = () => {

    const [user, setUser] = useState("")
    const [blogs, setBlogs] = useState([])
    const id = useParams().id
    useEffect(async () => {
        const baseUrl = "http://localhost:3003/api/users"
        const result = await axios.get(baseUrl)
        
        const user = result.data.find(user => user.id === id)
        setUser(user)
        setBlogs(user.blogs)

    }, [])

    return (

        <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {blogs.map(blog => <TableRow key={blog.id}><TableCell>{blog.title}</TableCell> <TableCell>{blog.author}</TableCell></TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>

    )

    


}



export default User