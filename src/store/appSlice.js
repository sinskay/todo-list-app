import { createSlice } from "@reduxjs/toolkit";


let n = 0;
if(localStorage.getItem("completedTasks")){
    n = JSON.parse(localStorage.getItem("completedTasks"));
}else {
    n = localStorage.setItem("completedTasks",0)
}

const  initialState = {
    TasksCompleted: n
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        incrementTasksCompleted: (state)=>{
            state.TasksCompleted += 1;
        },
        decrementTasksCompleted: (state)=>{
            state.TasksCompleted -= 1;
        },

    }
})


export const { incrementTasksCompleted,decrementTasksCompleted } = appSlice.actions;
export default appSlice.reducer;