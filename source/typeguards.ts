/**
 * Collection of TypeScript type guard utilities for runtime type checking and type narrowing.
 * These utilities help ensure type safety and provide better type inference.
 */

/**
 * Checks if a value is an Error instance
 * @param error - Value to check
 * @example
 * if (isError(result)) {
 *   console.error(result.message);
 * }
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Checks if a value is a string
 * @param value - Value to check
 * @example
 * if (isString(value)) {
 *   console.log(value.toLowerCase());
 * }
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Checks if a value is a number (excluding NaN)
 * @param value - Value to check
 * @example
 * if (isNumber(value)) {
 *   console.log(value.toFixed(2));
 * }
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

/**
 * Checks if a value is a boolean
 * @param value - Value to check
 * @example
 * if (isBoolean(value)) {
 *   console.log(value ? 'True' : 'False');
 * }
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks if a value is an array
 * @param value - Value to check
 * @example
 * if (isArray(value)) {
 *   value.forEach(item => console.log(item));
 * }
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a non-null object (excluding arrays)
 * @param value - Value to check
 * @example
 * if (isObject(value)) {
 *   console.log(Object.keys(value));
 * }
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Checks if a value is null
 * @param value - Value to check
 * @example
 * if (isNull(value)) {
 *   console.log('Value is null');
 * }
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is undefined
 * @param value - Value to check
 * @example
 * if (isUndefined(value)) {
 *   console.log('Value is undefined');
 * }
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined";
}

/**
 * Checks if a value is defined (not undefined)
 * @param value - Value to check
 * @example
 * if (isDefined(value)) {
 *   console.log('Value exists');
 * }
 */
export function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== "undefined";
}

/**
 * Checks if a value is null or undefined
 * @param value - Value to check
 * @example
 * if (isNullOrUndefined(value)) {
 *   console.log('Value is null or undefined');
 * }
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || typeof value === "undefined";
}

/**
 * Checks if a value is a function
 * @param value - Value to check
 * @example
 * if (isFunction(value)) {
 *   value();
 * }
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

/**
 * Checks if a value is a valid Date object
 * @param value - Value to check
 * @example
 * if (isDate(value)) {
 *   console.log(value.toISOString());
 * }
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is a Promise
 * @param value - Value to check
 * @example
 * if (isPromise(value)) {
 *   value.then(result => console.log(result));
 * }
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (isObject(value) &&
      isFunction((value as any).then) &&
      isFunction((value as any).catch))
  );
}
