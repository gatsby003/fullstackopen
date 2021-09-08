const defaultState = ""


const searchReducer = (state=defaultState, action) => {
    console.log(action.type, action.data)
    switch(action.type){
        case 'FILTER' : 
            return action.data
        default:
            return state
    }
} 

export const makeSearch = (query) => {
    return {
        type: 'FILTER',
        data: {
            query
        }
    }

}

export default searchReducer