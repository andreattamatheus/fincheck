# FINCHECK

<p align="center">
  Fincheck is a personal finance control application. Create Bank Accounts, Transactions and Categories to manage your income and expenses.
  <img src="https://i.imgur.com/STaFeCm.png" alt="Presentation" />
</p>

## Technologies used

<img src="https://skillicons.dev/icons?i=html,css,javascript,typescript,docker,git,prisma,nodejs,nestjs,react,vite,tailwindcss" width="415px" alt="Technologies" />

The design is available on [Figma](https://www.figma.com/file/RRBEBWgyQZbEYPQhzOc1OQ/Fincheck).

## Running the app (Back End)

- First, clone the repo.

```bash

```

- Let's setup our API, first enter in /api folder.
- Install the dependencies (I used yarn but you can use whatever you want, just make the changes)

```bash
yarn
```

- Fill the .env variables (In .env.example you can see them)

- Run PostgreSQL with Docker

The database can be launched locally with a [Docker Container](https://www.docker.com/resources/what-container/).

Check the official documentation to install the [Docker Engine](https://docs.docker.com/engine/install/ubuntu/).

```bash
docker compose up -d
```

- Run migrations

```bash
npx prisma migrate dev
```

## Running the app (Front End)

- Make sure you are inside /client folder
- Install dependencies

```bash
yarn
```

- Fill the .env variables (In .env.example you can see them)
