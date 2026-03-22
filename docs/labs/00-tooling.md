# Lab 0 — Tooling and Setup

## Goal

The goal of Lab 0 was to build the project foundation before touching real app features.

This lab was about setting up a clean fullstack workspace, adding code-quality tooling, and creating a cleaner Git workflow with structured commit messages and pre-commit hooks. The idea was to make the repo stable and organized early, so future labs would not become messy. By the end of this lab, the repo had:

- a Vue frontend in `apps/web`
- a NestJS backend in `apps/api`
- a pnpm workspace at the repo root
- working lint and format commands
- pre-commit and commit-message checks
- a structured local Git workflow

This lab was intentionally not about UI or API features yet. It was about creating a stable base for everything that comes after.

---

At the end of Lab 0, the repo looked roughly like this:

```text
vue-nest-tools-lab/
  apps/
    web/
    api/
  packages/
  docs/
    labs/
      00-tooling.md
  package.json
  pnpm-workspace.yaml
  pnpm-lock.yaml
  commitlint.config.mjs
  .gitignore
  .czrc
  .nvmrc
  .husky/
    commit-msg
    pre-commit
```

- `apps/web` = the frontend
- `apps/api` = the backend
- `docs/labs` = the learning archive for each lab so this meme doesn't happen:

  <img src="../cat_meme.png" width="300">


## What I did in order

### 1) Prepared the environment

Before creating the apps, I:
- configured git
- installed `nvm`
- chose Node `22.12.0`
- added .nvmrc to pin the Node version for the repo
- installed pnpm, and enabled it through Corepack

To prevent version mismatch in the future, I pinned the Node version.

### 2) Created the repo structure

Before creating the apps Vue and Nest, I created the root `package.json` and `pnpm-workspace.yaml`. 

With `package.json`, I can run repo wide scripts in the root directory.

The pnpm workspace tells pnpm that web and api apps belong to one repo and should be managed together. Also, I can share interfaces in both apps, also pnpm creates one master lockfile at the root so if there are overlapping tools, they share it.

### 3) Scaffolded the Vue app
