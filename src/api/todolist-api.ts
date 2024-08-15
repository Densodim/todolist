import axios from "axios";

export const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": "069a78c4-b7e6-41b2-8e8a-e17cd72d1c52"
    }
}

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...setting
})

export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// type createTodolistResponsType = {
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TodolistsType
//     }
// }

// type deleteTodolistResponsType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }

// type updateTodolistResponsType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }

export type ResponseType<D> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}

type FieldErrorType = {
    error: string
    field: string
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistsType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistsType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title});
    }
}