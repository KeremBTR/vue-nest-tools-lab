# Lab 3 — Mutations and Invalidation

## Goal

This lab was about adding the first mock write operation to the frontend and understanding how that write connects back to the cached query from Lab 2.

In Lab 2, the Directory page became query-driven with `useQuery` and `getProfiles()`. That gave the page loading, error, success, and caching behavior for reading data. In this lab, the goal was to take the next step and make the page capable of creating a new profile as well.

By the end of the lab, the app should have:

- a `createProfile()` function in the frontend service layer
- a simple create profile form on the Directory page
- `useMutation` wired to that form
- the profiles query invalidated after a successful create
- the updated list shown again on the Directory page without manually refreshing the UI

##

## What I did in order

### 1) Added create function the profiles service

I stayed with the same frontend service structure from Lab 2 and updated `src/services/profiles.ts`.

That file already had:

- the `Profile` interface
- the mock profiles array
- the `delay()` helper to see pending state
- `getProfiles()`

For this lab, I added:

- a `CreateProfileInput` interface
- a `createProfile()` function
- a `createFail` switch to test the mutation error state

It is just another plain TypeScript function that the page can call through TanStack Query.

The new function takes the user input, waits through the same temporary delay, optionally throws an error if I want to test the failure path, creates a new profile object, pushes it into the local mock array, and returns that created profile.

That made the service layer capable of both:

- reading profiles
- creating profiles

Even though the implementation is still temporary and frontend local, the overall structure already feels useful because later the inside of these functions can change while the page level query and mutation flow stays mostly the same.

##

### 2) Added simple local form state in the Directory page

Before wiring the mutation itself, I needed a place to hold the form input values.

For this lab, I kept it simple and used two refs in `PageDirectory.vue`:

- one for `name`
- one for `bio`

Then I connected them to the inputs with `v-model`.

That was enough for this lab. I only needed a small, local form so I could focus on the mutation flow itself for this lab.

This was also a useful separation point:

- the refs store the current form input
- the mutation uses those values when the user submits
- the service function receives the submitted data and creates the new profile

##

### 3) Added `useMutation` to the Directory page

Once the form state existed, I added the mutation setup in `PageDirectory.vue`.

I imported:

- `useMutation`
- `useQueryClient`

The query client became important here because the lab was not only about creating data, but also about invalidating the related query after success.

Then I created the mutation with `useMutation()` and used `createProfile` as the `mutationFn`.

This part made the core mutation flow much clearer.

`createProfile()` is still the function that actually creates the profile. TanStack Query does not replace that function. Instead, it helps the page manage the mutation by tracking states like pending, error, and success, and by letting me run follow up logic such as query invalidation after the create succeeds.

So to put it simply:

- `mutationFn` = the actual async function that performs the write
- `mutate(...)` = the function I call later to trigger that write

Instead of calling `createProfile()` directly from the template, I registered it inside `useMutation`, and then I used `mutate(...)` from a submit handler to run it with the current form values.

That made the write flow feel much cleaner and more structured.

##

### 4) Connected form submission to the mutation

After creating the mutation, I added a submit handler in the page.

The form uses `@submit.prevent` and calls that handler. Inside the handler, I call `mutate(...)` with:

- `name`
- `bio`

This is the point where the input from the page gets passed into the mutation and then into `createProfile()`.

So, the flow is like:

- the page collects input
- `mutate(...)` triggers the registered mutation
- the mutation runs `createProfile(...)`
- the service updates the local mock data source
- the created profile is returned

So `mutate(...)` is not the actual create logic by itself. It is the trigger TanStack Query provides after I register the mutation function.

##

### 5) Invalidated the profiles query after success

Inside the mutation, I used `onSuccess` and invalidated the same query key that the Directory page already uses for the list:

- `['profiles']`

That was important because the key has to match the existing query key exactly.

Once the mutation succeeds, invalidating that query tells TanStack Query that the cached profiles data is now stale and should be refreshed. Since the list on the page already depends on that query, the list updates again after the create succeeds.

That made the full write and refresh flow much easier to understand in practice.

The important sequence became:

1. the user submits the form
2. the mutation runs `createProfile()`
3. the create succeeds
4. `onSuccess` invalidates `['profiles']`
5. the profiles query runs again
6. the Directory list shows the updated data

This was the core of the whole lab.

##

### 6) Reset the form after a successful create

Still inside `onSuccess`, I reset the two refs back to empty strings for the form to be ready for the next profile creation.

##

### 7) Added basic mutation UI state

After the main mutation logic worked, I also used the mutation state in the UI.

I used the pending mutation state to:

- disable the submit button
- change the button text to `Creating...`

I also added the mutation error branch so I could display the create error message if the create flow fails.

So in the same page, the Directory query still handles loading and error states for reading the list, while the mutation handles pending and error states for creating a new profile.

##

### 8) Tested the mutation flow

After everything was completed, I tested the page in a few different ways.

First, I tested the normal success path:

- open the Directory page
- type a new name and bio
- submit the form
- see the button switch into the pending state
- confirm the create flow finishes
- confirm the profiles query is invalidated
- confirm the list updates again

I also tested the mutation error path by turning on the temporary `createFail` switch in the service. That confirmed the error state on the create flow was working too.

To verify that the created object actually contained the typed values, I temporarily logged the created profile in the service. That confirmed the submitted name and bio were being passed correctly into the mutation and then into the created profile object.

But the data is still only stored in the temporary local mock array. Once the page fully reloads, that runtime state is reset back to the hardcoded starting data.

So for Lab 3, understanding the write flow was the goal and the persistence can be added in the future labs.

So at the end we have:

- mutate successfully
- invalidate the related query
- see the updated list without manually managing it

##

## What I have learned in this lab

- `useMutation` is the TanStack Query tool for write operations such as create, update, and delete.

- `mutationFn` is the actual async function that performs the write.

- `mutate(...)` is the trigger function returned by `useMutation`, and the data passed into `mutate(...)` becomes the input for the registered mutation function.

- In `onSuccess` we can invalidate related queries after a successful write.

- Query invalidation matters because the UI often depends on cached query data that becomes stale after a mutation.

- The query key must match exactly during invalidation. If the key used for invalidation does not match the existing query key, the expected refresh will not happen.

- After a profile is created, the page does not manually add that new item into the rendered list itself. Instead, the mutation invalidates the profiles query, TanStack Query fetches the profiles again, and the page rerenders with the updated data.

##

## Result at the end of the lab

By the end of Lab 3, the frontend had:

- a `CreateProfileInput` type in `src/services/profiles.ts`
- a working `createProfile()` function in the same service layer as `getProfiles()`
- a simple create profile form on `PageDirectory.vue`
- `useMutation` wired to the form submit flow
- query invalidation for `['profiles']` after successful creation
- basic pending and error UI for the mutation
- form reset after success
- the existing profiles list query still working
- the existing profile links still routing into `/profile/:id`

So at this point, the Directory page can now both:

- read profiles
- create profiles

That makes it the first page in the project that handles both query and mutation behavior together.

##

## Summary

Lab 3 was the first write focused frontend lab.

The practical result was adding profile creation to the Directory page through a simple form, a `createProfile()` service function, and `useMutation`.

The main result was understanding the full mutation flow:

- `mutationFn` is the actual async write function
- `mutate(...)` triggers that function with submitted data
- `onSuccess` invalidates the related query
- the existing profiles query refetches
- the Directory list updates with the new data

That made the connection between writes and cached reads much easier to understand.

##

### Sources:

- TanStack Query - Vue Mutations,
  https://tanstack.com/query/latest/docs/framework/vue/guides/mutations

- TanStack Query - QueryClient,
  https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries

- Vue - Form Input Bindings,
  https://vuejs.org/guide/essentials/forms.html
