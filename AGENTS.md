    # AGENTS.md

Two independent apps live in this repo — there is no root-level build. Run app commands from inside `backend/` or `frontend/`, never from the root (root `package.json` only pulls the graphify tool).

## Product

Jalur ("path"/"track") is a career-preparation and career-guidance app. Flow: **Assessment → Career DNA / matches → Personalized Roadmap → Action Plan → Career Preparation**, with optional interview preparation and AI/copilot features. Currently alpha.

- Settled product and scope decisions live in `JALUR_DECISION.md` — read it before making product calls.
- UI/design token specification: `DESIGN.md`.
- Brainstorming partner prompt: `.opencode/agents/jalur-brainstorm.md`.

## Layout

- `backend/` — Laravel API (PHP 8.3, Laravel ^13, Sanctum, SQLite). Read `backend/AGENTS.md` (Laravel Boost guidelines) before touching backend code.
- `frontend/` — React SPA (Vite, React Router v7, Tailwind v4, shadcn/ui). No SSR; talks to the backend via JSON API.

## Run the app (two processes)

- Backend: `cd backend && composer run dev` (first time: `composer install && composer run setup`, then seed with `php artisan migrate --seed`).
- Frontend: `cd frontend && npm install && npm run dev` (Vite on :5173; `@` aliases `src/`).

## Frontend ↔ backend contract

- `frontend/src/services/api.js` hardcodes the API base `http://127.0.0.1:8000/api` and the auth token key `jalur_token` (localStorage). No env override or Vite proxy — update this file if the API port changes.
- Endpoint source of truth is `backend/routes/api.php` (routes under `auth:sanctum` require a token).
- 401 responses clear the token and force a page reload.

## Checks

- Backend: `php artisan test --compact` (single test: `--filter=testName`), format with `vendor/bin/pint --dirty --format agent` after PHP edits.
- Frontend: no test or lint config — validate with `npm run build`.

## Gotchas

- Two separate Vite projects exist: the frontend SPA and backend's own Vite for its Blade welcome page; don't mix them.
- `frontend/dist/index.html` is committed — build output is checked in.
- shadcn/ui components live in `frontend/src/components/ui/` (cva + clsx + tailwind-merge); model new ones on existing siblings.
- Seed data includes demo users `jeremia@example.com` and `robby@example.com`, both with password `password`.