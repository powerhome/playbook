import { isEmpty, get, isString, uniqueId, omitBy } from './object';

describe('Lodash functions', () => {
  describe('isEmpty', () => {
    test('returns true for empty objects', () => {
      expect(isEmpty({})).toBe(true);
    });
    test('returns true for empty arrays', () => {
      expect(isEmpty([])).toBe(true);
    });
    test('returns false for non-empty objects', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });
    test('returns false for non-empty arrays', () => {
      expect(isEmpty([1])).toBe(false);
    });
    test('returns true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });
    test('returns false for non-object, non-array values', () => {
      expect(isEmpty("hello")).toBe(false);
      expect(isEmpty(123)).toBe(false);
    });
  });

  describe('get', () => {
    const obj = { a: { b: { c: 42 } }, arr: [{ x: 1 }, { y: 2 }] };

    test('retrieves nested properties by dot path', () => {
      expect(get(obj, 'a.b.c')).toBe(42);
    });
    test('returns default value if path does not exist', () => {
      expect(get(obj, 'a.b.d', 'default')).toBe('default');
    });
    test('retrieves array values using bracket notation', () => {
      expect(get(obj, 'arr[1].y')).toBe(2);
    });
    test('returns default for non-existent paths', () => {
      expect(get(obj, 'non.existent.path', null)).toBe(null);
    });
  });

  describe('isString', () => {
    test('returns true for string literal', () => {
      expect(isString('test')).toBe(true);
    });
    test('returns true for String object', () => {
      expect(isString(new String('test'))).toBe(true);
    });
    test('returns false for non-string values', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString({ a: 1 })).toBe(false);
      expect(isString([ 'a','b','c' ])).toBe(false);
    });
  });

  describe('uniqueId', () => {
    test('generates unique ids without prefix', () => {
      const id1 = uniqueId();
      const id2 = uniqueId();
      expect(id1).not.toBe(id2);
      expect(Number(id1)).toBeLessThan(Number(id2));
    });
    test('generates unique ids with prefix', () => {
      const id1 = uniqueId('id_');
      const id2 = uniqueId('id_');
      const id3 = uniqueId('id_');
      expect(id1).not.toBe(id2);
      expect(id1).not.toBe(id3);
      expect(id2).not.toBe(id3);
      expect(id1.startsWith('id_')).toBe(true);
      expect(id2.startsWith('id_')).toBe(true);
      expect(id3.startsWith('id_')).toBe(true);
    });
  });

  describe('omitBy', () => {
    test('omits keys for which predicate returns true', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const isEven = value => value % 2 === 0;
      const noEvenValues = omitBy(obj, isEven);
      expect(noEvenValues).toEqual({ a: 1, c: 3 });
    });
    test('returns empty object for null input', () => {
      expect(omitBy(null, () => true)).toEqual({});
    });
    test('returns empty object for non-object input', () => {
      expect(omitBy("string", () => true)).toEqual({});
    });
    test('returns original object if predicate returns false for all keys', () => {
      const obj = { a: 1, b: 2 };
      const isBiggerThanFive = value => value >= 4;
      const objWithSmallValues = omitBy(obj, isBiggerThanFive);
      expect(objWithSmallValues).toEqual(obj);
    });
  });
});
