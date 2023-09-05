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
				.datetime()
				.transform((date) => new Date(date))
		})
});

export const collections = {
	blog: blogCollection,
	projects: projectCollection
};
