---
name: "SuperStruct"
playground: https://www.typescriptlang.org/play?#code/PTAEBUFEGV2goeBLAtgBwPYCcAuoDeokAjgK4CGANgDREAeaApgMZ4C+oAZlhiqAEQABHBhxUAtDgCeTAM7MsSNDmAALRpSZZZ-ANyJpTUABkMAcwAi5MaAC8BeKFBIAJgC5QAO1IoARoyx9JxRGWVlyM0YPWRxFTzMg0BdrKNAYuITHUFJZAI98LKdXD28-AMSnT3IQ6NikeMS2RLEzWVqMgG0AXX02AxlGE3NILB5tO1BoUi1oWNJWAB5TS2tyWnT6s26APn0QJ1AAPQB+fqNwULx7SAYWHAWSCkol4dHsWQ7+V34u9br47qgAA+2U8LkYnHqjBc2128H2ThOiGYGE8MVAATGbSGZhGWImBScOTyDgOzncoE+eOwoBCYQijB+WT6TUQ+wAwgB5CyQRCMBjYPCGQYAQUolAA0owpLIFuBthNwBi6DhGGDZBBQMdQABraUYTiakqMABu5TZYFClHqOHELiQ4V8lEY4k8-Nt1rdoGEA3kimU4itNuAngwgYY1uYSFt5E8UngwtAAAUkMwdeABnLaBLlar1aAxZLpbL5Qr7Er3WqXBrCB0dc5PKAJV0PLGpKAONrwB1m6BjWbAhaIKpYzqNSJQKocDg0G0QOCTQA6ETASjzJCx3zMYCkTxIVGSAbiEJYMybcT1Q9yBRKW0ATio8H5mFwoETAFkApEAKp71FyssHAASB7BsC3FKUZQAltk1TdNM3AbM4VZJ8BVfRMphmOZWBFUZyCkOVcyrDUACUWGwFwFg2eJaF3HVQwAd08bZaCsMRaFwrB8LY8gJjoxjmIJeAgP2INPFte1HWdV13XET1Bh9a9-VtMSVFDcM0EjaNxDbYSOiTHgtGkMDC0gktti6Y4PA6cAuiI-MOjbLphKA7UADlUTc0hxXIJ1GDlfTDICaQugVSt8zIlEsEo6izFozx6IwJjthc1zJmmAJZiweYcE4-CFk-U9GF-fdPAWDzPC8ny-ICgyMCMqRQpY0AeI4vCpB4lKgO6jwKqqyhfOdWqgtwRqwpVYjQAACnqTgAgLABKbpUrSvKOtWUAADIVu6yKKIWHbutKfwsGBNJ-jiw6gL67yBpqkVxrzatQD26KqIu+LEuSq60swzLsNy9qCq-Yq-zKm7qqGh7mtagt2s6n6PB4w6uu6oCkdWFz+3NFDn0FN8BnSrDssWCsJoi8i3tiz6BJh1ZAKTchcA3Z4ChEy1ZE9CSHUGl03RVOSoW9YU-VvQNOeDdTny0mM4z0uqGpMiDi2g6zbPs57HLjZzuvczzbt54b6uCsaNdIymYo+0EvuY1LtT+rAspy4GipK-8IbuobuwVk2mtY+nUt6-XIf872RpCx7Jpmzw5tOkUlp1tG9cqg37sjimostjIaaS220d1on-pJ+5Cp-MHyuDz3-Oh-2xFRtGMbEFbG-ILGvFNHHdiAA
source: https://github.com/ciscoheat/sveltekit-superforms/blob/main/src/lib/superStruct.ts
---

```ts
export type AllKeys<T> = T extends T ? keyof T : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]: any } ? T[K] : never;

// Thanks to https://dev.to/lucianbc/union-type-merging-in-typescript-9al
export type MergeUnion<T> = {
	[K in AllKeys<T>]: PickType<T, K>;
};

export type SuperStructArray<T extends Record<string, unknown>, Data, ArrayData = unknown> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[Property in AllKeys<T>]?: [T] extends [any]
		? NonNullable<T[Property]> extends Record<string, unknown>
			? SuperStructArray<MergeUnion<NonNullable<T[Property]>>, Data, ArrayData>
			: NonNullable<T[Property]> extends (infer A)[]
				? ArrayData &
						Record<
							number | string,
							NonNullable<A> extends Record<string, unknown>
								? SuperStructArray<MergeUnion<NonNullable<A>>, Data, ArrayData>
								: Data
						>
				: Data
		: never;
};

export type SuperStruct<T extends Record<string, unknown>, Data> = Partial<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[Property in AllKeys<T>]: [T] extends [any]
		? NonNullable<T[Property]> extends Record<string, unknown>
			? SuperStruct<MergeUnion<NonNullable<T[Property]>>, Data>
			: NonNullable<T[Property]> extends (infer A)[]
				? NonNullable<A> extends Record<string, unknown>
					? SuperStruct<MergeUnion<NonNullable<A>>, Data>
					: Data
				: Data
		: never;
}>;
```
