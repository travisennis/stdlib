# @travisennis/stdlib

A modern TypeScript standard library providing robust functional programming primitives and error handling patterns. Built with type safety and composability in mind.

## Features

- **Option<T>** - Safe handling of nullable values
- **Result<T, E>** - Type-safe error handling
- **Try<T>** - Exception handling wrapper
- **Either<L, R>** - Disjoint union type representation
- **Random** - Seeded random number generation
- **Env Paths** - Platform-specific environment paths
- **DESM** - ESM directory and file path utilities
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
import { Option } from '@travisennis/stdlib/option';

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
import { Result } from '@travisennis/stdlib/result';

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
import { syncTry, asyncTry } from '@travisennis/stdlib/try';

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
import { Either, isLeft, isRight } from '@travisennis/stdlib/either';

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

### Random

Generate random numbers with optional seeding:

```typescript
import { random } from '@travisennis/stdlib/random';

// Use with default seed (Math.random)
const rng = random();
const randomInt = rng.int(1, 10);    // Random integer between 1 and 10
const randomFloat = rng.float(0, 1);  // Random float between 0 and 1

// Use with custom seed for reproducible sequences
const seededRng = random(12345);
const seededInt = seededRng.int(1, 10);
```

### Env Paths

Get platform-specific paths for your application:

```typescript
import envPaths from '@travisennis/stdlib/env';

const paths = envPaths('myapp');

// Access various platform-specific paths
console.log(paths.data);    // Data directory
console.log(paths.config);  // Config directory
console.log(paths.cache);   // Cache directory
console.log(paths.logs);    // Logs directory
console.log(paths.temp);    // Temp directory
console.log(paths.state);   // State directory
```

### DESM

ESM-friendly path utilities for working with file and directory paths:

```typescript
import { dirname, filename, join } from '@travisennis/stdlib/desm';

// Get directory name from import.meta.url
const dir = dirname(import.meta.url);

// Get file name from URL
const file = filename(import.meta.url);

// Join paths relative to current module
const path = join(import.meta.url, '../assets', 'config.json');
```

### Utility Functions

Work with collections of monadic types:

```typescript
import { utilities } from '@travisennis/stdlib/utilities';

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

The code in @travisennis/stdlib/desm was inspired by [https://github.com/mcollina/desm](https://github.com/mcollina/desm)
