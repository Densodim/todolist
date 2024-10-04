import { tasksReducer } from "features/TodolistsList/model/tasks-reducer";
import { todolistsReducer } from "features/TodolistsList/model/todolists-reducer";
import { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/auth/model/auth-reducer";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";


// ❗старая запись, с новыми версиями не работает
//  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// ❗ UnknownAction вместо AnyAction
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
