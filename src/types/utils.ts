export type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;


export type MyParameters<T> = T extends (...args: infer P) => any ? P : never;


export type DeepUnwrapPromise<T> = T extends Promise<infer R> ? DeepUnwrapPromise<R> : T;

export type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

export type ElementOf<T> = T extends Array<infer E> ? E : never;

export type GetProps<T> = T extends (props: infer P) => any ? P : never;

export type UnwrapState<T> = T extends [infer S, (state: infer SS) => void] ? S : never
