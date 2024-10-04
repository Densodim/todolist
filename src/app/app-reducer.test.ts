import { appAction, appReducer, InitialStateType, RequestStatus } from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: RequestStatus.IDLE,
    isInitialized: false,
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(startState, appAction.setAppError({ error: "some error" }));
  expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
  const endState = appReducer(startState, appAction.setAppStatus({ status: RequestStatus.LOADING }));
  expect(endState.status).toBe("loading");
});
