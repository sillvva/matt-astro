---
name: Combine and Prettify
playground: https://www.typescriptlang.org/play?#code/PTAEGEHkBEFECh4BcCeAHApqACgJw0kgJYBmKAPACoB8oAvKAN7yigDaA0qEQHagDWGFAHsSoSgF0AXOM4SA3PAC+oAGRMli5OizhhAWwBGvDFQCMAGnEAmWgzwFiZciyavWnbn0EixACkozUAAfGwBKaXEzORCbOUVWFXVsAENcYhSAG3M1G2p4ai0QcVgAZUpSxCJ9NGF0plBYAEcAVyyrWAAPTABjJFAVElwDUAAiAAEkYSQsgFpUTABnHtwiNCRgAAsMTMxcRdGtBaxKHQBBejdWfBSAE2EeTJRQHhT9DBlFpFWeAHME0A3e6PZ53W74RaLT7fXj-ZRHHTiHQAIUujEBGDuDyeLzeH1AXx+-1AaE2D3xhNhAwRmFAACUMIsWpl+gw9EYTFRzlZTphkYVEMdGt0MH0MLc0a4gdjnq93tCiQDpSDQGCIYsAPwK2EA0nkrUEmF-RSaQWIpCM1nC3pIcjNNrZBlMlkdEVi27UAVAA
---

```ts
type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

type Combine<T1, T2> = Prettify<
	{
		[K in keyof (T1 | T2)]: T1[K] | T2[K];
	} & Partial<T1 & T2>
>;
```
