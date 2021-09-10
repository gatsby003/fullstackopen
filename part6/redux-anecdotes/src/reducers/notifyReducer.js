const defaultstate = null
let timeOutId = null

const notifyReducer = (state=defaultstate, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            if (action)
            return {id : action.data.id}
        case 'UNSET_NOTIFICATION':
            return null
        default: 
            return state
    }
}

export const notifyVoteCast = (id, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {id}
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