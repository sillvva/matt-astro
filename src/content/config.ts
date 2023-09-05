import { defineCollection, z } from "astro:content";

const dateRegex =
	/^((\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\d|3[01])|(0[469]|11)-(0[1-9]|[12]\d|30)|(02)-(0[1-9]|1\d|2[0-8])))T([01]\d|2[0-3]):[0-5]\d(:[0-5]\d(\.\d{3})?)?([+-]([01]\d|2[0-3]):[0-5]\d|Z)?$/;

const blogCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			date: z.date(),
			updated: z.date().optional(),
			tags: z.array(z.string()).default([]),
			full: z.boolean().default(false)
		})
});

const projectCollection = defineCollection({
	type: "data",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string(),
			description: z.string(),
			image: image(),
			link: z.string(),
			date: z
				.string()
				.regex(dateRegex)
				.transform((date) => new Date(date))
		})
});

export const collections = {
	blog: blogCollection,
	projects: projectCollection
};
