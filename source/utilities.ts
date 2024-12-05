import { isNone, Option } from "./option.ts";
import { isErr, Result } from "./result.ts";
import { isFailure, Try } from "./try.ts";

// Utility functions for working with arrays of Options/Results/etc
export const utilities = {
  // Sequence operations (convert array of monads to monad of array)
  sequence: {
    option<T>(arr: Option<T>[]): Option<T[]> {
      const results: T[] = [];
      for (const opt of arr) {
        if (isNone(opt)) return Option.none();
        results.push(opt.unwrap());
      }
      return Option.some(results);
    },

    result<T, E>(arr: Result<T, E>[]): Result<T[], E> {
      const results: T[] = [];
      for (const res of arr) {
        if (isErr(res)) return Result.err(res.error);
        results.push(res.unwrap());
      }
      return Result.ok(results);
    },

    try<T>(arr: Try<T>[]): Try<T[]> {
      const results: T[] = [];
      for (const t of arr) {
        if (isFailure(t)) return t as Try<T[]>;
        results.push(t.unwrap());
      }
      return Try.success(results);
    },
  },

  // Traverse operations (map + sequence combined)
  traverse: {
    option<T, U>(arr: T[], fn: (item: T) => Option<U>): Option<U[]> {
      return utilities.sequence.option(arr.map(fn));
    },

    result<T, U, E>(arr: T[], fn: (item: T) => Result<U, E>): Result<U[], E> {
      return utilities.sequence.result(arr.map(fn));
    },

    try<T, U>(arr: T[], fn: (item: T) => Try<U>): Try<U[]> {
      return utilities.sequence.try(arr.map(fn));
    },
  },
};
