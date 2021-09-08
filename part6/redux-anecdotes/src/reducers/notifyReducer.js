const defaultstate = null

const notifyReducer = (state=defaultstate, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return {id : action.data.id}
        default: 
            return state
    }
}

export const notifyVoteCast = (id) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {id}
    }
}

export default notifyReducer