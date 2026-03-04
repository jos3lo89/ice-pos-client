# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Restaurant POS (Point of Sale) client — Vite + React 19 + TypeScript. Spanish-language UI. Three user roles: `admin`, `mesero` (waiter), `cajero` (cashier).

## Commands

Do not run these commands directly — instruct the user to run them locally.

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check + Vite build (`tsc -b && vite build`) |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build |

No test runner is configured.

## Environment

- Copy `.env.example` → `.env`
- Required: `VITE_API_BASE_URL` (backend base URL)
- Access via `import.meta.env.VITE_*`

## Architecture (Clean Architecture)

The code is layered — follow this dependency direction: `presentation → application → core ← infrastructure`

```
src/
├── core/
│   ├── entities/       # TypeScript interfaces/types (the domain model)
│   └── repositories/   # Repository interfaces (contracts, no implementation)
├── infrastructure/
│   └── api/            # Concrete API classes implementing repository interfaces
│                       # Each exports a singleton: export const entityApi = new EntityApi()
├── application/
│   ├── hooks/          # TanStack Query hooks (useQuery/useMutation wrappers)
│   └── stores/         # Zustand stores (auth.store.ts, cart-order.store.ts)
├── presentation/
│   ├── features/       # Feature modules (orders, cashier, products, etc.)
│   │   └── <feature>/
│   │       ├── pages/       # Page components
│   │       ├── components/  # Feature-specific components
│   │       └── schemas/     # Zod validation schemas
│   └── components/
│       ├── ui/         # Shadcn/Radix primitives
│       └── (shared)    # Pagination, LoadingState, ErrorState, ConfirmDialog
├── layouts/            # AdminLayout, ServerLayout, CashierLayout, AuthLayout
├── guards/             # AuthGuard, RoleGuard, GuestGuard
├── routes/
│   ├── routes.tsx      # createBrowserRouter — all routes defined here
│   └── lazyImports.ts  # All page components lazy-loaded here
├── config/
│   ├── axios.ts        # Axios instance (withCredentials: true, 401 → redirect /login)
│   └── tanstack-query.ts
├── constants/          # Auth storage key constant
├── lib/utils.ts        # cn() helper (clsx + tailwind-merge)
└── utils/              # Format helpers, PDF ticket generation
```

### Adding a new feature

Follow this pattern (see `src/core/entities/order.entity.ts` → `src/core/repositories/order.repository.ts` → `src/infrastructure/api/order.api.ts` → `src/application/hooks/useOrder.ts`):

1. Define entity interfaces in `src/core/entities/<entity>.entity.ts`
2. Define the repository interface in `src/core/repositories/<entity>.repository.ts`
3. Implement the class in `src/infrastructure/api/<entity>.api.ts` — export a singleton
4. Write TanStack Query hooks in `src/application/hooks/use<Entity>.ts`
5. Add page/components under `src/presentation/features/<feature>/`
6. Add a lazy import in `src/routes/lazyImports.ts` and a route in `src/routes/routes.tsx`

## Role-Based Routing

Routes are guarded by `<AuthGuard>` + `<RoleGuard allowedRoles={[...]}>`:
- `admin` → `AdminLayout` → manages employees, categories, products, floors, tables
- `mesero` → `ServerLayout` → views floors/tables, manages order entry
- `cajero` → `CashierLayout` → cash sessions, POS, payments, charge

## TypeScript Rules

- `verbatimModuleSyntax: true` — use `import type` for type-only imports (enforced)
- `noUnusedLocals` and `noUnusedParameters: true` — no unused vars
- `@/` path alias maps to `src/`
- Derive form types from Zod schemas: `type FormT = z.infer<typeof formSchema>`
- Avoid `any`; use proper generics or `unknown` + narrowing

## Code Patterns

### Mutation hook with toast
```typescript
return useMutation({
  mutationFn: (data) => entityApi.create(data),
  onMutate: () => toast.loading("Creando...", { id: "create-entity" }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["entity"] });
    toast.success("Creado correctamente", { id: "create-entity" });
  },
  onError: (error) => {
    const message = error instanceof AxiosError
      ? error.response?.data.message
      : "Error desconocido";
    toast.error(message, { id: "create-entity" });
  },
});
```

### Query key convention
```typescript
["entity", "list", { page, limit, search }]  // lists
["entity", "detail", id]                      // single item
["current", "order", orderId]                 // current state
```

## Styling

Dark theme with cyan accents (Tailwind CSS 4):
- Surfaces: `bg-slate-900`, `bg-slate-800`, cards `bg-slate-800/50`
- Text: `text-white` headings, `text-slate-300/400` body
- Borders: `border-slate-700`
- Primary action: `bg-cyan-500/600`
- Status: `green-500` success, `red-500` error/danger, `blue-600` info
- Page entry animation: `animate-in fade-in duration-500`

## Agent Behavior

- Do not run `git commit`; suggest the commit message only
- Do not modify `.env`; use `.env.example` to document vars
- Do not run dev server, build, lint, or test commands
- Prefer `import type` for type-only imports
- Follow existing formatting in each file (some files use single quotes / no semicolons)
- Commit format: `<type>[optional scope]: <description>` (Conventional Commits)
