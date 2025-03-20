import { isEmpty, get, isString, uniqueId, omitBy, noop, merge, filter, find, partial } from './object';

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

  describe('noop', () => {
    test('should do nothing and return undefined', () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe('merge', () => {
    test('merges two objects correctly', () => {
      const obj1 = { a: 1, b: { x: 10 } };
      const obj2 = { b: { y: 20 }, c: 3 };
      expect(merge(obj1, obj2)).toEqual({ a: 1, b: { x: 10, y: 20 }, c: 3 });
    });

    test('when keys repeat use last occurrence value', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { a: 3, c: 4 };
      expect(merge(obj1, obj2, obj3)).toEqual({ a: 3, b: 2, c: 4 });
    });

    test('ignores non-object arguments', () => {
      expect(merge(null, { a: 1 })).toEqual({ a: 1 });
      expect(merge(undefined, { a: 1 })).toEqual({ a: 1 });
    });
  });

  describe('filter', () => {
    test('filters an array using a function predicate', () => {
      const arr = [1, 2, 3, 4, 5];
      const isEven = (n) => n % 2 === 0;
      expect(filter(arr, isEven)).toEqual([2, 4]);
    });

    test('filters an array using a string predicate', () => {
      const arr = [
        { active: true, name: 'John' },
        { active: false, name: 'Jane' },
        { active: true, name: 'Doe' }
      ];
      expect(filter(arr, 'active')).toEqual([
        { active: true, name: 'John' },
        { active: true, name: 'Doe' }
      ]);
    });

    test('filters an array using an array predicate', () => {
      const arr = [
        { type: 'fruit', name: 'apple' },
        { type: 'vegetable', name: 'carrot' },
        { type: 'fruit', name: 'banana' }
      ];
      expect(filter(arr, ['type', 'fruit'])).toEqual([
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' }
      ]);
    });

    test('filters an array using an object predicate', () => {
      const arr = [
        { type: 'fruit', name: 'apple', color: 'red' },
        { type: 'fruit', name: 'banana', color: 'yellow' },
        { type: 'vegetable', name: 'carrot', color: 'orange' }
      ];
      expect(filter(arr, { type: 'fruit', color: 'red' })).toEqual([
        { type: 'fruit', name: 'apple', color: 'red' }
      ]);
    });
  });

  describe('find', () => {
    test('finds an element using a function predicate', () => {
      const arr = [1, 2, 3, 4, 5];
      const greaterThanThree = (n) => n > 3;
      expect(find(arr, greaterThanThree)).toBe(4);
    });

    test('finds an element using a string predicate', () => {
      const arr = [
        { active: false, name: 'John' },
        { active: true, name: 'Jane' },
        { active: true, name: 'Doe' }
      ];
      expect(find(arr, 'active')).toEqual({ active: true, name: 'Jane' });
    });

    test('finds an element using an array predicate', () => {
      const arr = [
        { type: 'fruit', name: 'apple' },
        { type: 'vegetable', name: 'carrot' },
        { type: 'fruit', name: 'banana' }
      ];
      expect(find(arr, ['type', 'vegetable'])).toEqual({ type: 'vegetable', name: 'carrot' });
    });

    test('finds an element using an object predicate', () => {
      const arr = [
        { type: 'fruit', name: 'apple', color: 'red' },
        { type: 'fruit', name: 'banana', color: 'yellow' },
        { type: 'vegetable', name: 'carrot', color: 'orange' }
      ];
      expect(find(arr, { name: 'banana', color: 'yellow' })).toEqual({ type: 'fruit', name: 'banana', color: 'yellow' });
    });

    test('returns undefined if no element matches', () => {
      const arr = [{ id: 1 }, { id: 2 }];
      expect(find(arr, { id: 3 })).toBeUndefined();
    });
  });

  describe('partial', () => {
    function add(a, b, c) {
      return a + b + c;
    }

    test('partials arguments without placeholders', () => {
      const add5 = partial(add, 2, 3);
      expect(add5(4)).toBe(9);
    });

    test('partials arguments with placeholders', () => {
      const addWithPlaceholder = partial(add, partial.placeholder, 3, partial.placeholder);
      expect(addWithPlaceholder(2, 4)).toBe(9);
    });

    test('returns correct result when all arguments are pre-filled', () => {
      const addAll = partial(add, 1, 2, 3);
      expect(addAll()).toBe(6);
    });

    test('appends extra arguments when provided', () => {
      function join(...args) {
        return args.join('_');
      }
      const joinPartial = partial(join, 'a');
      expect(joinPartial('b', 'c')).toBe('a_b_c');
    });
  });
});
