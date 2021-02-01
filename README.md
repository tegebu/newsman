# Newsman
[![(Deno)](https://img.shields.io/badge/deno-^1.4.0-green.svg?style=flat-square&logo=deno)](https://deno.land)

[<img src="./newsman-on-vercel-deno.png">](https://github.com/yoshixmk/newsman)

Deliver interesting news for you.

## Usage

**Newsman** is Serverless Functions for frontend teams, and it use ▲ Vercel Runtime for 🦕 Deno serverless functions

About Vercel, get started by [Importing a Git Project](https://vercel.com/import) and use `git push` to deploy. Alternatively, you can [install Vercel CLI](https://vercel.com/download).

About Deno serverless functions, get started by [vercel-deno](https://github.com/TooTallNate/vercel-deno).

## Getting started

1. Install [Vercel CLI](https://vercel.com/download)
2. Clone this repository
3. vercel login
4. Prepare api key for News API, [here](https://newsapi.org/)
5. `API_KEY=XXX GAS_SCRIPT_ID=XXX vercel dev --local-config=vercel_local.json`

Try it. Execute the files in the `/api` directory:
```shell
$ curl -v http://localhost:3000/api/tabletop_games | jq
```

## How to Create a Release
If you have write access to this repository, you can read more about how to publish a release here.
