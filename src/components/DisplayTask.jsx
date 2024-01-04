import EditIcon from "remixicon-react/PencilLineIcon"
import DeleteIcon from "remixicon-react/DeleteBinLineIcon"
import { combineSlices } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { decrementTasksCompleted, incrementTasksCompleted } from "../store/appSlice";




export default function DisplayTask({task,id,isCompleted}){

    const dispatch = useDispatch();

    function DeleteItem(id){
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let newTasks = []
        tasks.map((task)=>{
            if(task.id !== parseInt(id)){
                newTasks.push(task)
            }else {
                if(task.completed){
                    dispatch(decrementTasksCompleted());
                    let n = JSON.parse(localStorage.getItem("completedTasks"));
                    localStorage.setItem("completedTasks",JSON.stringify(n-1));
                }   
            }
        })
        localStorage.setItem("tasks",JSON.stringify(newTasks));
    }

    function setCompleted(id,completed){
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.map((task)=>{
            if(task.id === parseInt(id)){
                if(completed){
                    task.completed = true;
                    dispatch(incrementTasksCompleted());
                    let n = JSON.parse(localStorage.getItem("completedTasks"));
                    localStorage.setItem("completedTasks",JSON.stringify(n+1));
                }else {
                    task.completed = false;
                    dispatch(decrementTasksCompleted());
                    let n = JSON.parse(localStorage.getItem("completedTasks"));
                    localStorage.setItem("completedTasks",JSON.stringify(n-1));
                }
            }
        })
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }

    function handleCheck(e){
    
        if (e.currentTarget.checked){
            e.currentTarget.parentElement.nextElementSibling.style.cssText = "text-decoration: line-through;";
            setCompleted(e.currentTarget.id,true);
                    
        }else {
            e.currentTarget.parentElement.nextElementSibling.style.cssText = "text-decoration: none;";
            setCompleted(e.currentTarget.id,false);
        }
    }   



    function handleDelete(e){
        const task = e.currentTarget.parentElement.parentElement;
        task.style.cssText = `
        opacity: 0;
        visibility: hidden;
        transform: translateY(-100%);
        position: absolute;
        width: -webkit-fill-available;
        `
        
        DeleteItem(e.currentTarget.id)




    }

    function handleEdit(e){
        
        let id = parseInt(e.currentTarget.id);


        function handleSave(){
            console.log("save")
            const newTask = document.getElementById("TaskEdit").value;
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.map((task)=>{
                if(task.id === id){
                    if (newTask.trim() !== "") {
                        task.task = newTask;
                    }
                }
            })
            localStorage.setItem("tasks",JSON.stringify(tasks))
            window.dispatchEvent(new Event('storage'))
        }


        
        const saveBtn = document.querySelector(".save-btn");
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.map((task)=>{
            if(task.id === parseInt(id)){
                
                document.getElementById("TaskEdit").value = task.task;
                saveBtn.addEventListener('click',handleSave);
            }
        })
    }


    

    return (
        <div className="task">
            <div className="task-status">
                <input defaultChecked={isCompleted} onClick={handleCheck} className="form-check-input" type="checkbox" id={id} value="option1"></input>      
            </div>
            <p className="task-content">{task}</p>
            <div className="task-manage">
                
                <button onClick={handleEdit} id={id} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <EditIcon color="#333"/>
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="TaskEdit" className="form-label fw-medium fs-5">New Task</label>
                                    <input type="email" className="form-control" id="TaskEdit"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" data-bs-dismiss="modal" className="btn btn-primary save-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


                <button id={id} onClick={handleDelete}>
                    <DeleteIcon color="red"/>
                </button>
            </div>
        </div>
    )
}