
import React from "react"
import { useSelector } from "react-redux"
import { Alert } from '@material-ui/lab/'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    
    if (notification == null){
        return <div></div>
    }else {
        return (
            <div>
            {<Alert severity="success">
                    {notification.message}
                </Alert>}
            </div>
        )   
    }
}

export default Notification