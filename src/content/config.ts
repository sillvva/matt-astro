import { defineCollection, z } from "astro:content";

const dateRegex =
	/^((\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\d|3[01])|(0[469]|11)-(0[1-9]|[12]\d|30)|(02)-(0[1-9]|1\d|2[0-8])))T([01]\d|2[0-3]):[0-5]\d(:[0-5]\d(\.\d{3})?)?([+-]([01]\d|2[0-3]):[0-5]\d|Z)?$/;

const blogCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: z.union([image(), z.string().url().startsWith("https://www.youtube.com").includes("v=")]),
			codepen: z
				.object({
					title: z.string(),
					hash: z.string(),
					user: z.string().default("Sillvva"),
					height: z.number().default(700),
					editable: z.boolean().default(false),
					defaultTab: z.string().default("result")
				})
				.optional(),
			date: z.date(),
			updated: z.date().optional(),
			tags: z.array(z.string()).default([]),
			full: z.boolean().default(false),
			hidden: z.boolean().default(false)
		})
});

const projectCollection = defineCollection({
	type: "data",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string(),
			tags: z
				.array(
					z.object({
						name: z.string(),
						description: z.string().default("")
					})
				)
				.default([]),
			image: image(),
			link: z.string(),
			date: z
				.string()
				.regex(dateRegex)
				.transform((date) => new Date(date))
		})
});

const experienceCollection = defineCollection({
	type: "data",
	schema: ({ image }) =>
		z.object({
			id: z.number(),
			name: z.string(),
			items: z.array(
				z.object({
					created_at: z.string().datetime(),
					name: z.string(),
					nameLink: z.string().nullable(),
					image: image(),
					h4: z.string(),
					h4Link: z.string().nullable(),
					h5: z.string(),
					h5Link: z.string().nullable()
				})
			)
		})
});

const linkCollection = defineCollection({
	type: "data",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			image: image().optional(),
			url: z.string().url()
		})
});

export const collections = {
	blog: blogCollection,
	projects: projectCollection,
	links: linkCollection,
	experience: experienceCollection
};
