import { ServerRequest } from "https://deno.land/std@0.73.0/http/server.ts";
import { AsyncJSON } from '../something/AsyncJSON.ts';

export interface ActivityHistory {
  publishedAt: string;
  urlToImage: string;
  comment?: string; // Arbitrary input in Form
}

export type ActivityHistories = Array<ActivityHistory>;

export default async (req: ServerRequest) => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);

  const url = `https://script.google.com/macros/s/${Deno.env.get("GAS_SCRIPT_ID")}/exec`;

  const response: Response = await fetch(new Request(url));
  const res: Promise<ActivityHistories> = response.json() as Promise<ActivityHistories>;
  const histories: ActivityHistories = await res;

  const h: ActivityHistories = histories.sort((ah1, ah2) =>
    new Date(ah2.publishedAt).getTime() - new Date(ah1.publishedAt).getTime()
  )
  .map((ah) => {
    // imgタグで開ける形式に変換
    ah.urlToImage = ah.urlToImage.replace(
      "https://drive.google.com/open?id=",
      "http://drive.google.com/uc?export=view&id=",
    );
    return ah;
  });

  console.log(h);

  const body: string= await AsyncJSON.stringify(h);

  req.respond({ body });
};
