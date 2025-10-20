# SP25 Web Server Programming — Course Project

This repository contains a small full-stack web project used for the SP25 Web Server Programming course. It demonstrates a simple Express-based JSON API (server/) and a Vue 3 single-page application (client/) that consumes that API. The project was used to teach and explore backend concepts such as routing, controllers, JSON data modeling, CORS, static asset serving, and basic environment configuration — together with a modern frontend development workflow (Vite + Vue 3 + TypeScript checks).

## Contents

- `server/`: Express server, controllers, and small JSON-backed models used by the API
- `client/`: Vue 3 single-page application built with Vite (development and production build)
- `data/`: example JSON data files used by server-side models

## Goals

- Provide a minimal example of a server + client app that can be run locally
- Show how to structure controllers and models for small projects
- Demonstrate building a frontend with Vite and deploying it as static files served by the Express server

## Tech stack

- Server: Node.js + Express
- Client: Vue 3, Vite, TypeScript type-checking (via `vue-tsc`)
- Other: `dotenv` for configuration, `@supabase/supabase-js` included for potential integrations

## Quick start (PowerShell)

1) Install dependencies

```powershell
# from repository root
pnpm install

# optional: install client dependencies separately
cd client
pnpm install
cd ..
```

2) Run a development server

```powershell
# start the server (auto-restarts with nodemon when files in server/ change)
pnpm run dev

# in a separate terminal, run the client dev server for hot-reload frontend work
cd client
pnpm run dev
```

3) Build the client for production and serve it from Express

```powershell
# build the client assets
pnpm --prefix ./client run build

# serve the production build using the server static middleware
pnpm start
```

## Notes about scripts

- Root `package.json` exposes:
  - `start` -> `node server/index.js` (serves the built client `dist` directory and the API)
  - `dev` -> `nodemon server/index.js --watch server`
  - `build: client` -> runs the client build script from the root
- Client `package.json` includes Vite dev, build, preview and type-checking scripts

## Configuration / environment variables

- The server reads environment variables via `dotenv`.
- Example environment variables used in the project:
  - `PORT` — port the Express server listens on (default `8000`)
  - `BEST_CLASS` — example variable printed to the console when server starts (set for demo)
- Create a `.env` file in the repository root to override defaults. Example:

```text
PORT=8000
BEST_CLASS=SP25_Web_Server_Programming
# Add any Supabase keys or other secrets here if you integrate with a remote service
# SUPABASE_URL=...
# SUPABASE_KEY=...
```

## Project structure (high level)

- `server/`
  - `index.js` — Express app entry point
  - `controllers/` — route handlers (products, users)
  - `models/` — small model wrappers around JSON or Supabase
- `client/`
  - `src/` — Vue components and pages
  - `public/` — static assets for the client app

## API surface (examples)

- GET `/api/v1/products` — returns product list
- GET `/api/v1/products/:id` — product by id
- GET `/api/v1/users` — returns user list

Endpoints are implemented in `server/controllers` and use `server/models` for data.

## Development tips

- Use the client dev server (`pnpm --prefix ./client run dev`) while developing UI — it supports hot module replacement and faster iteration.
- Use `pnpm run dev` at the repo root to run the Express server with automatic restarts (nodemon).
- The server currently allows CORS from any origin for ease of development. Be careful to lock this down for production apps.
