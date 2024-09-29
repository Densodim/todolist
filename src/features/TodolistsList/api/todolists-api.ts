import { UpdateDomainTaskModelType } from "features/TodolistsList/model/tasks-reducer";
import { instance } from "app/instance/instance";
import { BaseResponseType } from "common/types/base-response-type";
import { TaskStatuses } from "features/TodolistsList/lib/emun/task-statuses";
import { TaskPriorities } from "features/TodolistsList/lib/emun/task-priorities";

// api
export const todolistsAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>("todo-lists");
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<BaseResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
    return promise;
  },
  deleteTodolist(id: string) {
    const promise = instance.delete<BaseResponseType>(`todo-lists/${id}`);
    return promise;
  },
  updateTodolist(id: string, title: string) {
    const promise = instance.put<BaseResponseType>(`todo-lists/${id}`, { title: title });
    return promise;
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(args: AddTasksArgsType) {
    const { todolistId, title } = args;
    return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};

export type UpdateTasksArgsType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};

export type AddTasksArgsType = {
  title: string;
  todolistId: string;
};

// types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
