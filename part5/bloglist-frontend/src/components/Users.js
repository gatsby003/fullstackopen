import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'


const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(async () => {
        const baseUrl = "http://localhost:3003/api/users"
        const result = await axios.get(baseUrl)
        setUsers(result.data)
    }, [])

    return (
        <div>
        <h1>Users</h1>

        {users.map(user => 
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link> 
            has contributed {user.blogs.length} blogs</li>)}
        </div>
    )
}

export default Users