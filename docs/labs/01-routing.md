# Lab 1 - Routing

## Goal

The goal here was to add client side routing with Vue Router and understand the basics properly before moving into real app features. By the end of the lab, the web app should have:

- a home page at `/`
- a login page at `/login`
- a directory page at `/directory`
- a dynamic profile page at `/profile/:id`
- a NotFound route for unknown URLs

The main ideas behind this lab were:

- how a Vue SPA switches pages without a full browser reload
- how route params work
- how to keep the route structure clean and simple
- how to separate app level navigation from actual page content

This lab was intentionally kept small. The point was to understand routing itself, not to start building auth, fetching data, or profile features too early.

##

## What I built

Inside `apps/web`, I added Vue Router and wired the app so that it could render multiple pages based on the URL.

The final route setup included:

- `/` → Home page
- `/login` → Login page
- `/directory` → Directory page
- `/profile/:id` → Profile page
- `/:pathMatch(.*)*` → NotFound page

I also added navigation in `App.vue`, and the directory page now links to example profile pages so that the dynamic route can be tested from inside the app instead of only by typing URLs manually.

##

## What I did in order

### 1. Installed Vue Router in the web app

I added Vue Router inside `apps/web` with:

    pnpm add vue-router@4

This reinforced a workspace point from Lab 0:

- the dependency gets added to `apps/web/package.json`
- the lockfile is still updated at the repo root

So even though I installed the package from inside `apps/web`, the workspace-level lockfile still changed at the root, which is expected.

##

### 2. Created the route-level pages first

Before touching the router config, I created the page components under `src/pages`.

For this lab, they were kept intentionally simple. Each page just started with a basic heading so I could focus on routing behavior first.

The pages I created were:

- `PageHome.vue`
- `PageLogin.vue`
- `PageDirectory.vue`
- `PageProfile.vue`
- `PageNotFound.vue`

This helped keep the router setup straightforward, because I was connecting real page components instead of planning routes abstractly.

Also, for the project structure, I am planning to use `Atomic Design: Scalable Component Organization`, the details can be found in [sources](#sources).

##

### 3. Created the router in `src/router/index.ts`

After the page files existed, I created `src/router/index.ts` and defined the route table there.

At that point, the router file became the central place that described how URLs map to pages.

The final routes ended up like this:

- home
- login
- directory
- profile
- not-found

I started with path-based routes only, and later cleaned them up by adding route names as well.

That made the setup a bit nicer because navigation no longer had to rely only on hardcoded path strings. Named routes also made the intent of each route clearer.

##

### 4. Registered the router in `main.ts`

Once the router existed, I connected it to the Vue app in `main.ts`.

This was the point where the app became router aware. Before that, the router file was just configuration sitting on its own. After registering it with the app, route matching and navigation actually became active.

##

### 5. Added the app shell in `App.vue`

After wiring the router into the app, I updated `App.vue` to act as the shell for the frontend.

The job of `App.vue` in this lab was simple:

- show the app title
- render top-level navigation
- render the current route content with `RouterView`

The top-level nav ended up linking to:

- Home
- Login
- Directory

The final version of `App.vue` for now is: a small title, a few main navigation links, and the routed page content underneath.

##

### 6. Used the profile page to learn route params

The main dynamic route in this lab was:

`/profile/:id`

This showed that one page component can handle many different URLs depending on the param.

To make that visible immediately, I updated the profile page so that it displayed the current route param in the heading.

So if the URL is:

- `/profile/123`

the page shows that it is the profile page for `123`.

That made the idea of dynamic route matching much easier to understand in practice.

##

### 7. Used the directory page as the entry point into profile routes

Originally, the directory page was just a simple page with a heading. After the basic routing worked, I made it more useful by adding links to example profiles.

So `/directory` now links to pages like:

- `/profile/123`
- `/profile/456`

This ended up being a better structure than keeping a direct profile link in the top nav.

The top nav now represents the main app sections, while the directory page is the place where profile links live. That separation feels much cleaner and makes the route flow more natural.

##

## Notes

### `RouterLink` vs normal links

One of the main goals of the lab was understanding navigation without a full page reload.

Using `RouterLink` made that visible pretty quickly. When I clicked between pages:

- the layout stayed in place
- the content inside the routed area changed
- the browser URL updated
- it did not behave like a full refresh

That is the main SPA routing behavior this lab was supposed to teach.

### What `createWebHistory()` means here

Another useful thing from this lab was understanding why `createWebHistory()` fits this project.

For this app, it means the browser URL and the routed content stay in sync during normal navigation, so the app behaves like a proper browser based SPA instead of only changing route state internally.

That also made the app behavior much easier to reason about while testing the routes manually.

##

## Final result

By the end of this lab, the frontend routing setup was working the way I wanted.

The app now has:

- a working Vue Router setup
- clean top-level navigation
- named routes
- a dynamic profile route using `:id`
- a directory page that links into example profiles
- a NotFound page for unknown routes

I also manually tested the important cases:

- navigating between pages from the app
- opening profile pages with different ids
- visiting fake URLs like `/oops/i-did-it-again` or invalid nested paths
- confirming that unknown routes render the NotFound page

That was enough to consider the Lab 1 implementation complete.

##

## Summary

Lab 1 was mainly about making the frontend feel like a real SPA and getting comfortable with Vue Router before building anything more advanced.

The biggest takeaways were:

- route setup is simple once the pages exist
- `RouterView` gives the app a clean content outlet
- `RouterLink` handles navigation without full reload
- route params make dynamic pages possible
- `createWebHistory()` keeps the browser URL in sync during normal SPA navigation

##

### Sources:

- Vue Router - Installation, https://router.vuejs.org/installation

- Atomic Design: Scalable Component Organization, https://alexop.dev/posts/how-to-structure-vue-projects/#2-atomic-design-scalable-component-organization

- Vue Router - Guide, https://router.vuejs.org/guide/

- Vue Router - Named Routes, https://router.vuejs.org/guide/essentials/named-routes

- Vue Router - Different History Modes, https://router.vuejs.org/guide/essentials/history-mode