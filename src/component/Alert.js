import React from 'react';
import { useSelector } from "react-redux"

export default function Alert() {
    const alert = useSelector(state=>state.user.alert)
    const changeCase = (word)=>{
        if(word==="danger") word = "Error";
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return(
        alert && <div className={`alert alert-${alert.type}`} role="alert">
          <strong>{changeCase(alert.type)} </strong> {alert.message}
        </div>
    )
}
