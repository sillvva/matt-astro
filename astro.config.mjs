import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight
} from "@shikijs/transformers";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import theme from "./src/theme.json";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: node({
		mode: "standalone"
	}),
	integrations: [tailwind(), mdx()],
	markdown: {
		shikiConfig: {
			theme,
			transformers: [
				transformerNotationDiff(),
				transformerNotationHighlight(),
				transformerNotationWordHighlight(),
				transformerNotationFocus(),
				transformerNotationErrorLevel(),
				{
					preprocess(text, config) {
						config.transformers.push({
							pre(node) {
								node.properties.lang = config.lang;
								this.addClassToHast(node, `language-${config.lang}`);
							}
						});
					}
				}
			]
		},
		remarkPlugins: [[remarkToc, { tight: true, maxDepth: 3 }]]
	},
	image: {
		domains: ["slxazldgfeytirfrculz.supabase.co"]
	},
	experimental: {
		contentCollectionCache: true
	}
});
