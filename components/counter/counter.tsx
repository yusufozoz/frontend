
import {  useState } from "react";
import { clearInterval } from "timers";

export default function Counter(){
   
    const [count, setCount] = useState(0);
    const handleClick =() => {
    const interval =setInterval(() => {
        setCount ((prev) => prev+1)
        
    })
    return() => clearInterval(interval);
    }
    
    return(
        <><h1>Sayaç: {count}</h1>
        <button onClick={handleClick}>arttır</button>
        
        </>
    )
    
}