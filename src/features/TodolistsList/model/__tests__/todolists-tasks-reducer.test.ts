import { TodolistDomainType, todolistsAction, todolistsReducer } from "features/TodolistsList/model/todolists-reducer";
import { tasksReducer, TasksStateType } from "features/TodolistsList/model/tasks-reducer";
import { TodolistType } from "features/TodolistsList/api/todolists-api";
import { TestActionType } from "../../../../common/types/TestActionType";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0
  };
  // const action:TestActionType<typeof todolistsAction.fetchTodolists.fulfilled> = {
  //   type: todolistsAction.fetchTodolists.fulfilled.type,
  //   payload:{
  //     todolist:todolist
  //   }
  // }
  // const action: TestActionType<typeof todolistsAction.fetchTodolists.fulfilled> = {
  //   type: todolistsAction.fetchTodolists.fulfilled.type,
  //   payload: {
  //     todolist
  //   }
  // };
  const action = todolistsAction.fetchTodolists.fulfilled({ todolist }, "fdfdsfdsf", undefined);

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
