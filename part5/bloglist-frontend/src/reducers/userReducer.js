const userReducer = (state=null, action) => {
    switch(action.type){
        case 'ADD':
            return action.data
        case 'REMOVE':
            return null
        default:
            return state
    }
}


export const addUser = (user) => {
    return async dispatch => {
        dispatch({
            type : 'ADD',
            data : user
        }
        )
    }
}

export const removeUser = () => {
    return async dispatch => {
        dispatch({
            type : 'REMOVE',
        }
        )
    }
}

export default userReducer