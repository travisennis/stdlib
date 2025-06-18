import { Option } from "./option.ts";

export abstract class Try<T> {
  abstract readonly isSuccess: boolean;
  abstract readonly isFailure: boolean;

  static success<T>(value: T): Try<T> {
    return new Success(value);
  }

  static failure<T>(error: Error): Try<T> {
    return new Failure(error);
  }

  abstract map<U>(fn: (value: T) => U): Try<U>;
  abstract flatMap<U>(fn: (value: T) => Try<U>): Try<U>;
  abstract recover(fn: (error: Error) => T): Try<T>;
  abstract match<U>(pattern: {
    success: (value: T) => U;
    failure: (error: Error) => U;
  }): U;
  abstract unwrap(): T;
  abstract unwrapOr(defaultValue: T): T;
  abstract ok(): Option<T>;
}

export class Success<T> extends Try<T> {
  readonly isSuccess: boolean = true;
  readonly isFailure: boolean = false;
  readonly value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }

  map<U>(fn: (value: T) => U): Try<U> {
    try {
      return Try.success(fn(this.value));
    } catch (e) {
      return Try.failure(e instanceof Error ? e : new Error(String(e)));
    }
  }

  flatMap<U>(fn: (value: T) => Try<U>): Try<U> {
    try {
      return fn(this.value);
    } catch (e) {
      return Try.failure(e instanceof Error ? e : new Error(String(e)));
    }
  }

  recover(_fn: (error: Error) => T): Try<T> {
    return this;
  }

  match<U>(pattern: {
    success: (value: T) => U;
    failure: (error: Error) => U;
  }): U {
    return pattern.success(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  ok(): Option<T> {
    return Option.some(this.value);
  }

  // biome-ignore lint/style/useNamingConvention: third-party controlled
  toJSON(): { type: "Try.success"; value: T } {
    return { type: "Try.success", value: this.value };
  }

  override toString(): string {
    return `Try.success(${String(this.value)})`;
  }
}

export class Failure<T> extends Try<T> {
  readonly isSuccess: boolean = false;
  readonly isFailure: boolean = true;
  readonly error: Error;

  constructor(error: Error) {
    super();
    this.error = error;
  }

  map<U>(_fn: (value: T) => U): Try<U> {
    return Try.failure(this.error);
  }

  flatMap<U>(_fn: (value: T) => Try<U>): Try<U> {
    return Try.failure(this.error);
  }

  recover(fn: (error: Error) => T): Try<T> {
    try {
      return Try.success(fn(this.error));
    } catch (e) {
      return Try.failure(e instanceof Error ? e : new Error(String(e)));
    }
  }

  match<U>(pattern: {
    success: (value: T) => U;
    failure: (error: Error) => U;
  }): U {
    return pattern.failure(this.error);
  }

  unwrap(): never {
    throw this.error;
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  ok(): Option<T> {
    return Option.none();
  }

  // biome-ignore lint/style/useNamingConvention: third-party controlled
  toJSON(): { type: "Try.failure"; value: Error } {
    return { type: "Try.failure", value: this.error };
  }

  override toString(): string {
    return `Try.failure(${String(this.error)})`;
  }
}

// Type guards
export function isSuccess<T>(tryValue: Try<T>): tryValue is Success<T> {
  return tryValue.isSuccess;
}

export function isFailure<T>(tryValue: Try<T>): tryValue is Failure<T> {
  return tryValue.isFailure;
}

export function syncTry<T>(f: () => T): Try<T> {
  try {
    return Try.success(f());
  } catch (e) {
    return Try.failure(e instanceof Error ? e : new Error(String(e)));
  }
}

export async function asyncTry<T>(promise: Promise<T>): Promise<Try<T>> {
  try {
    const result = await promise;
    return Try.success(result);
  } catch (e) {
    return Try.failure(e instanceof Error ? e : new Error(String(e)));
  }
}
