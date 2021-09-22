const axios = require('axios')
const baseUrl = 'http://localhost:3003/api/login'

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

module.exports = {
    login,
}