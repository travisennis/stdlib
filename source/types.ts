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
