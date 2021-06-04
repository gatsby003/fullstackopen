import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return(request.then(response => response.data))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log(response))
}

const serviceFunctions = {getAll, create, update, deletePerson} 

export default serviceFunctions
