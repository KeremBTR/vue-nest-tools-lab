# Lab 4 — Client State with Pinia

## Goal

The goal of Lab 4 was to add shared client-side state to the Vue app with Pinia.

In the previous labs, the Directory page had already started behaving like a real data-driven page. Lab 2 introduced TanStack Query for reading profiles, and Lab 3 added profile creation with `useMutation` and query invalidation.

This lab added another layer to the frontend: shared UI state.

By the end of this lab, the app had:

- Pinia installed and registered
- a setup-style Pinia store
- shared UI state for the create profile section
- shared UI state for a toast message
- a small `AppToast.vue` component that reads from the store
- `PageDirectory.vue` using the UI store together with the existing query and mutation flow

The main result of the lab was making the state boundaries clearer inside the page:

- local refs for temporary form input
- TanStack Query for profile data and mutation flow
- Pinia for shared UI behavior

##

## What I did in order

### 1) Installed Pinia in the web app

I started by installing Pinia inside `apps/web`.

Pinia is the state management library I used in this lab for shared client-side UI state. In the current app, that mainly means things like:

- whether the create profile section is open
- whether there is a toast message to show

This made Lab 4 the first point where the frontend had three different state layers working together:

- local component state
- TanStack Query state
- Pinia state

That separation became one of the main takeaways of the lab.

##

### 2) Registered Pinia in `main.ts`

After installing Pinia, I registered it in the Vue app through `main.ts`.

That follows the same general pattern as Vue Router and TanStack Query. The plugin needs to be installed into the app first, and then components can use the related features after that.

At this point, the frontend app had these main plugins set up together:

- Vue Router
- TanStack Query
- Pinia

So the app was now ready to use stores from any component that needed shared client-side state.

##

### 3) Created a setup-style UI store

Next, I created a new store file:

`src/stores/ui.ts`

For the store style, I decided to use a setup-style Pinia store instead of an option-style one.

That fit the rest of the Vue app better because the project is already using the Composition API style with `<script setup>`.

In the store:

- `ref()` values act as the store state
- functions act as the store actions
- returned values are exposed to components

The UI store ended up holding two pieces of state:

- `isCreateProfileModalOpen`
- `toastMessage`

And four actions:

- `openCreateProfileModal()`
- `closeCreateProfileModal()`
- `showToast()`
- `clearToast()`

I also kept comments inside the store so the setup-store structure would stay easy to read while learning it.

The store stayed intentionally small and focused on this lab’s shared UI behavior.

##

### 4) Kept the form input values local

After creating the store, I kept the create form input values as local refs inside `PageDirectory.vue`.

That means the current form fields, like:

- `name`
- `bio`

still belong to the page itself while the user is typing.

This part was important because it made the page’s state structure cleaner:

- local refs handle the temporary form values
- TanStack Query handles reading and writing profile data
- Pinia handles shared UI behavior

So instead of moving everything into one place, the page now uses different state tools for different jobs.

##

### 5) Used Pinia to control the create profile section

Once the store existed, I used it in `PageDirectory.vue`.

The create profile section is now controlled by the store state `isCreateProfileModalOpen`.

The page shows the “Create new profile” button only when the section is closed.

When the button is clicked, it calls `openCreateProfileModal()` and the section becomes visible.

When the user clicks Cancel, it calls `closeCreateProfileModal()` and hides the section again.

I also adjusted the template so the create button is hidden while the section is already open. That made the page feel cleaner, because it no longer shows the open button and the open section at the same time.

This was a simple change, but it made the Pinia state easy to see directly in the UI.

##

### 6) Connected the mutation success flow to the UI store

The profile creation mutation from Lab 3 stayed in `PageDirectory.vue`.

That part still belongs to TanStack Query because it handles the write operation for profile data.

After the mutation succeeds, the page now does a few things in order:

1. invalidates the `['profiles']` query
2. resets the local form refs
3. closes the create profile section through Pinia
4. stores a success toast message through Pinia

That success flow made the page structure clearer.

The mutation still handles the profile create flow.

The local refs still handle the temporary form values.

And Pinia now handles the shared UI updates that happen after a successful create.

##

### 7) Chose where the toast should render

After adding toast state to the UI store, I needed to decide where the toast should actually render.

One reasonable option was to render it in `App.vue`, since `App.vue` acts as the app shell and stays mounted while route pages change.

That would have made the toast feel more global.

But after trying the layout, the placement in `App.vue` did not feel right for this project. Visually, it looked awkward between the navigation and the routed page content.

So I changed the final implementation and moved the toast rendering into its own small component instead.

##

### 8) Created `AppToast.vue`

To improve the placement, I created:

`src/components/AppToast.vue`

This component reads from the same UI store directly.

Its job is simple:

- if `toastMessage` exists, show it
- when Dismiss is clicked, call `clearToast()`

This kept the toast logic small and easy to follow.

It also preserved the main Pinia lesson in a cleaner way:

- `PageDirectory.vue` triggers the toast by calling `showToast()`
- `AppToast.vue` reads the message from the same store and displays it
- no props are passed between them
- no custom events are used between them

So the shared state still comes from Pinia, but the visual placement became much better.

##

### 9) Placed `AppToast` in the Directory page

After creating `AppToast.vue`, I imported it into `PageDirectory.vue` and placed it near the create profile flow.

The final page order became roughly:

- Directory heading
- Create new profile button
- toast message, when present
- create profile section, when open
- profiles list

That placement felt much more natural than keeping the toast in `App.vue`.

It also made the page easier to read while still keeping the Pinia example clear.

##

### 10) Kept `App.vue` simple

After moving the toast rendering into `AppToast.vue`, `App.vue` stayed simple again.

It only contains:

- the app title
- the top-level navigation
- the routed page content through `RouterView`

That felt like the better final structure for this lab.

`App.vue` still acts as the app shell, but it is not carrying the toast markup directly anymore.

##

### 11) Tested the final behavior

After everything was wired together, I tested the Directory page again.

The final behavior is:

- the create profile button is visible at first
- clicking it opens the create profile section
- while the section is open, the create button is hidden
- clicking Cancel closes the section
- creating a profile runs the existing mutation
- after success, the profiles query is invalidated
- the form values reset
- the create section closes
- the toast appears
- clicking Dismiss clears the toast

This confirmed that Pinia is handling the shared UI state correctly while TanStack Query still handles the profile data flow.

##

## What became clearer in this lab

The biggest thing that became clearer in this lab was the difference between the different state layers inside the page.

The Directory page now uses:

- local refs for temporary form input
- TanStack Query for profile data and mutation flow
- Pinia for shared UI behavior

That made the page easier to reason about because each state tool now has a more specific role.

Another useful point was that a store and a reusable component are not the same thing.

A component controls how something renders.

A store controls shared state.

In this lab:

- `AppToast.vue` handles the toast display
- `useUiStore` holds the toast message and exposes the action to clear it

So the component is the UI layer, while the store is the shared state layer behind it.

That separation made the overall design much easier to understand.

##

## Result at the end of the lab

By the end of Lab 4, the frontend had:

- Pinia installed in `apps/web`
- Pinia registered in `main.ts`
- a setup-style UI store in `src/stores/ui.ts`
- shared state for the create profile section
- shared state for the toast message
- `PageDirectory.vue` using the UI store
- `AppToast.vue` reading from the same UI store
- the create profile section opening and closing through Pinia
- a success toast showing after profile creation
- the existing profiles query and mutation flow still handled by TanStack Query
- form input values still kept as local refs

So the Directory page now uses the right state tools for different responsibilities instead of forcing everything into one pattern.

##

## Summary

Lab 4 introduced Pinia as the client-state tool for the Vue app.

The practical result was adding a small setup-style UI store and using it to control the create profile section and success toast.

The main conceptual result was understanding the page’s state boundaries more clearly:

- local refs handle temporary form input
- TanStack Query handles profile reads and writes
- Pinia handles shared UI state

The final flow is:

1. the Directory page creates a profile with the existing TanStack Query mutation
2. the mutation invalidates the profiles query after success
3. the local form refs are reset
4. the Pinia UI store closes the create profile section
5. the Pinia UI store stores the toast message
6. `AppToast.vue` reads the toast message and displays it

This made the frontend structure more complete without making the lab too heavy.

##

### Sources:

- Pinia - Getting Started, https://pinia.vuejs.org/getting-started.html

- Pinia - Core Concepts, https://pinia.vuejs.org/core-concepts/

- Introduction To Pinia | Vue 3, https://youtu.be/gwcca_zd4IE?si=t26ix1WqQ_sRS9ta
