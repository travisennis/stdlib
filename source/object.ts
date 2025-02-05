export function objectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export function objectEntries<T extends object>(
  obj: T,
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function objectFromEntries<K extends string | number | symbol, V>(
  entries: [K, V][],
): { [P in K]: V } {
  return Object.fromEntries(entries) as { [P in K]: V };
}
