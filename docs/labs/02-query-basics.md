# Lab 2 — Query Basics

## Goal

This lab was about taking the Directory page one step further and making it behave like it was driven by server data instead of only static content.

In Lab 1, the page mostly existed to help test routing and dynamic route params. In this lab, the goal was to introduce **TanStack Query** into the Vue app and use it on a real page in a small, focused way.

By the end of the lab, the app should have:

- TanStack Query installed and registered
- a getProfiles() client-side function in the web app
- useQuery working on the Directory page
- loading, error, and success states rendered properly
- the profile links from the Directory page still working with the existing route setup

This lab mattered because it was the first real step from static pages into server-state thinking.

##

## What I did in order

### 1) Installed TanStack Query in the web app

Inside `apps/web`, I installed the Vue version of TanStack Query.

After that, I registered it in `main.ts` as part of the app startup flow. Since Vue Router was already registered there from Lab 1, TanStack Query became another plugin added into the same setup.

That part was a useful reminder that some libraries in Vue are not just imported where they are used. They first need to be installed into the app, and then components can use their features after that.

##

### 2) Clarified what getProfiles() should actually be

Before writing the query itself, I had to understand what kind of thing `getProfiles()` was supposed to be.

The important point here was that `getProfiles()` is not a component and not a composable. It is just a plain TypeScript function inside the frontend app.

I decided to keep it under `src/services` in the web app.

That made the separation much easier to understand:

- `apps/api` is still the real backend side for later labs,
- `apps/web/src/services` is the frontend side where the Vue app keeps functions that ask for data.

So, the Directory page does not need to know how the data is obtained. It only needs to ask for profiles. That separation already feels useful even though the data is still local for now.

##

### 3) Created the profiles service

Inside `src/services/profiles.ts`, I created:

- a Profile interface
- a small mockProfiles array
- a delay helper (to see the state change)
- a shouldFail switch (to test out the failing case)
- the async getProfiles() function

The purpose of this file was to make the page work with something that behaves like a real async request without touching the backend yet.

The delay was useful because it made the loading state visible. The shouldFail switch was also helpful because it gave me a simple way to test the error state without needing a real broken API.

The real backend work will be added in a later lab.

##

### 4) Replaced the static Directory page with a query

Once the service file was ready, I updated `PageDirectory.vue`.

Instead of only showing static content and hardcoded profile links, the page now uses `useQuery` with:

- a profiles query key,
- getProfiles() as the query function,
- retry turned off for this lab (if it's on default retry number is 3).

From there, the page renders three states:

- loading
- error
- success

In the success state, the returned profiles are shown as links that still route into the dynamic profile page from Lab 1.

That part was nice because the Directory page stopped feeling like a placeholder route and started feeling more like an actual app page.

##

### 5) Tested the behavior properly

After wiring everything up, I tested the page in a few different ways.

First, I tested the normal success flow:

- reloading the page showed the loading state first,
- after the delay, the profiles list appeared,
- the profile links routed correctly into the existing profile page.

Then I tested what happened when navigating away and coming back without a full page reload.

That was one of the most useful moments in the whole lab, because I could actually feel the caching behavior in the UI. The list appeared immediately instead of going through the same visible loading step again.

Finally, I tested the error state by changing shouldFail and confirmed that the page displayed the error branch correctly.

##

## What became clearer in this lab

- TanStack Query runs the provided async function, tracks its request state, stores the result under a query key, and gives the component a cleaner way to render the returned data.

- The query key is the unique label TanStack Query uses to identify, store, and look up a specific piece of server data in its cache.

- The query key is important because it lets TanStack Query know which cached result belongs to which query, and it is also what makes later cache updates, refetching, and query matching possible.

- Server state includes request lifecycle concerns such as loading, error, success, caching, and refetching behavior.

- TanStack Query is useful here because it manages those server-state concerns while the page focuses on rendering the result.

##

## Result at the end of the lab

By the end of Lab 2, the frontend had:

- TanStack Query installed in `apps/web`
- VueQueryPlugin registered in `main.ts`
- a profiles service in `src/services/profiles.ts`
- a working `getProfiles()` function
- PageDirectory.vue using `useQuery`
- loading, error, and success states working
- profile links still routing correctly into the existing profile page
- visible caching behavior when navigating away and coming back

So, the Directory page is no longer just a static page used for route testing. It is now the first page in the project that behaves like it is driven by server data.

##

## Summary

Lab 2 was the first real move from static pages into data-driven UI.

The practical result was getting TanStack Query working in the Vue app and using it on the Directory page through a separate profiles service.

The main conceptual result was understanding the relationship between three parts:

- the service function returns data,
- `useQuery` manages that async server state,
- the page focuses on rendering the result.

That separation made the whole flow much easier to follow, and it also sets up the project nicely for later labs when the local data is replaced with real API calls.

##

### Sources:

- TanStack Query - Vue Installation, 
    https://tanstack.com/query/latest/docs/framework/vue/installation

- A guide to async/await in TypeScript, 
    https://blog.logrocket.com/async-await-typescript/#introduction-to-async-await-in-typescript

- TanStack Query - Query Basics, 
    https://tanstack.com/query/latest/docs/framework/vue/guides/queries
