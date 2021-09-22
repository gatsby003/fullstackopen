let timeOutId;
const notifyReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            if (action)
            return {id : action.data.id,
                    message : action.data.message
            }
        case 'UNSET_NOTIFICATION':
            return null
        default: 
            return state
    }
}

export const notifyAction = (title, time, message) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {title, message}
        })
        if (timeOutId != null){
            clearTimeout(timeOutId)
        }
        timeOutId = setTimeout(() => {
            dispatch({type: 'UNSET_NOTIFICATION'})
            timeOutId = null;
        }, time)
    }
}

export default notifyReducer