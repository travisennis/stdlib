/**
 * Returns a memoized version of the provided function.
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const result = cache.get(key);
      if (result) {
        return result;
      }
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Composes multiple functions into a single function, executing from right to left.
 */
export function compose<R>(...fns: Array<(a: any) => any>): (arg: any) => R {
  return (arg: any): R => {
    return fns.reduceRight((prev, curr) => curr(prev), arg);
  };
}

/**
 * Creates a curried version of the provided function.
 */
export function curry<T extends (...args: any[]) => any>(
  fn: T,
): (...args: any[]) => any {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs: any[]) => curried(...args, ...moreArgs);
  };
}

/**
 * Pipes data through a series of functions from left to right.
 */
export function pipe<T, R>(...fns: Array<(a: any) => any>): (arg: T) => R {
  return (arg: T): R => {
    return fns.reduce((prev, curr) => curr(prev), arg as any);
  };
}

/**
 * Returns a function that executes only once.
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last invocation.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Applies provided arguments partially to a function, returning a new function
 * that takes the remaining arguments.
 */
export function partial<T extends (...args: any[]) => any>(
  fn: T,
  ...presetArgs: Partial<Parameters<T>>
): (...args: any[]) => ReturnType<T> {
  return (...restArgs: any[]): ReturnType<T> => {
    const args = [...presetArgs, ...restArgs];
    return fn(...args);
  };
}
