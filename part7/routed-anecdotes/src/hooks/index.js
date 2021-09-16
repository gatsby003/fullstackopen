import { useState } from "react";

export const useField = (type, name) => {
    const[value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const clearme = () => {
        setValue('')
    }
    return {
        clearme,
        type,
        value,
        onChange,
        name
    }
}

