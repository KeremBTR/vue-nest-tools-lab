# Vue-Nest-Tools

A lab based full-stack learning repository built with **Vue 3** and **NestJS**.

The project is documented lab by lab under `docs/labs/`, with each lab focused on a specific part of the stack and its setup. The root `README.md` stays as the main repository overview, while the detailed notes, decisions, and takeaways for each step live in the lab docs.

## Getting started

I will write the complete setup once the project is finished.

But for the exact setup, run steps, and notes for each stage, check the relevant lab document under `docs/labs/`.

## Labs

### Lab 0 — Tooling foundation

Lab 0 sets up the base development workflow for the repository.

It covers:

- Vue 3 + Vite Scaffold
- NestJS Scaffold
- TypeScript
- pnpm workspaces
- ESLint
- Prettier
- Husky
- lint-staged
- commitlint
- Commitizen

Documentation:

- [Lab 0 - Tooling](./docs/labs/00-tooling.md)

### Lab 1 — Routing

Lab 1 introduces frontend routing with Vue Router and sets up the first page-level navigation for the project.

It covers:

- Vue Router
- route based navigation
- route params
- navigation links

Documentation:

- [Lab 1 - Routing](./docs/labs/01-routing.md)

### Lab 2 — Query Basics

Lab 2 introduces TanStack Query and uses it on the Directory page as the first server-state example in the frontend.

It covers:

- TanStack Query
- VueQueryPlugin setup
- useQuery
- query keys
- loading, error, and success states
- basic caching behavior

Documentation:

- [Lab 2 - Query Basics](./docs/labs/02-query-basics.md)

### Lab 3 — Mutations and Invalidation

Lab 3 adds the first write operation to the frontend and connects it back to the cached query from Lab 2.

It covers:

- `createProfile()`
- `useMutation`
- mutation state
- query invalidation
- refreshing related query data after a successful write

Documentation:

- [Lab 3 - Mutations and Invalidation](./docs/labs/03-mutations-invalidation.md)

### Lab 4 — Client State with Pinia

Lab 4 introduces shared client-side UI state with Pinia and keeps it separate from the server-state flow already handled by TanStack Query.

It covers:

- Pinia setup
- setup-style stores
- shared UI state
- create section visibility
- toast state
- the difference between local state, client state, and server state

Documentation:

- [Lab 4 - Client State with Pinia](./docs/labs/04-client-state-pinia.md)
