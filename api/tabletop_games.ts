import { ServerRequest } from 'https://deno.land/std@0.70.0/http/server.ts';
import { format } from 'https://deno.land/x/date_fns@v2.15.0/index.js';

export default async (req: ServerRequest) => {
	const d = new Date();
	d.setMonth(d.getMonth() - 1);
	const url = 'http://newsapi.org/v2/everything?' +
		`from=${format(d, 'yyyy-MM-dd')}&` +
		'q=ボードゲーム&' +
		'q=テーブルゲーム&' +
		'sortBy=publishedAt&' +
		`apiKey=${Deno.env.get('API_KEY')}`;
	fetch(new Request(url))
		.then(async (response: Response) => {
			const res = await response.json() as Promise<Article>;
			// console.log(res);

			(await res).articles = (await res).articles
				.filter(
					// policy
					article => {
						return article.url.startsWith('https://')
					}
				)
				.map(article => {
					// Avoiding "Mixed Content"
					article.urlToImage = article.urlToImage?.replace('http://', 'https://') ?? null;
					return article;
				});
			console.log(res)
			req.respond({ body: JSON.stringify(res) });
		})
};

export interface Article {
	status: string;
	totalResults: number;
	articles: ArticleElement[];
}

export interface ArticleElement {
	source: Source;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
}

export interface Source {
	id: string;
	name: string;
}
