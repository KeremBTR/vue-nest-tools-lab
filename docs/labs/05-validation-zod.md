# Lab 5 — Validation with Zod

## Goal

The goal of Lab 5 was to add runtime validation to the create profile flow with Zod.

Before this lab, the Directory page already had:

- profile loading with TanStack Query
- profile creation with a mutation
- query invalidation after create
- Pinia controlling the create section and toast state

This lab added validation before the mutation runs.

The main idea was to understand the difference between TypeScript types and runtime validation. TypeScript helps while writing code, but it does not validate real user input in the browser. Zod gives the app a schema that can check submitted values at runtime.

By the end of this lab, invalid create profile input shows field errors, and only valid input reaches the mutation.

##

## What I did in order

### 1) Installed Zod

I installed Zod inside `apps/web`.

Zod is used here to define the shape of valid create profile input and check that input when the form is submitted.

This lab stayed focused on Zod only. I did not add vee-validate yet, because the next lab is the dedicated forms lab.

##

### 2) Created the profile schema

I created:

`src/schemas/profile.ts`

Inside that file, I added a schema for the create profile form.

The schema validates:

- `name`
- `bio`

The rules stayed simple:

- both fields are strings
- both fields are trimmed
- both fields have minimum lengths
- both fields have maximum lengths
- both fields have custom error messages

This made the validation rules explicit in one place.

##

### 3) Inferred the create input type from the schema

The schema file exports two things:

- `createProfileSchema`
- `CreateProfileInput`

The schema is the real runtime validator.

The type is inferred from the schema with Zod.

That means the create input shape does not need to be written twice. The schema becomes the source of truth, and TypeScript can use the inferred type while the app code is being written.

So the relationship is:

1. Zod schema defines valid create profile input
2. Zod validates real submitted data at runtime
3. TypeScript type is inferred from the same schema

##

### 4) Connected the type to the profiles service

In `src/services/profiles.ts`, I removed the old manual `CreateProfileInput` interface.

Then I imported the inferred `CreateProfileInput` type from the schema file.

The `Profile` interface stayed in `profiles.ts` because it represents the full profile object.

The split is:

- `Profile` = full profile used by the app
- `CreateProfileInput` = form input used when creating a profile

This kept the service structure the same, but made the create input type come from the validation schema.

##

### 5) Validated the form before mutation

In `PageDirectory.vue`, I imported `createProfileSchema`.

The submit flow changed from directly calling the mutation to validating first.

The new flow is:

1. user submits the form
2. the page reads `name` and `bio`
3. Zod validates the values with `safeParse()`
4. invalid input updates local validation errors
5. valid input calls `mutate()` with `result.data`

This is the main Lab 5 flow:

`raw form input -> Zod validation -> valid data -> mutation`

Invalid input now stops before `createProfile()` runs.

##

### 6) Added local validation error state

I added local validation error state in `PageDirectory.vue` for:

- name error
- bio error

This state stays local because these errors only belong to this form.

The state split is now:

- local refs = `name` and `bio`
- local validation state = field error messages
- TanStack Query = profile query and mutation flow
- Pinia = create section visibility and toast message

This keeps each tool responsible for the right kind of state.

##

### 7) Displayed field-level errors

When validation fails, I used Zod’s error output to get field-level messages.

Since the schema is a flat object, `flattenError()` works well here. It gives field errors for `name` and `bio`, and the page shows those messages under the related inputs.

So the form now shows messages like:

- name is too short
- bio is too short
- name is too long
- bio is too long

The important part is that the messages come from the schema, but Vue still controls where they render.

##

### 8) Cleaned up validation state

I added a helper to clear validation errors.

Validation errors are cleared when:

- the user submits again
- the profile is created successfully
- the user cancels the create profile form

Cancel also resets the form values and closes the create section.

This prevents old validation messages from staying visible after the form is closed or successfully submitted.

##

### 9) Kept the existing create flow working

The existing mutation flow from Lab 3 still works.

After valid input is submitted:

1. the mutation runs
2. `createProfile()` creates the profile
3. the `['profiles']` query is invalidated
4. the list updates
5. the form resets
6. the create section closes
7. the toast appears

The Pinia flow from Lab 4 also stayed the same. Pinia still controls the create section and toast state.

Zod only adds the validation checkpoint before the mutation.

##

### 10) Tested the behavior

I manually tested the create profile form with:

- empty fields
- name too short
- bio too short
- name too long
- bio too long
- valid input
- invalid input followed by valid input
- cancel after validation errors are visible

Invalid input showed field-level errors and did not run the mutation.

Valid input still created the profile, invalidated the query, updated the list, closed the create section, and showed the toast.

##

## What became clearer in this lab

A Zod schema checks real values while the app is running.

Another important point was that Zod can infer a TypeScript type from a schema. That keeps the create input shape in one place instead of maintaining a schema and a separate matching interface.

The final create profile flow is:

1. the form collects raw input
2. Zod validates the input
3. invalid input becomes field errors
4. valid input becomes `result.data`
5. `result.data` is passed into the mutation

That made the create flow safer without changing the overall structure from previous labs.

##

## Result at the end of the lab

By the end of Lab 5, the frontend had:

- Zod installed in `apps/web`
- a profile schema file at `src/schemas/profile.ts`
- a `createProfileSchema` for create profile input
- a `CreateProfileInput` type inferred from the schema
- the old manual create input interface removed from `profiles.ts`
- `PageDirectory.vue` validating input before mutation
- field-level validation errors for `name` and `bio`
- validation errors cleared on submit, success, and cancel
- invalid input blocked before mutation
- valid input still using the existing TanStack Query mutation flow
- the existing Pinia create section and toast behavior still working

So Lab 5 added runtime validation without replacing the existing query, mutation, or client-state setup.

##

## Summary

Lab 5 added Zod to the create profile flow.

The main result was that the app now validates real user input before creating a profile.

The practical flow is:

1. define a schema
2. infer the input type from the schema
3. use the schema in the submit handler
4. show field errors when validation fails
5. call the mutation only when validation passes

This kept the lab focused on runtime validation. The form stayed simple for now, and the fuller form-library setup can come in the next lab.

##

### Sources:

- Zod - Documentation, https://zod.dev/

- Zod - Basic Usage, https://zod.dev/basics

- Zod - Defining Schemas, https://zod.dev/api

- Zod - Customizing Errors, https://zod.dev/error-customization
