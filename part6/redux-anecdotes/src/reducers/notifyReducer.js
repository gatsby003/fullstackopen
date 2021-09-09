const defaultstate = null

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
        setTimeout(() => dispatch({type: 'UNSET_NOTIFICATION'}), time)
    }
}

export default notifyReducer