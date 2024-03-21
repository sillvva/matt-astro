import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import {
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
	transformerRenderWhitespace
} from "@shikijs/transformers";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: vercel({
		webAnalytics: {
			enabled: true
		},
		speedInsights: {
			enabled: true
		}
	}),
	integrations: [tailwind(), mdx()],
	markdown: {
		shikiConfig: {
			theme: "aurora-x",
			transformers: [
				transformerNotationDiff(),
				transformerNotationHighlight(),
				transformerNotationWordHighlight(),
				transformerNotationFocus(),
				transformerRenderWhitespace(),
				{
					preprocess(text, config) {
						config.transformers.push({
							pre(node) {
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
