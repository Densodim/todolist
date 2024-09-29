import { AppRootStateType } from "app/store";
import { TodolistDomainType } from "features/TodolistsList/model/todolists-reducer";
import { TasksStateType } from "features/TodolistsList/model/tasks-reducer";

export const todolistsSelector = (state: AppRootStateType): Array<TodolistDomainType> => state.todolists;
export const tasksSelector = (state: AppRootStateType): TasksStateType => state.tasks;
