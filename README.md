# @travisennis/stdlib

A TypeScript standard library providing robust error handling and functional programming primitives. This library includes implementations of `Option`, `Result`, `Either`, and `Try` types commonly found in functional programming languages.

## Installation

```bash
npm install @travisennis/stdlib
```

## Features

- **Option<T>** - Safe handling of nullable values
- **Result<T, E>** - Error handling without exceptions
- **Either<L, R>** - Disjoint union type for handling two possible types
- **Try<T>** - Exception handling wrapper with functional interfaces

## Usage Examples

### Option

```typescript
import { Option } from '@travisennis/stdlib';

// Creating Options
const someValue = Option.some(42);
const noValue = Option.none<number>();

// Using map and flatMap
const doubled = someValue
  .map(x => x * 2)
  .unwrapOr(0); // 84

// Pattern matching
const result = someValue.match({
  some: value => `Got ${value}`,
  none: () => "Got nothing"
});
```

### Result

```typescript
import { Ok, Err, Result } from '@travisennis/stdlib';

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Err("Division by zero");
  }
  return Ok(a / b);
}

const result = divide(10, 2);
if (isOk(result)) {
  console.log(result.value); // 5
}
```

### Either

```typescript
import { Either, left, right } from '@travisennis/stdlib';

function divide(a: number, b: number): Either<string, number> {
  if (b === 0) {
    return left("Division by zero");
  }
  return right(a / b);
}

const result = divide(10, 2);
result.fold(
  error => console.log(`Error: ${error}`),
  value => console.log(`Result: ${value}`)
);
```

### Try

```typescript
import { Try, syncTry, asyncTry } from '@travisennis/stdlib';

// Synchronous error handling
const result = syncTry(() => {
  // potentially throwing operation
  return JSON.parse('{"valid": "json"}');
});

// Async error handling
const asyncResult = await asyncTry(
  fetch('https://api.example.com/data')
);

// Using map and recovery
const processed = result
  .map(data => data.valid)
  .recover(err => "default value");
```

## API Reference

### Option<T>

- `Option.some<T>(value: T)` - Creates a Some instance containing a value
- `Option.none<T>()` - Creates a None instance
- `map<U>(fn: (value: T) => U)` - Transforms the contained value
- `flatMap<U>(fn: (value: T) => Option<U>)` - Chains Option operations
- `filter(predicate: (value: T) => boolean)` - Filters Option based on predicate
- `unwrap()` - Gets the value or throws if None
- `unwrapOr(defaultValue: T)` - Gets the value or returns default

### Result<T, E>

- `Ok<T, E>(value: T)` - Creates a success Result
- `Err<T, E>(error: E)` - Creates an error Result
- `isOk(result)` - Type guard for success
- `isErr(result)` - Type guard for error
- `unwrap()` - Gets the value or throws the error

### Either<L, R>

- `left<L, R>(value: L)` - Creates a Left instance
- `right<L, R>(value: R)` - Creates a Right instance
- `map<T>(fn: (r: R) => T)` - Maps the right value
- `mapLeft<T>(fn: (l: L) => T)` - Maps the left value
- `fold<T>(leftFn, rightFn)` - Pattern matches on Either
- `isLeft()` - Type guard for Left
- `isRight()` - Type guard for Right

### Try<T>

- `Try.success<T>(value: T)` - Creates a successful Try
- `Try.failure<T>(error: Error)` - Creates a failed Try
- `syncTry<T>(f: () => T)` - Wraps synchronous operations
- `asyncTry<T>(promise: Promise<T>)` - Wraps asynchronous operations
- `map<U>(f: (value: T) => U)` - Transforms the success value
- `flatMap<U>(f: (value: T) => Try<U>)` - Chains Try operations
- `recover(f: (error: Error) => T)` - Recovers from failures

## License

MIT © Travis Ennis
