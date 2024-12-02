// Define the Result type
export type Result<T, E> =
  | { kind: "success"; value: T }
  | { kind: "error"; error: E };

// Helper function to create a success Result
export function Ok<T, E>(value: T): Result<T, E> {
  return { kind: "success", value };
}

// Helper function to create an error Result
export function Err<T, E>(error: E): Result<T, E> {
  return { kind: "error", error };
}

// Type guard for Ok
export function isOk<T, E>(
  result: Result<T, E>,
): result is { kind: "success"; value: T } {
  return result.kind === "success";
}

// Type guard for Err
export function isErr<T, E>(
  result: Result<T, E>,
): result is { kind: "error"; error: E } {
  return result.kind === "error";
}

export function unwrap<T, E>(result: Result<T, E>): T {
  if (isErr(result)) {
    throw result.error;
  }
  return result.value;
}
