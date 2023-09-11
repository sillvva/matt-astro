import links from "$/content/other/links.json" assert { type: "json" };
import type { APIContext } from "astro";

export const prerender = false;

export async function GET({ params, redirect }: APIContext) {
	const link = links.find((link) => link.slug === params.link);
	if (!link) {
		return new Response("Not found", { status: 404 });
	}
	return redirect(link.url, 301);
}
