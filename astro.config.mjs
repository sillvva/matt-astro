import mdx from "@astrojs/mdx";
import nodejs from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: nodejs({
		mode: "middleware"
	}),
	integrations: [tailwind(), mdx()],
	markdown: {
		syntaxHighlight: "prism",
		remarkPlugins: [[remarkToc, { tight: true, maxDepth: 3 }]]
	},
	image: {
		domains: ["slxazldgfeytirfrculz.supabase.co"]
	}
});
