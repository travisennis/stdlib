/**
 * Collection of TypeScript type guard utilities for runtime type checking and type narrowing.
 * These utilities help ensure type safety and provide better type inference.
 */

import type { JsonValue } from "./types.ts";

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
 * Check if a value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
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

type PositiveInteger = number & { __brand: "PositiveInteger" };

/**
 * Checks if a value is a positive integer
 * @param number - Value to check
 * @example
 * if (isPositiveInteger(value)) {
 *   console.log(`${value} is a positive integer`);
 * }
 */
export function isPositiveInteger(number: unknown): number is PositiveInteger {
  return Number.isInteger(number) && (number as number) > 0;
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
export function isArray<T>(
  value: unknown,
  itemValidator?: (item: unknown) => item is T,
): value is T[] {
  if (!Array.isArray(value)) {
    return false;
  }

  if (itemValidator) {
    return value.every((item) => itemValidator(item));
  }

  return true;
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

// biome-ignore lint/complexity/noBannedTypes: <explanation>
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
  return value instanceof Date && !Number.isNaN(value.getTime());
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
    (isObject(value) && isFunction(value.then) && isFunction(value.catch))
  );
}

/**
 * Check if a string is a valid URL
 */
export function isUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Check if a string is valid JSON
 */
export function isValidJson(value: unknown): value is JsonValue {
  if (!isString(value)) {
    return false;
  }
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
