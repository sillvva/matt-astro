import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			date: z.date(),
			updated: z.date().optional(),
			tags: z
				.array(z.string().refine((arg) => !/[\/\?\#]/.test(arg), "Tags should not contain ?, #, or / characters"))
				.default([]),
			full: z.boolean().default(false)
		})
});

export const collections = {
	blog: blogCollection
};
