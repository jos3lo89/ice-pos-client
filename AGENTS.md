# AGENTS.md

Guide for coding agents working in this repository.

## Repository Summary

- Vite + React 19 + TypeScript app
- Module system: ESM (`"type": "module"`)
- Styling: Tailwind CSS 4, tailwind-merge, tailwind-animations
- Data: Axios + TanStack Query
- State: Zustand
- Forms: react-hook-form + zod
- Notifications: sonner

## Package Manager

pnpm (pnpm-lock.yaml present). Use `pnpm` for installing packages.

## Commands

Do not run these commands in this environment. Instruct user to run locally.

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server |
| `pnpm build` | Build (tsc -b && vite build) |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build |
| Tests | No test script configured |
| Single test | Not available; add a test runner first |

## Environment

- Example file: `.env.example`
- Required var: `VITE_API_BASE_URL`
- Access via `import.meta.env.VITE_*`

## Project Structure

Clean Architecture layers — dependency direction: `presentation → application → core ← infrastructure`

```
src/
├── core/
│   ├── entities/        # TypeScript interfaces/types (domain model)
│   └── repositories/    # Repository interfaces (contracts, no implementation)
├── infrastructure/
│   └── api/             # Concrete API classes implementing repository interfaces
│                        # Each exports a singleton: export const entityApi = new EntityApi()
├── application/
│   ├── hooks/           # TanStack Query hooks (useQuery/useMutation wrappers)
│   └── stores/          # Zustand stores (auth.store.ts, cart-order.store.ts)
├── presentation/
│   ├── features/        # Feature modules (orders, cashier, products, etc.)
│   │   └── <feature>/
│   │       ├── pages/       # Page components
│   │       ├── components/  # Feature-specific components
│   │       └── schemas/     # Zod validation schemas
│   └── components/
│       ├── ui/          # Shadcn/Radix primitives
│       └── (shared)     # Pagination, LoadingState, ErrorState, ConfirmDialog
├── layouts/             # AdminLayout, ServerLayout, CashierLayout, AuthLayout
├── guards/              # AuthGuard, RoleGuard, GuestGuard
├── routes/
│   ├── routes.tsx       # createBrowserRouter — all routes defined here
│   └── lazyImports.ts  # All page components lazy-loaded here
├── config/              # Axios instance and TanStack Query client
├── constants/           # Auth storage key constant
├── lib/utils.ts         # cn() helper (clsx + tailwind-merge)
└── utils/               # Format helpers, PDF ticket generation (pdfmake)
```

## TypeScript Configuration

- Strict mode enabled
- `verbatimModuleSyntax: true` - requires explicit `import type` for type-only imports
- `noUnusedLocals` and `noUnusedParameters` enabled
- Module resolution: bundler
- Path alias: `@/*` → `./src/*`
- JSX: react-jsx

## Code Style

### Imports

- Use `@/` alias for src/ imports
- External imports before local imports
- Prefer `import type` for type-only imports (required by verbatimModuleSyntax)
- Example: `import type { UserRole } from "@/core/entities/employe.entity"`

### Formatting

- Mixed formatting exists; follow local file style
- `src/main.tsx` uses single quotes, no semicolons
- Most other files use double quotes with semicolons
- Avoid mass reformatting unrelated to changes

### Types

- Avoid `any`; use proper types or generics
- Prefer `unknown` + type narrowing when uncertain
- Use zod inference for form/data types: `type CreateUserT = z.infer<typeof createUserSchema>`

### Naming

- Components: PascalCase (e.g., `CreateUserPage`)
- Hooks: camelCase with `use` prefix (e.g., `useUsersList`)
- Types/Interfaces: PascalCase
- Variables: camelCase
- API classes: PascalCase implementing repository interface, exported as singleton (`entityApi`)

## React Patterns

- React 19 with StrictMode
- App entry: `src/main.tsx` creates root and renders App
- Router: `createBrowserRouter` in `src/routes/routes.tsx`
- Providers: ThemeProvider, QueryClientProvider, ReactQueryDevtools in App.tsx
- Layout routes wrap child pages via `<Outlet />`
- Route guards: AuthGuard, RoleGuard, GuestGuard

## Data Fetching

### Axios

- Instance in `src/config/axios.ts`
- baseURL from `VITE_API_BASE_URL`
- `withCredentials: true` for cookie-based auth

### TanStack Query

- Query client in `src/config/tanstack-query.ts`
- Query keys pattern: `["entity", "action", { params }]`
- Example: `["users", "list", { page, limit, search }]`
- Use `invalidateQueries` to refresh after mutations

### API Class Pattern

Each entity follows three files:

1. `src/core/repositories/<entity>.repository.ts` — interface contract
2. `src/infrastructure/api/<entity>.api.ts` — implements the interface
3. `src/application/hooks/use<Entity>.ts` — TanStack Query hooks consuming the API

```typescript
// src/infrastructure/api/entity.api.ts
class EntityApi implements EntityRepository {
  private readonly baseUrl = "/entity";

  async getAll(params: GetAllParams) {
    const { data } = await http.get<ResponseType>(this.baseUrl, { params });
    return data;
  }
}
export const entityApi = new EntityApi();
```

## Forms and Validation

- Use react-hook-form with zodResolver
- Define zod schemas near the form
- Infer types from schema: `type FormT = z.infer<typeof formSchema>`

## State Management

- Zustand stores in `src/application/stores/`
- Use persist middleware for localStorage-backed state
- Prefer selectors when reading store state

## Error Handling

- Use `AxiosError` type for API failures
- Extract error message: `error.response?.data.message`
- Surface errors via toast notifications, never swallow silently

## Toast Notifications (sonner)

Pattern for mutations:

```typescript
return useMutation({
  mutationFn: (data) => service.create(data),
  onMutate: () => toast.loading("Creating...", { id: "create-entity" }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["entity"] });
    toast.success("Created successfully", { id: "create-entity" });
  },
  onError: (error) => {
    const message = error instanceof AxiosError
      ? error.response?.data.message
      : "Unknown error";
    toast.error("Error", { description: message, id: "create-entity" });
  },
});
```

Key points:
- Use consistent toast ID to replace loading → success/error
- Include descriptive error messages from API

## UI and Styling

- Theme: dark slate surfaces with cyan accents
- Backgrounds: `bg-slate-900/800/700`, cards use `bg-slate-800/50`
- Text: `text-white` for headings, `text-slate-300/400` for body
- Borders: `border-slate-700`
- Accent: `cyan-500/600` for primary actions
- Status colors: `green-500` success, `red-500` danger, `blue-600` info
- Interactive: `hover:bg-slate-700`, `focus-visible:ring-cyan-500`
- Page animation: `animate-in fade-in duration-500`

## Routing

- Routes defined as objects in `src/routes/routes.tsx`
- Lazy page components via `src/routes/lazyImports.ts`
- Guards wrap layouts for auth/role protection

## Commit Messages (Conventional Commits)

Format: `<type>[optional scope]: <description>`

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

## Agent Behavior

- Do not run `git commit` commands; suggest commit message only
- Do not modify `.env` directly; use `.env.example` for documenting vars
- Keep changes minimal and targeted unless refactoring is requested
- Do not run tests, dev server, lint, or build commands

## Performance Optimization

Load the `vercel-react-best-practices` skill when optimizing React performance:

```
Skill: vercel-react-best-practices
```

This skill provides 57 rules across 8 categories including:
- Eliminating waterfalls (Promise.all, parallel fetching)
- Bundle size optimization (dynamic imports, barrel imports)
- Re-render optimization (memo, dependencies, derived state)
- Rendering performance (conditional rendering, hoisting JSX)

## When Adding Tests

1. Select a runner (Vitest or Jest)
2. Add test scripts to package.json
3. Update this file with single-test command
4. Instruct user to run tests locally
