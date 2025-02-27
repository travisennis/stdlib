function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isNumber(input: unknown): input is number {
  return Number.isInteger(input);
}

export function random(seed?: number) {
  let prng = Math.random;
  if (isNumber(seed)) {
    prng = mulberry32(seed);
  }

  function randomFloat(min: number, max?: number): number {
    const upperBound = max ?? min;
    const lowerBound = max ? min : 0;
    return prng() * (upperBound - lowerBound) + lowerBound;
  }

  return {
    float: randomFloat,
    int(min: number, max?: number): number {
      return Math.floor(randomFloat(min, max));
    },
  };
}
