# Contribute to Solid.js

## Prerequirements

- [PNPM](https://pnpm.io/)
- [Docker](https://www.docker.com/) (or just [Redis](https://redis.io/) running locally)
- Node.js 16

## Usage

### Installation

```bash
pnpm install
```

### Run development environment

#### Github API Key

You will need a Github API key to fetch data from Github.
To generate one see [here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

Once generated, copy `.env.example` file as `.env` at the root of the project and copy your newly created Github API key as:

```
...
GITHUB_TOKEN=YOUR_KEY_HERE
...
```

#### Run API with Docker

We have a Docker setup to run the API and a Redis instance easily, just run:

```bash
docker-compose up -d
```

#### Run front-end

```bash
pnpm dev
```

You can now access the app via `http://localhost:3000`
