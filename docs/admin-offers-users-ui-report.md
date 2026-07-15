# Voyana admin, user, and guest UI report

Date: 15 July 2026  
Scope: design and frontend architecture proposal only; no implementation, authentication, authorization, or backend changes.

## Executive recommendation

Voyana should use **one brand with two application surfaces**:

- The **guest and signed-in user surface** remains the image-led travel storefront that already exists.
- The **admin surface** gets a dedicated operational layout: persistent sidebar on desktop, compact top bar, light workspace background, data tables, filters, status badges, and structured forms.

The admin should therefore be **visually related, but structurally different**. Making it totally unrelated would increase design and maintenance cost and make it feel like a separate product. Copying the public site exactly would make routine management work slower and would waste space on marketing-oriented imagery.

The right balance is approximately:

- Shared: Voyana logo, Inter typography, dark-teal brand color, warm-yellow primary actions, teal accents, 8px card radius, form behavior, icon family, and writing tone.
- Admin-only: sidebar navigation, compact page header, neutral workspace canvas, denser tables, restrained imagery, persistent actions, operational statuses, and desktop-first information density.
- Public-only: large destination imagery, promotional card treatments, hero sections, public header/footer, floating chat, and discovery-oriented copy.

## What exists today

### Frontend architecture

The frontend is React 19 + TypeScript + Vite. Its structure is already appropriate for this work:

- `src/app` owns providers, routing, layouts, and the Redux store.
- `src/features` owns domain features such as auth, destinations, and vacation packages.
- `src/shared` owns reusable UI, services, styles, and design tokens.
- React Router uses lazy-loaded routes and route-level fallbacks.
- Redux Toolkit handles remote data state.
- MUI supplies controls/icons; Tailwind is used for composition and page styling.

The new admin UI should extend this structure instead of creating a second frontend or a separate component system.

### Current visual language

The existing public product has a coherent travel identity:

- dark teal (`--voyana-color-background-dark`) for strong surfaces;
- warm yellow for primary calls to action;
- teal for selected states and supporting accents;
- white and soft gray content surfaces;
- Inter with heavy headings and labels;
- 8px cards, pill badges, subtle borders, and soft shadows;
- large destination photography and spacious public layouts.

These foundations are strong enough for an admin UI, but the current global MUI theme is biased toward dark authentication forms. Admin fields should use the existing light field tone or an admin-specific light theme override, not the dark auth defaults.

### Current data and API constraints

The vacation-package model is already detailed enough to drive the add-offer form. It includes:

- identity: code, slug, name, description, destination, category;
- media: cover image, gallery, optional video;
- pricing and discount information;
- travel dates and duration;
- rating and logistics;
- campaign, availability, inclusions, accommodation, transport, and policies;
- category-specific fields;
- publishing state, featured state, priority, and page metadata.

However, the current vacation-package API exposes only public read endpoints. There is no admin create/update/delete endpoint and no admin users endpoint. The requested UI can be built with typed local demo data and client-side state, but it must not imply that changes have been persisted.

The current frontend `AuthUser` type also omits `role`, account state, verification state details, and dates needed by an admin user list. Admin UI mock types should remain separate until real admin endpoints are designed.

## Role-based experience

| Area | Guest | Signed-in user | Admin |
| --- | --- | --- | --- |
| Main goal | Discover and compare trips | Discover trips with personal context | Create and manage commercial content and users |
| Primary navigation | Public top navigation | Same public navigation | Dedicated sidebar/workspace navigation |
| Offer list | Rich image-led cards and filters | Same list | Compact operational table/list |
| Offer details | Persuasive travel detail page | Same detail page | Status, edit, preview, and metadata controls |
| Identity UI | “Start” call to action | Name/avatar menu | Admin identity in sidebar/top bar |
| Density | Spacious | Spacious | Denser and scan-oriented |
| Mobile priority | High | High | Responsive, but desktop-first |

### Guest

Do not redesign the existing guest experience for this task. Guests should continue to see the public home, destinations, vacation-package list, and package details. The header keeps the “Start” action. No admin navigation should appear.

### Signed-in user

For the requested scope, the signed-in user experience should be almost identical to the guest experience. The only current difference should be identity presentation in the public header. Avoid inventing dashboards, favorites, bookings, or profile workflows until those product requirements exist.

### Admin

Admin is a different job and needs a dedicated shell. Recommended desktop composition:

```text
┌──────────────────┬──────────────────────────────────────────────────┐
│ Voyana Admin     │ Page title                         Admin identity │
│                  ├──────────────────────────────────────────────────┤
│ Offers           │                                                  │
│ Users            │                 Page content                     │
│                  │                                                  │
│ ───────────────  │                                                  │
│ View public site │                                                  │
└──────────────────┴──────────────────────────────────────────────────┘
```

Use a dark-teal sidebar to retain the Voyana identity, a white/light-gray work area for legibility, and yellow only for the page's primary action. The sidebar should collapse to a drawer on small screens.

## Proposed admin information architecture

Keep the first release deliberately small:

- `/admin/offers` — offer management list.
- `/admin/offers/new` — add-offer UI.
- `/admin/users` — user management list UI.

Do not add an admin dashboard merely to fill a navigation slot. With only two operational areas, the offer list is the most useful admin landing page.

No login page, route guard, permission check, session redirect, role switch, or backend mutation is part of this UI-only implementation. A small “Admin preview” label should make that limitation obvious during development.

## Screen specification

### 1. Offers list

Purpose: let an admin scan inventory and reach the add-offer flow quickly.

Header:

- title “Offers”;
- short operational description;
- primary yellow “Add offer” button;
- compact total count.

Toolbar:

- search by offer name or code;
- status filter: All, Active, Draft, Sold out;
- category filter;
- optional sort control, default “Recently updated”.

Desktop table columns:

1. Offer — 48px thumbnail, name, and code.
2. Destination / category.
3. Travel period.
4. Price.
5. Availability.
6. Publishing status.
7. Last updated.
8. Overflow menu.

The whole row may be focusable, but row actions must remain individually accessible. Use status chips with both color and text; never communicate state through color alone. Place pagination below the table and the filters immediately above it. Material's data-table guidance supports this scan-and-manipulate layout, while Shopify's admin guidance recommends full-width index pages for resource lists ([Material data tables](https://m2.material.io/design/components/data-tables.html), [Shopify admin index guidance](https://shopify.dev/changelog/new-built-for-shopify-design-requirements)).

Mobile behavior:

- change table rows into compact cards;
- retain search and a filter drawer;
- show name, code, status, dates, and price before secondary metadata;
- keep “Add offer” visible in the page header, not as an unlabeled floating button.

UI-only behavior:

- load typed mock offers derived from the current `VacationPackage` shape;
- search, filter, and sort locally;
- allow navigation to the add-offer screen;
- overflow actions can be visibly disabled or show “Available when the admin API is connected”; they must not fake persistence.

### 2. Add offer

The current offer schema is too large for one undifferentiated form. Use a dedicated full page with a narrow section navigator and progressively disclosed groups. Shopify's form guidance similarly recommends a dedicated page for complex create/edit forms and progressive disclosure for conditional inputs ([Shopify form guidance](https://shopify.dev/docs/apps/design/user-experience/forms)).

Recommended sections:

1. **Basics** — name, code, slug, description, destination, category.
2. **Media** — cover image URL/preview, gallery items, optional video.
3. **Pricing & campaign** — amount, currency, unit, original amount, discount/campaign labels and type, booking deadline.
4. **Travel & stay** — start/end date, duration, rating, accommodation, meal plan, transport.
5. **Availability** — status, units, urgency label.
6. **Inclusions & policies** — services, transport inclusions, payment, cancellation, children policy.
7. **Category details** — fields change after a category is selected.
8. **Publishing** — active, featured, priority, page title.

Layout:

- 12-column admin content grid;
- main form at 8 columns and a 4-column summary/preview panel on wide screens;
- single column below tablet width;
- section cards with concise helper text;
- sticky bottom action bar containing “Cancel”, “Save draft”, and “Publish offer”.

Validation/UI states:

- mark required fields based on the existing schema;
- validate locally on blur and submit;
- show an error summary linked to invalid sections;
- preserve entered values when switching sections;
- preview the cover, title, campaign, dates, and price in a small public-card summary;
- on UI-only submit, show a clearly worded preview notification such as “UI preview complete — no offer was saved.”

Avoid a modal for this form. It is too long, contains conditional fields, and needs room for context and validation.

### 3. Users list

Purpose: show an admin-oriented view of accounts without implementing account operations.

Header and toolbar:

- title “Users” and total count;
- search by name or email;
- filters for role, account state, and email verification;
- no “Add user” button unless manual account creation becomes a real requirement.

Desktop table columns:

1. User — initials/avatar, full name, email.
2. Role — User/Admin.
3. Email — Verified/Unverified.
4. Account — Active/Inactive/Locked.
5. Last login.
6. Joined.
7. Overflow menu placeholder.

Do not expose password, tokens, failed-login details, or other sensitive authentication fields. Admin actions such as deactivate, unlock, delete, or change role should not be interactive in this phase because they require real authorization, audit behavior, and backend support.

## Visual rules

### Keep from the public design

- Existing Voyana logo treatment.
- Inter and the current strong typographic hierarchy.
- Existing design-token variables rather than hard-coded replacement colors.
- Yellow primary buttons, dark teal navigation, teal selection/focus states.
- Current 8px radius and subtle border/shadow language.
- MUI rounded icon family already present in the project.

### Change for admin

- Reduce decorative imagery to small thumbnails and previews.
- Use fewer pill-shaped containers; reserve pills for filters and statuses.
- Reduce shadows and hover movement in tables.
- Use sentence case and direct operational labels.
- Use 44px minimum interactive targets even when the table is visually compact.
- Keep a visible keyboard focus ring.
- Use explicit empty, loading, error, and no-results states.

Side navigation is a suitable desktop pattern when an application has several top-level operational destinations, and a drawer is appropriate at smaller sizes ([Material navigation guidance](https://m1.material.io/patterns/navigation.html)).

## Proposed code architecture

```text
src/
  app/
    layouts/
      AdminLayout.tsx
      admin-navigation/
    router/
      AppRouter.tsx                 # mount admin routes beside public/auth
  features/
    admin/
      routes/
        admin.paths.ts
        admin.routes.ts
      shared/
        AdminPageHeader.tsx
        AdminStatusBadge.tsx
        AdminTableShell.tsx
        adminMockData.ts
      offers/
        pages/AdminOffersPage.tsx
        pages/AdminAddOfferPage.tsx
        components/
        hooks/useAdminOfferFilters.ts
        schemas/adminOfferForm.schema.ts
        types/adminOffer.types.ts
      users/
        pages/AdminUsersPage.tsx
        components/
        hooks/useAdminUserFilters.ts
        types/adminUser.types.ts
```

Architectural choices:

- Add one lazy-loaded `AdminLayout` route branch; do not place admin pages inside `PublicLayout` because that would add the public header, footer, and chat button.
- The globally rendered floating chat button currently sits outside the router. It should be hidden on `/admin/*` through layout/routing composition so admin screens remain task-focused.
- Reuse `AppButton`, light `AppTextField`, design tokens, and shared primitives where their behavior fits.
- Keep admin mocks and UI state local to the admin feature. Do not add fake API methods to `axiosClient`.
- Use Zod + React Hook Form for the add-offer UI, matching the existing form stack.
- Derive shared offer field types from the current vacation-package types when possible, but keep admin-only presentation types separate.
- Do not modify the existing public vacation-package list or its data flow.

## Implementation boundary for the next step

Included:

- Admin layout and responsive navigation.
- Offers list UI with local mock data, local search/filter/sort, and responsive table/cards.
- Add-offer form UI, conditional sections, client validation, preview, and explicit non-persistent submit feedback.
- Users list UI with local mock data, local search/filter, and responsive table/cards.
- Admin routes and active navigation states.
- Loading, empty, no-results, and UI-preview feedback states.
- Accessibility and responsive behavior.

Excluded:

- Login, logout, route protection, or role authorization.
- Backend endpoints or database writes.
- Real create/edit/delete/deactivate/role-change operations.
- User dashboard, profile, bookings, favorites, or payments.
- Admin analytics/dashboard.
- File upload service; image fields remain URL/preview UI.

## Acceptance criteria

- Public guest and signed-in pages retain their current appearance and behavior.
- `/admin/offers`, `/admin/offers/new`, and `/admin/users` are directly accessible for UI review.
- Admin pages clearly belong to Voyana but do not look like public marketing pages.
- Desktop and mobile layouts remain usable from 320px upward.
- Offer and user mocks are typed and isolated from production API state.
- Add-offer values validate locally and are never presented as persisted.
- All controls have visible labels, keyboard focus, appropriate disabled states, and status text independent of color.
- The frontend builds and lints successfully after implementation.

## Final design decision

Build the admin as a **branded sibling experience**: same Voyana identity and components, different shell and information density. Keep guest and signed-in user screens nearly identical for now. This gives admins an efficient workspace, preserves brand cohesion, fits the current architecture, and avoids introducing product features or security behavior outside the requested UI-only scope.
