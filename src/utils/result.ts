export type Success<T> = { success: true; _tag: "Success"; data: T };
export type Failure<E> = { success: false; _tag: "Failure"; error: E };
export type Result<T, E> = Success<T> | Failure<E>;
export const Result = Object.freeze({
  Success: <T, E>(data: T): Result<T, E> => ({ success: true, _tag: "Success", data }),
  Failure: <T, E>(error: E): Result<T, E> => ({ success: false, _tag: "Failure", error }),
});
