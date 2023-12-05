import type { APIContext } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export async function GET({ params, redirect }: APIContext) {
	if (!params.slug) return new Response("Not found", { status: 404 });
	const link = await getEntry("links", params.slug);
	if (!link) return new Response("Not found", { status: 404 });
	return redirect(link.data.url, 307);
}
