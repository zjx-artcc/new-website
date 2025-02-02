# Virtual Jacksonville ARTCC Website

## Information
This is the new website for the [Virtual Jacksonville ARTCC](https://zjxartcc.org), part of the [VATSIM](https://vatsim.net) Network.

## Useful Links
https://vatusa-api.ztlartcc.org/ - Meaningful VATUSA API documentation

## Setup
This project runs on Postgres 16 and uses prisma. Once you have cloned the repo, setup your environment by changing the following in .env.example:

```dotenv
DATABASE_URL="" # See prisma docs for format
VATUSA_KEY="" # Your development key
```

Then, initialize your database:

```bash
prisma db push
```

## Developing

Now install dependencies with `pnpm install`, if you haven't, generate your prisma client:
> [!NOTE]
> This is not needed if you initialized your database with prisma since it automatically generates

```bash
prisma generate
```

and finally, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```


## Deploying

This project relies on docker-compose to create the containers. Start by changing these environment variables:
> [!TIP]
> If the variable is not set to empty quotes below, don't change it

```dotenv
NODE_ENV=production
PORT="" # Chosen port
HOST="0.0.0.0" # Listen on every interface
DATABASE_URL="" # Production url, see prisma docs for format
CONNECT_URL="https://auth.vatsim.net/oauth/authorize"
CONNECT_ID="" # VATSIM Connect Client ID
CONNECT_SECRET="" # VATSIM Connect Client Secret
TOKEN_URL="https://auth.vatsim.net/oauth/token"
USER_INFO_URL="https://auth.vatsim.net/api/user"
VATUSA_KEY="" # VATUSA API Key
SENTRY_AUTH_TOKEN="" # Optional: For Sentry.io
SENTRY_ORG="" # Optional: For sentry.io
SENTRY_PROJECT="" #Optional: For sentry.io
```

You can manually run:

```bash
docker compose up --build -d
```

Or setup a self hosted runner and let GitHub actions deploy it.
> [!NOTE]
> If you chose this option, make sure you setup your runner secrets in the repository settings

## Contributing
We use an abridged version of the [GitFlow Branching](https://nvie.com/posts/a-successful-git-branching-model/). In our case, develop is currently master since this entire repo is still in development and **NOT** production-ready
