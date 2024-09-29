export type TestActionType<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">;
