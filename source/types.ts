/**
 * JSON primitive types
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * Json object type
 */
export type JsonObject = { [key: string]: JsonValue };

/**
 * Json array type
 */
export type JsonArray = JsonValue[];

/**
 * Json value type
 */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/**
 * Record with string keys and any values
 */
export type AnyRecord = Record<string, any>;

/**
 * Optional properties in T
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Required properties in T
 */
export type RequiredFields<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * Deep partial type
 */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  T extends (...args: any) => Promise<infer R> ? R : any;

/**
 * Expect that the thing passed to Expect<T> is true.
 *
 * For instance, `Expect<true>` won't error. But
 * `Expect<false>` will error.
 */
export type Expect<T extends true> = T;

/**
 * Checks that X and Y are exactly equal.
 *
 * For instance, `Equal<'a', 'a'>` is true. But
 * `Equal<'a', 'b'>` is false.
 *
 * This also checks for exact intersection equality. So
 * `Equal<{ a: string; b: string  }, { a: string; b: string }>`
 * is true. But `Equal<{ a: string; b: string  }, { a: string; } & { b: string }>`
 * is false.
 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

/**
 * Checks that Y is assignable to X.
 *
 * For instance, `Extends<string, 'a'>` is true. This is because
 * 'a' can be passed to a function which expects a string.
 *
 * But `Extends<'a', string>` is false. This is because a string
 * CANNOT be passed to a function which expects 'a'.
 */
export type Extends<X, Y> = Y extends X ? true : false;

/**
 * Makes all properties in T mutable (removes readonly modifiers).
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
* Flattens and simplifies a type, making it easier to read in editor tooltips.
*
* Useful for displaying the "final" shape of a complex type after intersections,
* mapped types, or conditional types have been applied.
*
* @example
*   type Foo = { a: string } & { b: number };
*   type PrettyFoo = Prettify<Foo>; // { a: string; b: number }
*/
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
