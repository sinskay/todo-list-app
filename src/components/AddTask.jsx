import AddIcon from "remixicon-react/AddLineIcon"
import { useState } from "react";




export default function AddTask(){

    const [taskContent,setTaskContent] = useState("");    
 

    function AddTaskToLocalStorage(taskObj){

        if (!localStorage.getItem("tasks")){
            localStorage.setItem('tasks', JSON.stringify([]));

        }

        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        window.dispatchEvent(new Event('storage'))

    }
    
    

    


    function handleSubmit(e){
        e.preventDefault();
        let time = new Date();
        let task_obj = {
            id: time.getTime(),
            task: taskContent,
            completed: false,
        }

        if (taskContent.trim() !== "") {
            AddTaskToLocalStorage(task_obj);
        }
        document.querySelector(".form-control").value = "";
    }
    function handleTask(e){
        setTaskContent(e.currentTarget.value);
    }


    return (
        <div className="add-section">
            <h1 className="section-title">ToDo-List App</h1>
            <form onSubmit={handleSubmit}>

                
                
                <div className="input-group">
                    <input autoFocus onInput={handleTask} className="form-control" type="text" name="task" placeholder="type a task"/>    
                    <button className="input-group-text">
                        <AddIcon color="#fff"/>
                    </button>
                </div>

            </form>
        </div>
    )
}