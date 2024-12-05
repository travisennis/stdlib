# @travisennis/stdlib

A modern TypeScript standard library providing robust functional programming primitives and error handling patterns. Built with type safety and composability in mind.

## Features

- **Option<T>** - Safe handling of nullable values
- **Result<T, E>** - Type-safe error handling
- **Try<T>** - Exception handling wrapper
- **Either<L, R>** - Disjoint union type representation
- **Utility Functions** - Helper functions for working with collections of monadic types
- **Type Guards** - Built-in type guards for all data types
- **Full TypeScript Support** - Written in TypeScript with complete type definitions
- **Zero Dependencies** - Pure TypeScript implementation with no runtime dependencies

## Installation

```bash
npm install @travisennis/stdlib
```

## Usage

### Option<T>

Handle nullable values safely:

```typescript
import { Option } from '@travisennis/stdlib';

// Create Options
const some = Option.some(5);
const none = Option.none<number>();

// Handle nullable values
const value = Option.from(possiblyNullValue);

// Transform values
const doubled = some
  .map(x => x * 2)
  .unwrapOr(0); // Provides default if none

// Pattern matching
const result = some.match({
  some: value => `Got ${value}`,
  none: () => "Got nothing"
});
```

### Result<T, E>

Handle errors in a functional way:

```typescript
import { Result } from '@travisennis/stdlib';

function divide(a: number, b: number): Result<number, string> {
  return b === 0
    ? Result.err("Division by zero")
    : Result.ok(a / b);
}

const result = divide(10, 2)
  .map(x => x * 2)
  .mapErr(err => `Error: ${err}`);

// Pattern matching
const message = result.match({
  ok: value => `Result: ${value}`,
  err: error => error
});
```

### Try<T>

Wrap exception-throwing code:

```typescript
import { syncTry, asyncTry } from '@travisennis/stdlib';

// Synchronous operations
const result = syncTry(() => {
  // potentially throwing code
  return JSON.parse(someJson);
});

// Async operations
const asyncResult = await asyncTry(
  fetch('https://api.example.com/data')
);
```

### Either<L, R>

Handle binary outcomes:

```typescript
import { Either, isLeft, isRight } from '@travisennis/stdlib';

// Creating Eithers
const right = Either.right<string, number>(5);
const left = Either.left<string, number>("left value");

// Transformations
const doubled = right
  .map(x => x * 2)            // Transform right value
  .mapLeft(x => x.length);    // Transform left value

// Pattern matching
const result = right.match({
  right: value => `Right: ${value}`,
  left: value => `Left: ${value}`
});

// Type guards
if (isRight(right)) {
  // TypeScript knows this is a Right value
  console.log(right.value);
}
```

### Utility Functions

Work with collections of monadic types:

```typescript
import { utilities } from '@travisennis/stdlib';

// Convert array of Options to Option of array
const results = utilities.sequence.option([
  Option.some(1),
  Option.some(2),
  Option.some(3)
]); // Option<number[]>

// Map and sequence in one operation
const mapped = utilities.traverse.result([1, 2, 3], 
  x => Result.ok(x * 2)
); // Result<number[], E>
```

## Configuration

No configuration is required. The library works out of the box with TypeScript projects.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This library implements functional programming patterns inspired by Rust's standard library and functional programming concepts from languages like Haskell and Scala. The implementation focuses on providing these patterns in a TypeScript-friendly way while maintaining type safety and ease of use.
