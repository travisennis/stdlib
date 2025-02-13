import { Either } from "./either.ts";
import { Result } from "./result.ts";
import { Try } from "./try.ts";

export abstract class Option<T> {
  abstract readonly isSome: boolean;
  abstract readonly isNone: boolean;

  static some<T>(value: T): Option<T> {
    return new Some(value);
  }

  static none<T>(): Option<T> {
    return None.instance;
  }

  static from<T>(value: T | null | undefined): Option<T> {
    return value != null ? Option.some(value) : Option.none();
  }

  abstract map<U>(fn: (value: T) => U): Option<U>;
  abstract flatMap<U>(fn: (value: T) => Option<U>): Option<U>;
  abstract filter(predicate: (value: T) => boolean): Option<T>;
  abstract match<U>(pattern: { some: (value: T) => U; none: () => U }): U;
  abstract unwrap(): T;
  abstract unwrapOr(defaultValue: T): T;
  abstract unwrapOrElse(fn: () => T): T;

  // Conversion methods
  abstract toResult<E>(error: E): Result<T, E>;
  abstract toTry(error?: Error): Try<T>;
  abstract toEither<L>(left: L): Either<L, T>;
}

export class Some<T> extends Option<T> {
  readonly isSome: boolean = true;
  readonly isNone: boolean = false;
  readonly value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }

  map<U>(fn: (value: T) => U): Option<U> {
    return Option.some(fn(this.value));
  }

  flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    return predicate(this.value) ? this : Option.none();
  }

  match<U>(pattern: { some: (value: T) => U; none: () => U }): U {
    return pattern.some(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  unwrapOrElse(_fn: () => T): T {
    return this.value;
  }

  toResult<E>(_error: E): Result<T, E> {
    return Result.ok(this.value);
  }

  toTry(_error?: Error): Try<T> {
    return Try.success(this.value);
  }

  toEither<L>(_left: L): Either<L, T> {
    return Either.right(this.value);
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toJSON(): { type: "Some"; value: T } {
    return { type: "Some", value: this.value };
  }

  override toString(): string {
    return `Some(${String(this.value)})`;
  }
}

export class None<T> extends Option<T> {
  readonly isSome: boolean = false;
  readonly isNone: boolean = true;

  private constructor() {
    super();
  }

  static readonly instance = new None<never>();

  map<U>(_fn: (value: T) => U): Option<U> {
    return Option.none();
  }

  flatMap<U>(_fn: (value: T) => Option<U>): Option<U> {
    return Option.none();
  }

  filter(_predicate: (value: T) => boolean): Option<T> {
    return Option.none();
  }

  match<U>(pattern: { some: (value: T) => U; none: () => U }): U {
    return pattern.none();
  }

  unwrap(): never {
    throw new Error("Cannot unwrap None value");
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  unwrapOrElse(fn: () => T): T {
    return fn();
  }

  toResult<E>(error: E): Result<T, E> {
    return Result.err(error);
  }

  toTry(error: Error = new Error("None value")): Try<T> {
    return Try.failure(error);
  }

  toEither<L>(left: L): Either<L, T> {
    return Either.left(left);
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toJSON(): { type: "None"; value?: T } {
    return { type: "None" };
  }

  override toString(): string {
    return "None()";
  }
}

// Type guards
export function isSome<T>(option: Option<T>): option is Some<T> {
  return option.isSome;
}

export function isNone<T>(option: Option<T>): option is None<T> {
  return option.isNone;
}
