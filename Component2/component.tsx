import { useState } from "react";

export default function NameInput(){
    const [name,setName] = useState('');
    const [age,setAge] = useState('')
    return(
        <div>
            <input value = {name}
            
            onChange={(e) => setName(e.target.value)}
            placeholder ="adını yaz" 
            />
            <input value={age} 
            onChange={(e) => setAge(e.target.value)}
            placeholder="yaşını yaz"/>
            <p>Adın: {name}
                
            </p>
        </div>
    )
}