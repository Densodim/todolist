import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./component/Todolist";

function App() {
    const task1:Array<TaskType> = [
        {id:1, title:'HTML&CSS', isDane:true},
        {id:2, title:'JS', isDane:true},
        {id:3, title:'ReactJS', isDane:false},
    ]
    const task2:Array<TaskType> = [
        {id:1, title:'Hello world', isDane:true},
        {id:2, title:'I am Happy', isDane:false},
        {id:3, title:'Yo', isDane:false},
    ]
    return (
        <div className="App">
            <Todolist title='What to learn' task={task1}/>
            <Todolist title='Song' task={task2}/>
        </div>
    );
}

export default App;
