# Virtual Jacksonville ARTCC Website

## 
## Useful Links
https://vatusa-api.ztlartcc.org/ - Meaningful VATUSA API documentation

## Setup
This project runs on Postgres 16 and uses prisma. Once you have cloned the repo, setup your environment by changing the following in .env.example:

```env
databaseUrl="" # See prisma docs for format
vatusaApikey="" # Your development key
```

Then, initialize your database:

```bash
prisma db push
```

## Developing

Now install dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Deploying

This project relies on docker compose to create the containers. You can manually run:
```bash
docker compose up --build -d
```

Or setup a self hosted runner and let GitHub actions deploy it.

