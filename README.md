# HooraFlix

HooraFlix is a Vue 3 single-page application built with Vite. The application source, static assets, and frontend tooling are in `front-end/`.

## Contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Environment configuration](#environment-configuration)
- [Available commands](#available-commands)
- [Project structure](#project-structure)
- [API configuration](#api-configuration)
- [Optional local JSON server](#optional-local-json-server)
- [Production build and preview](#production-build-and-preview)
- [Troubleshooting](#troubleshooting)
- [Security notes](#security-notes)

## Requirements

Install the following before starting:

- **Git** — to clone the repository.
- **Node.js** — use an active LTS release (Node.js 20 or newer is recommended).
- **npm** — included with Node.js. Check with `node --version` and `npm --version`.

## Quick start

1. Clone the repository:

   ```bash
   git clone https://github.com/NGO-s-and-Others/AlpfaFlix-Frontend.git
   cd AlpfaFlix-Frontend
   ```

2. Move into the frontend project:

   ```bash
   cd front-end
   ```

3. Install the exact dependencies recorded in the lockfile:

   ```bash
   npm ci
   ```

   If you intentionally change dependencies, use `npm install` and commit the updated `package-lock.json`.

4. Create your local environment file from the safe template:

   **macOS / Linux**
   ```bash
   cp .env.example .env
   ```

   **Windows PowerShell**
   ```powershell
   Copy-Item .env.example .env
   ```

5. Open `.env` and replace the example values with the URLs for your own local or deployed backend. Do not commit this file.

6. Start the Vite development server:

   ```bash
   npm run dev
   ```

7. Open the local URL printed by Vite in your terminal. The Vite configuration uses port **5173** by default.

## Environment configuration

Vite reads frontend environment variables from `.env` files in the `front-end/` directory. Only variables prefixed with `VITE_` are exposed to browser code, so **never put passwords, private API keys, database credentials, signing secrets, or other server-only secrets in these variables**.

A starter template is provided at `front-end/.env.example`:

```dotenv
# Example URLs only. Replace them with the endpoints for your own environment.
VITE_APP_BASE_URL_LOCAL=http://localhost:8000
VITE_APP_BASE_URL_PRODUCTION=https://your-backend.example.com
```

- `VITE_APP_BASE_URL_LOCAL`: API base URL used when Vite runs in development mode.
- `VITE_APP_BASE_URL_PRODUCTION`: API base URL used when the app is built in production mode.

The production URL above is deliberately a placeholder, not a real project backend address. Set the correct value in your private local `.env` file or deployment environment.

After changing environment values, restart the development server or rebuild the application so Vite picks them up.

## Available commands

Run these commands from `front-end/`:

| Command | Description |
| --- | --- |
| `npm ci` | Install dependencies from `package-lock.json`. |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Project structure

```text
hooraflix/
├── README.md
├── .gitignore
└── front-end/
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    ├── db.json
    ├── assets/
    └── src/
        ├── Services/
        ├── components/
        ├── router/
        ├── store/
        └── views/
```

The repository currently contains the frontend application under `front-end/`. Configure and run the frontend from that directory.

## API configuration

The Vuex API client plugin reads the two Vite variables described above and creates an Axios client. Make sure the selected backend is running and that its API routes, CORS policy, and authentication behavior match what the frontend expects.

Some service code may contain its own example or placeholder endpoint. If you integrate that service, replace the placeholder with your own configuration rather than publishing a private backend address.

## Optional local JSON server

A small sample dataset is available in `front-end/db.json`. If you want to serve it for local experiments, open a second terminal, move to `front-end/`, and run:

```bash
npx --yes json-server@0.17.4 --watch db.json --port 3000
```

This is an optional mock-data helper; it is not part of the application's declared npm scripts and does not replace the actual backend. Configure your local API URL to match the service you are testing.

## Production build and preview

1. Set `VITE_APP_BASE_URL_PRODUCTION` to your own production API endpoint in the build environment.
2. Install dependencies with `npm ci`.
3. Build the frontend:

   ```bash
   npm run build
   ```

4. The generated static site is written to `front-end/dist/`.
5. Test the build locally:

   ```bash
   npm run preview
   ```

Deploy the contents of `dist/` to a static hosting provider configured to serve the SPA entry point (`index.html`) for client-side routes. Configure environment variables in the build pipeline; Vite values are embedded at build time.

## Troubleshooting

- **`npm ci` fails:** confirm you are inside `front-end/`, use a supported Node.js LTS version, and retry after checking network access.
- **The app cannot reach the API:** verify the selected `VITE_APP_BASE_URL_*` value, backend availability, API path, and CORS configuration. Restart Vite after editing `.env`.
- **Port 5173 is busy:** stop the process using that port or adjust the `server.port` setting in `vite.config.js`.
- **A route returns 404 after deployment:** configure the hosting provider to rewrite application routes to `index.html`.
- **The build fails:** review the first error in the terminal output and confirm all dependencies were installed with `npm ci`.

## Security notes

- `.env` files are ignored by Git; only the placeholder `.env.example` should be committed.
- Never paste real production URLs containing credentials, access tokens, or signed query parameters into the example file.
- Do not store secrets in `VITE_*` variables: frontend variables are visible to users in the built browser bundle.
- If a real credential was ever committed, removing the file in a new commit does not erase it from Git history. Revoke or rotate the exposed credential and review repository history.
