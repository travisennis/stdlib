export abstract class Option<T> {
  abstract readonly isSome: boolean;
  abstract readonly isNone: boolean;

  static some<T>(value: T): Option<T> {
    return new Some(value);
  }

  static none<T>(): Option<T> {
    return None.instance;
  }

  abstract map<U>(fn: (value: T) => U): Option<U>;
  abstract flatMap<U>(fn: (value: T) => Option<U>): Option<U>;
  abstract filter(predicate: (value: T) => boolean): Option<T>;
  abstract or(alternative: Option<T>): Option<T>;
  abstract unwrapOr(defaultValue: T): T;
  abstract unwrap(): T;
  abstract match<U>(pattern: { some: (value: T) => U; none: () => U }): U;
}

export class Some<T> extends Option<T> {
  readonly isSome: boolean = true;
  readonly isNone: boolean = false;

  constructor(readonly value: T) {
    super();
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

  or(_alternative: Option<T>): Option<T> {
    return this;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  unwrap(): T {
    return this.value;
  }

  match<U>(pattern: { some: (value: T) => U; none: () => U }): U {
    return pattern.some(this.value);
  }
}

export class None<T> extends Option<T> {
  readonly isSome: boolean = false;
  readonly isNone: boolean = true;

  private constructor() {
    super();
  }

  static instance = new None<never>();

  map<U>(_fn: (value: T) => U): Option<U> {
    return Option.none();
  }

  flatMap<U>(_fn: (value: T) => Option<U>): Option<U> {
    return Option.none();
  }

  filter(_predicate: (value: T) => boolean): Option<T> {
    return Option.none();
  }

  or(alternative: Option<T>): Option<T> {
    return alternative;
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  unwrap(): never {
    throw new Error("Called unwrap on a None value");
  }

  match<U>(pattern: { some: (value: T) => U; none: () => U }): U {
    return pattern.none();
  }
}

// Type guards for checking the type
export function isSome<T>(option: Option<T>): option is Some<T> {
  return option.isSome;
}

export function isNone<T>(option: Option<T>): option is None<T> {
  return option.isNone;
}
