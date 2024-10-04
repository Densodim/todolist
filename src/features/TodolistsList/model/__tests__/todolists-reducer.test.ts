import {
  FilterValuesType,
  TodolistDomainType,
  todolistsAction,
  todolistsReducer
} from "features/TodolistsList/model/todolists-reducer";
import { v1 } from "uuid";
import { TodolistType } from "features/TodolistsList/api/todolists-api";
import { RequestStatus } from "app/app-reducer";
import { TestActionType } from "../../../../common/types/TestActionType";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      entityStatus: RequestStatus.IDLE,
      addedDate: "",
      order: 0
    },
    { id: todolistId2, title: "What to buy", filter: "all", entityStatus: RequestStatus.IDLE, addedDate: "", order: 0 }
  ];
});

test("correct todolist should be removed", () => {

  const action: TestActionType<typeof todolistsAction.removeTodolist.fulfilled> = {
    type: todolistsAction.removeTodolist.fulfilled.type,
    payload: {
      id: todolistId1
    }
  };
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolist: TodolistType = {
    title: "New Todolist",
    id: "any id",
    addedDate: "",
    order: 0
  };
  const action: TestActionType<typeof todolistsAction.addTodolist.fulfilled> = {
    type: todolistsAction.addTodolist.fulfilled.type,
    payload: {
      todolist
    }
  };

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolist.title);
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  const newTodolistTitle = "New Todolist";
  const todolistId2 = "todolistId2";

  const startState: TodolistDomainType[] = [
    { id: "todolistId1", title: "What to learn", addedDate: "", order: 0, filter: "all", entityStatus: RequestStatus.IDLE },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "all", entityStatus: RequestStatus.IDLE },
  ];

  const action:TestActionType<typeof todolistsAction.changeTodolistTitle.fulfilled> = {
    type: todolistsAction.changeTodolistTitle.fulfilled.type,
    payload: {
      id: todolistId2, title: newTodolistTitle
    }
  }
  // const action = todolistsAction.changeTodolistTitle.fulfilled(
  //   { id: todolistId2, title: newTodolistTitle }, // payload
  //   "requestId", // requestId (можно любое значение)
  //   { id: todolistId2, title: newTodolistTitle } // параметры, с которыми был вызван thunk
  // );

  const endState = todolistsReducer(startState, action);

  // Проверяем, что первый тудулист остался с тем же названием
  expect(endState[0].title).toBe("What to learn");
  // Проверяем, что название второго тудулиста изменилось на новое
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const action = todolistsAction.changeTodolistFilter({ id: todolistId2, filter: newFilter });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
test("todolists should be added", () => {

  const action = todolistsAction.fetchTodolists.fulfilled({ todolists: startState }, "fdsfsdf", undefined);

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});
test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatus = RequestStatus.LOADING;

  const action = todolistsAction.changeTodolistEntityStatus({ id: todolistId2, status: newStatus });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});
