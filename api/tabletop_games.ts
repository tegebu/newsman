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
			console.log(res);
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
	author: null;
	title: string;
	description: null;
	url: string;
	urlToImage: null;
	publishedAt: string;
	content: null;
}

export interface Source {
	id: string;
	name: string;
}
