import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./component/Todolist";
import {v1} from 'uuid'
import {AddItemForm} from "./component/AddItemForm";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let todolistInitialState: TodolistType[] = [
        {
            id: todolistID1,
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: todolistID2,
            title: 'What to buy',
            filter: 'all',
        }
    ]

    let [todolist, setTodolist] = useState<TodolistType[]>(todolistInitialState);

    // global state

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDane: true},
            {id: v1(), title: 'JS', isDane: true},
            {id: v1(), title: 'ReactJS', isDane: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDane: true},
            {id: v1(), title: 'GraphQL', isDane: false},
        ]
    });

    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]; // 1. Найдем таски для тудулиста, в котором будет происходить удаление
        const filteredTask = todolistTasks.filter(task => task.id !== taskId);  // 2. Удалим таску по которой кликнули
        tasks[todolistId] = filteredTask; // 3. Перезапишем массив тасок на новый (отфильтрованный) массив
        setTasks({...tasks, filteredTask});


    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolist = todolist.map(t1 => {
            return t1.id === todolistId ? {...t1, filter} : t1
        })
        setTodolist(newTodolist)

        // setTodolist(todolist.map(t1 => (t1.id === todolistId ? {...t1, filter}: t1))) // второй вариант более короткий
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = { // 1. Создадим новую таску
            id: v1(),
            title,
            isDane: false,
        }
        const todolistTask = tasks[todolistId]; // 2. Найдем массив тасок для тудулиста, в который будем добавлять новую таску
        tasks[todolistId] = [newTask, ...todolistTask] // 3. Перезапишем массив тасок на новый массив, добавив в начало новую таску
        setTasks({...tasks}); // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId];  // 1. Найдем таски для тудулиста, в котором будет происходить изменение
        const newState = todolistTasks.map(t => (t.id === taskId ? {...t, isDane: taskStatus} : t));  // 2. Пробежимся по таскам и изменим статус таски по которой нажали
        tasks[todolistId] = newState; // 3. Перезапишем массив тасок на новый массив, с уже измененным статусом у таски
        setTasks({...tasks}); // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
    }
    const removeTodolist = (todolistId: string) => {
        const newTodolist = todolist.filter(t1 => t1.id !== todolistId)
        setTodolist(newTodolist);
        delete tasks[todolistId];
    }

    const addTodoList = (title: string) => {
        const todoListId = v1();
        const newTodoList: TodolistType = {id: todoListId, title: title, filter: 'all'}
        setTodolist([...todolist, newTodoList]);
        setTasks({...tasks, [todoListId]: []})
    }
    const updateTask = (newTitle: string, taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }
    const updateTodolist = (title:string, todolistId:string)=>{
        setTodolist(todolist.map(el=>el.id === todolistId ? {...el, title}:el))
    }


    return (
        <div className="App">
            <div>
                <AddItemForm addItem={addTodoList}/>
            </div>
            <div>
                {todolist.map(t1 => {
                    const allTodoListTasks = tasks[t1.id]
                    let taskForTodolist = allTodoListTasks;

                    switch (t1.filter) {
                        case 'active':
                            taskForTodolist = taskForTodolist.filter(task => !task.isDane);
                            break;
                        case 'completed':
                            taskForTodolist = taskForTodolist.filter(task => task.isDane);
                            break;
                    }
                    return (
                        <Todolist
                            key={t1.id}
                            title={t1.title}
                            task={taskForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            todolistId={t1.id}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={t1.filter}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                            updateTodolist={updateTodolist}
                        />

                    )
                })}
            </div>
        </div>
    );
}

export default App;
