declare module '*.scss';
declare module '*.sass';

// alias
declare type MayUndefined<T> = T | undefined;
declare type Nullable<T> = T | null | undefined;
declare type Timestamp = number;
declare type ISODateString = string;

// utils
declare type PromisePayload<T> = T extends Promise<infer F> ? F : never;
