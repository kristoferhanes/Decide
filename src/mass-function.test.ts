import { describe, expect, it } from '@jest/globals';
import { MassFunction, KeySet } from './mass-function';

describe('MassFunction', () => {
  it('should correctly return frames', () => {
    const evidence: [KeySet<string>, number][] = [
      [KeySet.fromArray(['a']), 0.5],
      [KeySet.fromArray(['b']), 0.3],
    ];
    const massFunction = new MassFunction(evidence);
    expect(massFunction.frames).toEqual([
      [KeySet.fromArray(['a']), 0.5],
      [KeySet.fromArray(['b']), 0.3],
    ]);
  });

  it('should correctly calculate masses', () => {
    const evidence: [KeySet<string>, number][] = [
      [KeySet.fromArray(['a']), 0.5],
      [KeySet.fromArray(['a', 'b']), 0.5],
    ];
    const massFunction = new MassFunction(evidence);
    const masses = massFunction.masses;
    expect(masses.get('a')).toBeCloseTo(0.75);
    expect(masses.get('b')).toBeCloseTo(0.25);
  });

  it('should create a new mass function from evidence', () => {
    const evidence: [KeySet<string>, number][] = [
      [KeySet.fromArray(['a']), 0.5],
      [KeySet.fromArray(['b']), 0.3],
    ];
    const theta = KeySet.fromArray(['a', 'b']);
    const massFunction = MassFunction.fromEvidence(evidence, theta);
    massFunction.frames.forEach((frame) => {
      switch (frame[0].toString()) {
        case '["a"]':
          expect(frame[1]).toBeCloseTo(0.5);
          break;
        case '["b"]':
          expect(frame[1]).toBeCloseTo(0.3);
          break;
        case '["a","b"]':
          expect(frame[1]).toBeCloseTo(0.2);
          break;
        default:
          throw new Error('unexpected key set');
      }
    });
  });
});

describe('KeySet', () => {
  it('should correctly create a key set from a string', () => {
    const keySet = KeySet.fromString('["abc"]');
    expect(keySet.toString()).toBe('["abc"]');
  });

  it('should correctly create a key set from a set', () => {
    const keySet = new KeySet(new Set(['a', 'b', 'c']));
    expect(keySet.toString()).toBe('["a","b","c"]');
  });

  it('should correctly calculate the intersection of two key sets', () => {
    const keySet1 = new KeySet<string>(new Set(['a', 'b', 'c']));
    const keySet2 = new KeySet<string>(new Set(['b', 'c', 'd']));
    const intersection = keySet1.intersection(keySet2);
    expect(intersection.toString()).toBe('["b","c"]');
  });
});
