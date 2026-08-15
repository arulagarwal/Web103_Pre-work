# WEB103 Prework - *Creatorverse*

Submitted by: **Arul Agarwal**

About this web app: **A single-page React app for cataloging your favorite content creators. Browse them as a card grid, open any creator at their own URL for full details, and add, edit, or delete creators — all persisted to a Supabase Postgres database.**

Time spent: **TODO** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()** *(via the Supabase JS client, which uses `fetch` under the hood)*
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, URL, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, URL, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, URL, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='600' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/)

## Notes

Three things cost more time than expected, all of them silent failures rather than errors:

**Postgres folds unquoted identifiers to lowercase.** Writing `imageURL text` in a migration creates a column actually named `imageurl`. The DDL succeeds, the dashboard looks correct, and then `creator.imageURL` reads as `undefined` on every row with nothing logged anywhere. The column has to be double-quoted as `"imageURL"` in the SQL to preserve its casing.

**Supabase now enables Row Level Security by default on new tables.** A table with RLS on and no policies is not an error — it just returns an empty array to the anon key. The homepage rendered its "no creators yet" empty state against six rows that were sitting in the database the whole time.

**The Vite starter's `.gitignore` does not ignore `.env`.** It only covers `*.local`. Since this repo holds real Supabase credentials, `.env` and `.env.*` had to be added explicitly before the first commit — after a commit, removing a secret from git history is much harder than keeping it out in the first place.

## Tech Stack

| Layer | Choice |
|---|---|
| Build tool | Vite 8 |
| UI | React 19 |
| Routing | React Router 7 (`useRoutes`) |
| Styling | PicoCSS 2 |
| Database | Supabase (Postgres 17) |
| Migrations | Supabase CLI |

## Getting Started

```bash
git clone https://github.com/arulagarwal/Web103_Pre-work.git
cd Web103_Pre-work
npm install
```

Credentials are not committed, so create your own `.env`:

```bash
cp .env.example .env
```

Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase dashboard under **Project Settings → API Keys**. Use the anon / publishable key — never the `service_role` secret key. Then:

```bash
npm run dev
```

To recreate the database schema and seed data in your own Supabase project:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## Architecture Decisions

**Detail pages fetch their own record rather than filtering a list passed down from a parent.** A prop-drilled array is empty on first render, so loading `/creators/3` directly in a fresh tab — or just refreshing the page — would read `undefined` and crash. Since "each content creator has their own unique URL" is a graded requirement, that URL has to survive being pasted into a new tab.

**Refetch after mutating, rather than optimistic updates.** Navigating back remounts the destination page, whose `useEffect` refetches. This is slightly slower but it proves the write actually persisted, and it avoids needing rollback logic when a write fails.

**Supabase calls live in `src/services/creators.js`, not inline in each page.** All five CRUD calls sit in one file with consistent `throw`-on-error handling, so pages deal with UI state and nothing else.

**Credentials come from environment variables.** Vite inlines only `VITE_`-prefixed variables into the browser bundle, so the database password is deliberately stored without that prefix — it is used by the Supabase CLI locally and never ships to the client.

**Fetch-by-id uses `.maybeSingle()` rather than `.single()`.** `.single()` raises `PGRST116` when no row matches, which would turn a mistyped URL into a thrown exception instead of a clean "creator not found" page.

## License

Copyright 2026 Arul Agarwal

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
