import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { HOME } from "@consts";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

type Context = {
	site: string;
};

export async function GET(context: Context) {
	const blog = (await getCollection("blog")).filter((post) => !post.data.draft);

	const projects = (await getCollection("projects")).filter(
		(project) => !project.data.draft,
	);

	const items = [...blog, ...projects].sort(
		(a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
	);

	return rss({
		title: HOME.TITLE,
		description: HOME.DESCRIPTION,
		site: context.site,
		trailingSlash: false,
		items: items.map((item) => ({
			title: item.data.title,
			content: sanitizeHtml(parser.render(item.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			}),
			description: item.data.description,
			pubDate: item.data.date,
			link: `/${item.collection}/${item.slug}/`,
		})),
	});
}
