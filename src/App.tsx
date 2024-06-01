import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./component/Todolist";
import {v1} from 'uuid'


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    // global state
    let task1: Array<TaskType> = [
        {id: v1(), title: 'HTML&CSS', isDane: true},
        {id: v1(), title: 'JS', isDane: true},
        {id: v1(), title: 'ReactJS', isDane: false},
    ];

    let [task, setTask] = useState<TaskType[]>(task1);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    let taskForTodolist: Array<TaskType> = task;

    switch (filter) {
        case 'active':
            taskForTodolist = taskForTodolist.filter(task => !task.isDane);
            break;
        case 'completed':
            taskForTodolist = taskForTodolist.filter(task => task.isDane);
            break;
    }

    const removeTask = (taskId: string) => {
        const filteredTask = task.filter((task) => task.id !== taskId);
        setTask(filteredTask);

    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }
    const addTask = (title:string) => {
        const newTask = {
            id: v1(),
            title,
            isDane: true,
        }
        const newTasks = [newTask, ...task];
        setTask(newTasks);
    }


    return (
        <div className="App">

            <Todolist title='What to learn' task={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask}/>

        </div>
    );
}

export default App;
