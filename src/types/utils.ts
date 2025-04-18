export type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

export type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

export type DeepUnwrapPromise<T> =
  T extends Promise<infer R> ? DeepUnwrapPromise<R> : T;

export type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

export type ElementOf<T> = T extends Array<infer E> ? E : never;

export type GetProps<T> = T extends (props: infer P) => any ? P : never;

export type UnwrapState<T> = T extends [infer S, (state: infer SS) => void]
  ? S
  : never;
1;
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Keys<T> = keyof T;
export type Values<T> = T extends Record<any, infer V> ? V : never;
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// Exclude<
// export type Omit<T, P> =
// 结果: "b" | "c"

const aa = {
  a: 1,
  b: 2,
  c: 3,
};
type a = Pick<{ a: string; b: { c: number } }, "b">;
