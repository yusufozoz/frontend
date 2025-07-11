import { useState } from "react";
export default function TodoList(){
    const [task,setTask] = useState('');
    const[tasks,setTasks]=useState([]);

    const handleClick =() => {
        if(task.trim()=== '')return;
        setTasks([...tasks,task]);
        setTask('')

    };
    return(
        <div>
            <input value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Görev Ekle" />
            <button onClick={handleClick}>Ekle</button>
            <ul>
                {tasks.map((t,index)=>
            <li key ={index} >{t}</li>)}
            </ul>
        </div>
    )
}