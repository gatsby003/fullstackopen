const axios = require('axios')
const baseUrl = 'http://localhost:3003/api/login'
let token = null

const login = async (username, password) => {
    try{
        const result = await axios.post(
            baseUrl, 
            {
                username,
                password
            }
        )
        return result
    } catch {
        console.log("wrong credentials") 
    }
}

const setToken = (token) => {
    token = `bearer ${token}`
    console.log(token)
}

module.exports = {
    login,
    setToken,
}