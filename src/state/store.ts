
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;
