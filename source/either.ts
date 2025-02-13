export abstract class Either<L, R> {
  abstract readonly isLeft: boolean;
  abstract readonly isRight: boolean;

  static left<L, R = never>(value: L): Either<L, R> {
    return new Left(value);
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Right(value);
  }

  abstract map<T>(fn: (r: R) => T): Either<L, T>;
  abstract mapLeft<T>(fn: (l: L) => T): Either<T, R>;
  abstract match<T>(pattern: {
    left: (value: L) => T;
    right: (value: R) => T;
  }): T;
  abstract unwrap(): R;
  abstract unwrapLeft(): L;
  abstract unwrapOr(defaultValue: R): R;
}

export class Left<L, R> extends Either<L, R> {
  readonly isLeft: boolean = true;
  readonly isRight: boolean = false;
  readonly value: L;

  constructor(value: L) {
    super();
    this.value = value;
  }

  map<T>(_fn: (r: R) => T): Either<L, T> {
    return Either.left(this.value);
  }

  mapLeft<T>(fn: (l: L) => T): Either<T, R> {
    return Either.left(fn(this.value));
  }

  match<T>(pattern: { left: (value: L) => T; right: (value: R) => T }): T {
    return pattern.left(this.value);
  }

  unwrap(): never {
    throw new Error("Cannot unwrap Right value from Left");
  }

  unwrapLeft(): L {
    return this.value;
  }

  unwrapOr(defaultValue: R): R {
    return defaultValue;
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toJSON(): { type: "Left"; value: L } {
    return { type: "Left", value: this.value };
  }

  override toString(): string {
    return `Left(${String(this.value)})`;
  }
}

export class Right<L, R> extends Either<L, R> {
  readonly isLeft: boolean = false;
  readonly isRight: boolean = true;
  readonly value: R;

  constructor(value: R) {
    super();
    this.value = value;
  }

  map<T>(fn: (r: R) => T): Either<L, T> {
    return Either.right(fn(this.value));
  }

  mapLeft<T>(_fn: (l: L) => T): Either<T, R> {
    return Either.right(this.value);
  }

  match<T>(pattern: { left: (value: L) => T; right: (value: R) => T }): T {
    return pattern.right(this.value);
  }

  unwrap(): R {
    return this.value;
  }

  unwrapLeft(): never {
    throw new Error("Cannot unwrap Left value from Right");
  }

  unwrapOr(_defaultValue: R): R {
    return this.value;
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toJSON(): { type: "Right"; value: R } {
    return { type: "Right", value: this.value };
  }

  override toString(): string {
    return `Right(${String(this.value)})`;
  }
}

// Type guards
export function isLeft<L, R>(either: Either<L, R>): either is Left<L, R> {
  return either.isLeft;
}

export function isRight<L, R>(either: Either<L, R>): either is Right<L, R> {
  return either.isRight;
}

// Helper functions to create Either values
export const left = <L, R = never>(l: L): Either<L, R> => new Left(l);
export const right = <R, L = never>(r: R): Either<L, R> => new Right(r);
