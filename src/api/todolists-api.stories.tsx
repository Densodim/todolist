import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./todolist-api";

export default {
    title: 'API',

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists().then((res) => {
            setState(res.data);
        })
    }, [])
    return <div>{state ? JSON.stringify(state) : 'Loading...'}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('');
    const handleCreateNewTodolist = () => {
        todolistAPI.createTodolist(title).then((res) => {
            setState(res.data);
        })
    }
    return <div>
        <div>
            <input placeholder={'Title new Todolist'} value={title}
                   onChange={(event) => setTitle(event.currentTarget.value)}/>
            <button onClick={handleCreateNewTodolist}>Create new Todolist</button>
        </div>
        {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('');
    useEffect(() => {

    }, [])
    const handleDeleteNewTodolist = () => {
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data);
        })
    }
    return <div>
        <div>
            <input placeholder={'ID totolist'} value={todolistId}
                   onChange={(event) => setTodolistId(event.currentTarget.value)}/>
            <button onClick={handleDeleteNewTodolist}>Delete Todolist</button>
        </div>
        {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('');
    const [todolistId, setTodolistId] = useState<any>('');

    const handleUpdateNewTodolist = () => {
        todolistAPI.updateTodolistTitle(todolistId, title).then((res) => {
            setState(res.data);
        })
    }

    return <div>
        <div>
            <input placeholder={'ID totolist'} value={todolistId}
                   onChange={(event) => setTodolistId(event.currentTarget.value)}/>
            <input placeholder={'Title new Todolist'} value={title}
                   onChange={(event) => setTitle(event.currentTarget.value)}/>
            <button onClick={handleUpdateNewTodolist}>Update Todolist</button>
        </div>
        {state ? JSON.stringify(state) : 'Loading...'}</div>
}