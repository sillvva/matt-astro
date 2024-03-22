import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
	transformerRenderWhitespace
} from "@shikijs/transformers";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import theme from "./theme.json";

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
			theme: theme,
			transformers: [
				transformerNotationDiff(),
				transformerNotationHighlight(),
				transformerNotationWordHighlight(),
				transformerNotationFocus(),
				transformerRenderWhitespace(),
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
					// tokens(tokens) {
					// 	tokens = tokens.map((line) => {
					// 		return line.map((token) => {
					// 			if (token.color === "#546E7A") token.color = "#A7ADBA";
					// 			if (token.color === "#F07178") token.color = "#50d1b8";
					// 			if (token.color === "#F78C6C") token.color = "#ffffff";
					// 		});
					// 	});
					// }
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
