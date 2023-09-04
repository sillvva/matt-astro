import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

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
