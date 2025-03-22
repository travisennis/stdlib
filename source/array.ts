export function intersperse<A>(as: A[], separator: (index: number) => A): A[] {
  return as.flatMap((a, i) => (i ? [separator(i), a] : [a]));
}

export function sortBy<T>(array: T[], fn: (a: T) => number) {
  return array.sort((a, b) => fn(a) - fn(b));
}
