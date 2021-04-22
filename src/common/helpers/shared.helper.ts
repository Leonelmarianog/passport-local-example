export const isString = (obj: any): obj is string => typeof obj === 'string';

export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';

export const isNil = (obj: any): obj is null | undefined =>
  isUndefined(obj) || obj === null;

export const isObject = (fn: any): fn is Record<string, any> =>
  !isNil(fn) && typeof fn === 'object';
