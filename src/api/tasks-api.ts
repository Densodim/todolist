import {instance, ResponseType} from "./todolist-api";

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type TasksResponse = {
    error: string | null
    totalCount: number
    item: TasksType[]
}

type updateTasksModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const TasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TasksType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTasks(todolistId: string, taskId: string, model: updateTasksModelType) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
};