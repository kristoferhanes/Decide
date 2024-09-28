export const evidence = <Option extends string, Criteria extends string>(
  option: Option,
  evidence: readonly [Criteria, number][],
  theta: KeySet<Option>,
  weight: (criteria: Criteria) => number,
): MassFunction<Option> => {
  const massFunctions: MassFunction<Option>[] = [];
  for (const [criteria, mass] of evidence) {
    massFunctions.push(MassFunction.fromEvidence([[KeySet.fromArray([option]), mass * weight(criteria)]], theta));
  }
  return MassFunction.combine(...massFunctions);
};

/** A DST implementation of a mass function. */
export class MassFunction<Key extends string> {
  private _frames: Map<string, number> = new Map();

  /** Creates a new mass function from a list of frames. */
  constructor(frames: readonly [KeySet<Key>, number][]) {
    for (const [keySet, mass] of frames) {
      this._frames.set(keySet.toString(), mass);
    }
  }

  /** Returns the mass value for a given key set. */
  get frames(): [KeySet<Key>, number][] {
    return Array.from(this._frames.entries()).map(([key, value]) => [KeySet.fromString(key), value]);
  }

  /** Converts the frames into a normalized singleton distribution. */
  get masses(): Map<Key, number> {
    const result = new Map<Key, number>();
    for (const [set, mass] of this.frames) {
      const redistributedMass = mass / set.size;
      const keys: KeySet<Key> = KeySet.fromString(set.toString());
      for (const element of keys) {
        result.set(element, (result.get(element) ?? 0) + redistributedMass);
      }
    }
    return result;
  }

  /** Creates a new mass function from a list of evidence. */
  static fromEvidence<Key extends string>(
    evidence: readonly [KeySet<Key>, number][],
    theta: KeySet<Key>,
  ): MassFunction<Key> {
    const result = new MassFunction(evidence);
    const k = evidence.reduce((acc, curr) => acc + curr[1], 0);
    if (k < 1) {
      result._frames.set(theta.toString(), 1 - k);
    }
    return result;
  }

  /** Combines two or more mass functions using Dempster's rule of combination. */
  static combine<Key extends string>(...massFunctions: readonly MassFunction<Key>[]): MassFunction<Key> {
    const [massFunction, ...rest] = massFunctions;
    return rest.reduce((acc, curr) => MassFunction.combine2(acc, curr), massFunction);
  }

  private static combine2<Key extends string>(lhs: MassFunction<Key>, rhs: MassFunction<Key>): MassFunction<Key> {
    const frames = new Map<string, number>();
    let k: number = 0;
    for (const [set1, mass1] of lhs._frames) {
      for (const [set2, mass2] of rhs._frames) {
        const intersection = KeySet.fromString(set1).intersection(KeySet.fromString(set2));
        if (intersection.size === 0) {
          k += mass1 * mass2;
        } else {
          const key = intersection.toString();
          const value = frames.get(key) ?? 0;
          frames.set(key, value + mass1 * mass2);
        }
      }
    }
    if (k < 1) {
      const normalizationFactor = 1 / (1 - k);
      for (const [key, value] of frames) {
        frames.set(key, value * normalizationFactor);
      }
    }
    return new MassFunction(Array.from(frames.entries()).map(([key, value]) => [KeySet.fromString(key), value]));
  }
}

export class KeySet<Key extends string> {
  private set: Set<Key> = new Set();

  constructor(set: ReadonlySet<Key> = new Set()) {
    this.set = new Set(set);
  }

  static fromArray<Key extends string>(array: readonly Key[]): KeySet<Key> {
    return new KeySet(new Set(array));
  }

  add(key: Key): void {
    this.set.add(key);
  }

  has(key: Key): boolean {
    return this.set.has(key);
  }

  get size(): number {
    return this.set.size;
  }

  toString(): string {
    return JSON.stringify([...this.set]);
  }

  static fromString<Key extends string>(str: string): KeySet<Key> {
    return KeySet.fromArray(JSON.parse(str));
  }

  intersection(rhs: KeySet<Key>): KeySet<Key> {
    return new KeySet(new Set([...this.set].filter((x) => rhs.has(x))));
  }

  [Symbol.iterator](): IterableIterator<Key> {
    return this.set[Symbol.iterator]();
  }
}
