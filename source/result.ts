import { Option } from "./option.ts";

export abstract class Result<T, E> {
  abstract readonly isOk: boolean;
  abstract readonly isErr: boolean;

  static ok<T, E>(value: T): Result<T, E> {
    return new Ok(value);
  }

  static err<T, E>(error: E): Result<T, E> {
    return new Err(error);
  }

  abstract map<U>(fn: (value: T) => U): Result<U, E>;
  abstract mapErr<F>(fn: (error: E) => F): Result<T, F>;
  abstract unwrap(): T;
  abstract unwrapOr(defaultValue: T): T;
  abstract match<U>(pattern: { ok: (value: T) => U; err: (error: E) => U }): U;
}

export class Ok<T, E> extends Result<T, E> {
  readonly isOk: boolean = true;
  readonly isErr: boolean = false;
  readonly value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return Result.ok(fn(this.value));
  }

  mapErr<F>(_fn: (error: E) => F): Result<T, F> {
    return Result.ok(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  match<U>(pattern: { ok: (value: T) => U; err: (error: E) => U }): U {
    return pattern.ok(this.value);
  }

  ok(): Option<T> {
    return Option.some(this.value);
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toJSON(): { type: "Ok"; value: T } {
    return { type: "Ok", value: this.value };
  }

  override toString(): string {
    return `Ok(${String(this.value)})`;
  }
}

export class Err<T, E> extends Result<T, E> {
  readonly isOk: boolean = false;
  readonly isErr: boolean = true;
  readonly error: E;

  constructor(error: E) {
    super();
    this.error = error;
  }

  map<U>(_fn: (value: T) => U): Result<U, E> {
    return Result.err(this.error);
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    return Result.err(fn(this.error));
  }

  unwrap(): never {
    throw this.error;
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  match<U>(pattern: { ok: (value: T) => U; err: (error: E) => U }): U {
    return pattern.err(this.error);
  }

  ok(): Option<T> {
    return Option.none();
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toJSON(): { type: "Err"; value: E } {
    return { type: "Err", value: this.error };
  }

  override toString(): string {
    return `Err(${String(this.error)})`;
  }
}

// Type guard for Ok
export function isOk<T, E>(result: Result<T, E>): result is Ok<T, E> {
  return result.isOk;
}

// Type guard for Err
export function isErr<T, E>(result: Result<T, E>): result is Err<T, E> {
  return result.isErr;
}
