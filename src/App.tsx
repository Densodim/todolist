import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./component/Todolist";

export type FilterValuesType = 'all'| 'active' | 'completed'

function App() {
    let task1:Array<TaskType> = [
        {id:1, title:'HTML&CSS', isDane:true},
        {id:2, title:'JS', isDane:true},
        {id:3, title:'ReactJS', isDane:false},
    ];


    let [task, setTask] = useState<TaskType[]>(task1);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    let taskForTodolist = task;

    switch (filter){
        case 'active':
            taskForTodolist = taskForTodolist.filter(task => !task.isDane);
            break;
        case 'completed':
            taskForTodolist = taskForTodolist.filter(task => task.isDane);
            break;
    }

    const removeTask = (taskId:number) => {
        const filteredTask = task.filter((task)=> task.id !== taskId );
        setTask(filteredTask);

    }
    const changeFilter = (filter:FilterValuesType) => {
        setFilter(filter);
    }

    return (
        <div className="App">
            <Todolist title='What to learn' task={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>

        </div>
    );
}

export default App;
