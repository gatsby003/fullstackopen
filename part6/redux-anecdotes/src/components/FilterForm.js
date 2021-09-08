import React from 'react' 
import { makeSearch } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'



const FilterForm = () => {
    const dispatch = useDispatch()
    const doChange = (query) => {
        console.log(query)
        dispatch(makeSearch(query))
    }
    
    return(
        <div>
            Filter : <input onChange={(e) => doChange(e.target.value)}/>
        </div>
    )
    
    
}

export default FilterForm