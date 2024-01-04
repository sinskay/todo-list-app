import { useEffect, useState } from "react";
import DisplayTask from "./DisplayTask";
import { useSelector } from 'react-redux'


export default function DisplayTasks(){

    const [tasks,setTasks] = useState([]);
    const CompletedTasks = useSelector((state)=>state.app.TasksCompleted)
    
    
    let tasksLength = JSON.parse(localStorage.getItem("tasks"));
    
    
    useEffect(()=>{
        const updateTasks = () => {
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            setTasks(storedTasks);
        };
        updateTasks();
        window.addEventListener('storage', updateTasks);
        return ()=>{
            window.removeEventListener('storage', updateTasks);
        }
    },[])


    return (
        <div className="display-section">
            <p className="x-completed section-title"><span className="n-left">{CompletedTasks || JSON.parse(localStorage.getItem("completedTasks"))}</span>/<span className="n-right">{tasksLength?.length || 0}</span> Completed</p>
            <div className="separator"></div>


            <div className="tasks position-relative">
                
                {tasks.map((task)=> <DisplayTask key={task.id} id={task.id} task={task.task} isCompleted={task.completed}/>)}

                
            </div>

        </div>
    )
    
}