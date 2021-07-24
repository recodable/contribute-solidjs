# Contribute to Solid.js

## Prerequirements

- [PNPM](https://pnpm.io/)
- Node.js 16 or later
- [Github API Key](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [OPTIONAL] [Docker](https://www.docker.com/) (or just [Redis](https://redis.io/) running locally)

## Usage

### Installation

```bash
pnpm install
```

### Run development environment

We can run our back-end + our front-end app with:

```bash
pnpm dev
```

You can now access the app via `http://localhost:3000` and the API at `http://localhost:8000`

## Good to know

The project rely on Redis to cache Github API response on the server. This prevent to reach the limit but can also be an issue if working on the back-end.

You can flush Redis cache to fetch fresh data with:

```bash
pnpm cache:clear
```
