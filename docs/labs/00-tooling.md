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

##

### 2) Created the repo structure

Before creating the apps Vue and Nest, I created the root `package.json` and `pnpm-workspace.yaml`. 

With `package.json`, I can run repo wide scripts in the root directory. So, while the root package.json is for repo-wide scripts and tooling, the apps' package.json is for their own dependencies and scripts.

The pnpm workspace tells pnpm that web and api apps belong to one repo and should be managed together. This also makes it easier to share code between apps later, and pnpm keeps a single lockfile at the root for the whole workspace.

**Side Note:** After creating the `package.json` manually, I just realized I could create it with `pnpm init`.

##

### 3) Scaffolded the Vue and Nest


I wanted to keep the starters minimal. So, I only had the project skeleton including config files and supporting files needed to run the app.

Later, I've merged both apps' `.gitignore` files at the root.

##

### 4) Added linting and formatting

**A. `apps/web`**

For the frontend, I've decided to use a well known config, `@antfu/eslint-config`. This way I didn't need the prettier for formatting, I have the options `lint` and `lint:fix`. Fixing handles both formatting and the coding rules with antfu's config.

**B. `apps/api`**

For the backend, Nest provides both Prettier and ESLint already installed. So, I've decided to write a simple set of rules in the config file manually with the help of ChatGPT. After that the scripts `format` and `lint` were already there, so I added the `lint:fix` too, that auto fixes the problems ESLint can.

**C. `root`**

Once both apps had working local scripts, I added root scripts so the repo could act like one project from the terminal.

So now, in the root I can just do:

- `lint` and it would list the errors in both apps,
- `lint:fix` and it would fix the errors ESLint can in both apps,
- `format` and it would format only the backend (frontend is already formatted with fix)

So, the root scripts are orchestrating both apps.

##

### 5) Set up Husky and lint-staged

After linting and formatting were working, I added pre-commit checks so the repo could catch problems before a commit was created.

- Husky is just the hook runner,
- lint-staged package chooses commands based on staged file matches.

Here is how it works:

- I stage files and start a commit,
- Git runs the `pre-commit` hook,
- Husky then executes `pnpm exec lint-staged`,
- lint-staged checks the list of staged files, matches them against my configured patterns, and runs the related commands.

For example:

- If I stage a Vue file under `apps/web`, the web `lint:fix` command runs.
- If I stage a TypeScript file under `apps/api`, the API `lint:fix` and `format` commands run.

In my current setup, `lint-staged` matches staged files, but the commands I attached still run package-wide scripts. So once a staged file matches, the whole `apps/web` or `apps/api` lint/fix command can run, which is why a commit can fail because of another file in that app.

##

### 6) Set up commitizen and commitlint

After the pre-commit checks were done, I added a more structured commit workflow so commit messages would stay readable and consistent.

- Commitizen is for the interactive commit prompt,
- Commitlint is the validator for the commit message.

I've decided to use the **Conventional Commits** for the message format.

So, instead of `git commit -m "done some things"`, you run `git cz`, answer the questions and it generates the commit message. 

Later, the commitlint checks whether the final commit message follows the expected format, and it runs from Husky’s `commit-msg` hook.

#### So here is the new commit workflow:

1. I stage files with git,
2. I run `git cz`,
3. Commitizen asks me questions and builds the commit message,
4. Git starts the commit process,
5. Husky runs the `pre-commit` hook first.
6. If the pre-commit checks pass, Husky runs the `commit-msg` hook.
7. Commitlint checks whether the generated message follows the **Conventional Commits** format.
8. If everything passes, the commit succeeds.

**Side Note:** I globally installed the commitizen with this command:
```
npm install -g commitizen @commitlint/cz-commitlint
```
And to be able to use `git cz` command, I added the `.czrc` file with the path:
```json
{ "path": "@commitlint/cz-commitlint" }
```
##

### Summary

So, at the end of the Lab 0, I had:

- A pnpm workspace repo,
- A Vue web app in `apps/web`,
- A Nest API app in `apps/api`,
- Root orchestration scripts,
- lint/fix/format scripts for both apps,
- pre-commit hook automation,
- Commit message validation,
- Interactive commit message generation,
- A successful commit through the full hook flow.

##

### Sources:

- Vue Quick Start, https://vuejs.org/guide/quick-start

- Nest First Steps, https://docs.nestjs.com/first-steps

- pnpm Workspaces — https://pnpm.io/workspaces

- TypeScript ESLint Getting Started, https://typescript-eslint.io/getting-started/

- Antfu ESLint Config — https://github.com/antfu/eslint-config

- Take your Git workflow to the next level: Commitizen, Husky, and Commitlint in action, [https://medium.com](https://medium.com/@emmanuelguther/take-your-git-workflow-to-the-next-level-commitizen-husky-and-commitlint-in-action-9ab24c26a05f)

- Husky Get Started, https://typicode.github.io/husky/get-started.html

- Commitlint Local Setup, https://commitlint.js.org/guides/local-setup.html

- Commitizen, https://github.com/commitizen/cz-cli

