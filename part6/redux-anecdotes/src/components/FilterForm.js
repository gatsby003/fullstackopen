import React from 'react' 
import { makeSearch } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const FilterForm = (props) => {
    const doChange = (query) => {
        console.log(query)
        props.makeSearch(query)
    }
    
    return(
        <div>
            Filter : <input onChange={(e) => doChange(e.target.value)}/>
        </div>
    )
    
    
}
const mapDispatchToProps = {
    makeSearch
  }
  
const ConnectedFilterForm = connect(null, mapDispatchToProps)(FilterForm)
export default ConnectedFilterForm