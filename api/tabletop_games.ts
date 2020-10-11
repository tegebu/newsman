import { ServerRequest } from "https://deno.land/std@0.73.0/http/server.ts";
import { format } from "https://deno.land/x/date_fns@v2.15.0/index.js";

const query =
  "(ボードゲーム OR テーブルゲーム OR カードゲーム OR アークライト) AND NOT (PS4 OR ニンテンドースイッチ OR ゲーム感覚 OR ゲームソフト OR ガンホー OR スマホアプリ OR RPG OR オンラインゲーム OR 2ちゃんねる OR パズドラ OR PC向け OR Android向け OR iOS向け OR デジタルカードゲーム OR デジタル版 OR Kaggle)";
const excludeDomains =
  "togetter.com,machicon.jp,livedoor.biz,livedoor.jp,livedoor.com,thebridge.jp,alfalfalfa.com,onecall2ch.com,matometanews.com,hatelabo.jp,new-akiba.com,prtimes.jp,scienceplus2ch.com,u-note.me,yaraon-blog.com,touchlab.jp,diamond.jp,www.2nn.jp,burusoku-vip.com,moeyo.com,kai-you.net,doope.jp,eiga.com,itmedia.co.jp";

export default async (req: ServerRequest) => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);

  const url = `http://newsapi.org/v2/everything?from=${
    format(d, "yyyy-MM-dd")
  }&q=${query}&sortBy=publishedAt&apiKey=${
    Deno.env.get("API_KEY")
  }&excludeDomains=${excludeDomains}`;

  fetch(new Request(url))
    .then(async (response: Response) => {
      const res = await response.json() as Promise<Article>;
      // console.log(res);

      (await res).articles = (await res).articles
        .filter(
          // policy
          (article) => {
            return article.url.startsWith("https://");
          },
        )
        .map((article) => {
          // Avoiding "Mixed Content"
          article.urlToImage =
            article.urlToImage?.replace("http://", "https://") ?? null;
          return article;
        });
      console.log(res);
      req.respond({ body: JSON.stringify(res) });
    });
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
  id?: string;
  name: string;
}
