import Koa from "koa";
import fetch from "node-fetch";
import utilities from "./utilities.data";
import dotenv from "dotenv";
import cors from "@koa/cors";
import redis from "redis";
import { promisify } from "util";
import extraResources from "./extra.data";
import uniqBy from "lodash.uniqby";

dotenv.config();

const isRedisEnabled = JSON.parse(process.env.REDIS_ENABLED);

const cache = isRedisEnabled
  ? redis.createClient({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    })
  : null;
const getCache = isRedisEnabled
  ? promisify(cache.get).bind(cache)
  : (key: string) => console.log(`should cache ${key}`);
const CACHE_KEY = "solid-open-issues";

const app = new Koa();

app.use(cors());

app.use(async (ctx, next) => {
  if (!cache?.connected) {
    await next();
  } else {
    const issues = JSON.parse(await getCache(CACHE_KEY));

    if (issues) {
      ctx.body = issues;
    } else {
      await next();
      cache.set(CACHE_KEY, JSON.stringify(ctx.body), "EX", 60 * 60 * 24);
    }
  }
});

app.use(async (ctx) => {
  const issues = await [
    { link: "solidjs/solid-site" },
    ...extraResources,
    ...utilities,
  ].reduce(
    // @ts-ignore
    async (acc, utility) => {
      acc = await acc;

      const [owner, name] = utility.link
        .replace("https://github.com/", "")
        .split("/");

      const helpWantedIssues = await fetch(
        `https://api.github.com/repos/${owner}/${name}/issues?state=open&labels=help%20wanted`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      ).then((res) => res.json());

      const goodFirstIssues = await fetch(
        `https://api.github.com/repos/${owner}/${name}/issues?state=open&labels=good%20first%20issue`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      ).then((res) => res.json());

      const issues = [...helpWantedIssues, ...goodFirstIssues];

      console.log(`fetched ${issues.length} new issues`);

      return uniqBy(
        [
          ...acc,
          ...issues.map((issue) => ({ ...issue, repo: { owner, name } })),
        ],
        "id"
      );
    },
    []
  );

  ctx.body = issues;
});

app.listen(8000, () => {
  console.log("API running on port 8000");
});
