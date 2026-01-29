# AGENTS.md

Purpose

- Guide coding agents working in this repo.
- Keep instructions factual to this codebase.

Repository Summary

- Vite + React + TypeScript app.
- Module system: ESM (`"type": "module"`).
- Styling: Tailwind CSS (via `@tailwindcss/vite`) and `tailwind-merge`.
- Data layer: Axios + TanStack Query.

Package Manager

- `pnpm` is in use (`pnpm-lock.yaml` present).
- Prefer `pnpm` for install/run unless the user requests otherwise.

Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build` (runs `tsc -b` then `vite build`)
- Lint: `pnpm lint` (runs `eslint .`)
- Preview build: `pnpm preview`

Tests

- No test runner or test files were found in this repo.
- No single-test command is configured.
- If tests are added later, update this section with the runner and a single-test example.

Environment

- Example env file: `.env.example`.
- Required var shown: `VITE_API_BASE_URL`.
- Vite env access via `import.meta.env`.

Project Structure (observed)

- `src/` application source.
- `src/components/` UI and feature components.
- `src/layout/` layout wrappers.
- `src/pages/` route-level pages.
- `src/routes/` router setup and lazy imports.
- `src/services/` API service modules.
- `src/config/` shared config (axios, query client).
- `src/lib/utils.ts` utilities (`cn` helper).

TypeScript Configuration

- Strict mode enabled (`"strict": true`).
- `noUnusedLocals`, `noUnusedParameters` enabled.
- Module resolution: `bundler`.
- Path alias: `@/* -> ./src/*`.
- JSX: `react-jsx`.

Code Style: Formatting and Syntax

- Mixed formatting exists. Follow the local file style you are editing.
- `src/main.tsx` uses single quotes and semicolons omitted.
- Many other files use double quotes and semicolons.
- Keep import order consistent with nearby code.
- Prefer explicit type-only imports using `import type` when applicable.

Code Style: Imports

- Use alias `@/...` for `src/` imports where appropriate.
- Keep external imports before local ones (match adjacent file style).
- Group `import type` with related import or separate by convention in file.

Code Style: Naming

- Components: `PascalCase` function names and file names.
- Hooks: `useX` naming (`useAuth`).
- Types: `PascalCase` for exported types and interfaces.
- Local variables: `camelCase`.

React Patterns

- App entry: `src/main.tsx` creates root and renders `App`.
- Router uses `createBrowserRouter` in `src/routes/routes.tsx`.
- Providers: `ThemeProvider`, `QueryClientProvider`, `ReactQueryDevtools` in `src/App.tsx`.

Data Fetching

- Axios instance in `src/config/axios.ts` with `baseURL` from env and `withCredentials`.
- Services in `src/services/` should use the shared axios instance.
- TanStack Query configured in `src/config/tanstack-query.ts` with defaults.

Error Handling

- Use Axios errors via `AxiosError` when handling API failures.
- Prefer explicit error branches for known error types.
- Do not swallow errors silently; log or surface them based on UI pattern.

Forms and Validation

- Forms use `react-hook-form` and `zod` with `zodResolver`.
- Define schemas close to the form and infer types from schema.

UI and Styling

- Tailwind utilities are used heavily in JSX.
- Use the `cn` helper from `src/lib/utils.ts` to merge class names.
- Reuse UI primitives in `src/components/ui/` when possible.
- Icons via `lucide-react`.
- When generating styles/components, use the existing dashboard/login palette only (slate-900/800/700/600, gray-300/400, cyan-500/400, blue-600, red-500) and avoid introducing new hues.

Routing

- Routes are defined as objects in `src/routes/routes.tsx`.
- Lazy page components are imported through `src/routes/lazyImports.ts`.
- Layout routes wrap child pages via `Outlet`.

Linting

- ESLint is configured via the default `eslint .` script.
- Keep code lint-clean; respect unused variable/parameter rules.

Build Notes

- `pnpm build` performs a TypeScript project build then Vite build.
- Do not add emit output in TS config; `noEmit` is true in app/node configs.

File and Directory Conventions

- Use `src/` for all app code.
- Keep services in `src/services/` and types in `src/interfaces/`.
- Layouts go in `src/layout/`.

Agent Guidance

- Do not modify `.env` directly; use `.env.example` for documenting variables.
- Follow existing conventions in each file; avoid mass reformatting.
- Keep changes minimal and targeted unless refactoring is requested.

Cursor/Copilot Rules

- No `.cursor/rules/` or `.cursorrules` found.
- No `.github/copilot-instructions.md` found.

When Adding Tests (future)

- Select a runner (e.g., Vitest/Jest) and update `package.json` scripts.
- Include a single-test command example in this file.
