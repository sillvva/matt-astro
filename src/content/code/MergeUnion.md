---
name: Merge Union Types
source: https://dev.to/lucianbc/union-type-merging-in-typescript-9al
---

```ts
export type AllKeys<T> = T extends T ? keyof T : never;

export type PickType<T, K extends AllKeys<T>> = T extends { [k in K]: any } ? T[K] : never;

export type MergeUnion<T> = {
	[K in AllKeys<T>]: PickType<T, K>;
};
```
