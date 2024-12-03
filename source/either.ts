// Define the Either type
export type Either<L, R> = Left<L> | Right<R>;

// Left class represents the left value
export class Left<L> {
  readonly value: L;
  readonly _tag = "Left";

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }

  // Functional methods
  map<T>(_fn: (r: never) => T): Either<L, T> {
    return this as Left<L>;
  }

  mapLeft<T>(fn: (l: L) => T): Either<T, never> {
    return new Left(fn(this.value));
  }

  fold<T>(leftFn: (l: L) => T, _rightFn: (r: never) => T): T {
    return leftFn(this.value);
  }

  unwrapLeft(): L {
    return this.value;
  }

  unwrapRight(): never {
    throw new Error("Cannot unwrap Right value from Left");
  }
}

// Right class represents the right value
export class Right<R> {
  readonly value: R;
  readonly _tag = "Right";

  constructor(value: R) {
    this.value = value;
  }

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }

  // Functional methods
  map<T>(fn: (r: R) => T): Either<never, T> {
    return new Right(fn(this.value));
  }

  mapLeft<T>(_fn: (l: never) => T): Either<T, R> {
    return this as Right<R>;
  }

  fold<T>(_leftFn: (l: never) => T, rightFn: (r: R) => T): T {
    return rightFn(this.value);
  }

  unwrapLeft(): never {
    throw new Error("Cannot unwrap Left value from Right");
  }

  unwrapRight(): R {
    return this.value;
  }
}

// Helper functions to create Either values
export const left = <L, R = never>(l: L): Either<L, R> => new Left(l);
export const right = <R, L = never>(r: R): Either<L, R> => new Right(r);
