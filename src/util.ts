import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export const cn = (...classes: ClassValue[]) => {
	return twMerge(clsx(classes));
};

export const sorter = (a: string | number | Date, b: string | number | Date) => {
	if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
	if (typeof a === "number" && typeof b === "number") return a - b;
	if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
	return 0;
};

export const slugify = (text: string) => {
	return text
		.toLowerCase()
		.replace(/[\s\W-]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
};

export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
};

export const languages = [
	"js",
	"ts",
	"jsx",
	"tsx",
	"svelte",
	"html",
	"css",
	"scss",
	"json",
	"diff",
	"bash",
	"powershell",
	"mdx",
	"plaintext",
	"sql",
	"yaml"
] as const;
export function getLanguage(lang?: string) {
	if (languages.includes(lang as any)) return lang as (typeof languages)[number];
	return "plaintext";
}
