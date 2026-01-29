# AGENTS.md

Purpose

- Guide coding agents working in this repo.
- Keep instructions factual to this codebase.

Repository Summary

- Vite + React + TypeScript app.
- Module system: ESM ("type": "module").
- Styling: Tailwind CSS, tailwind-merge, tailwind-animations.
- Data layer: Axios + TanStack Query.
- State: Zustand stores.
- Forms: react-hook-form + zod.
- Notifications: sonner.

Package Manager

- pnpm is in use (pnpm-lock.yaml present).

Commands (Do Not Run)

- Install: pnpm install
- Dev server: pnpm dev
- Build: pnpm build (tsc -b then vite build)
- Lint: pnpm lint (eslint .)
- Preview build: pnpm preview
- Tests: no test script configured
- Single test: not available; add a runner and document a command if tests are added

Execution Policy

- Do not run tests, lint, dev server, build, or preview commands.
- Remind the user to run those commands locally as needed.

Environment

- Example env file: .env.example.
- Required var shown: VITE_API_BASE_URL.
- Vite env access via import.meta.env.

Project Structure (observed)

- src/components/ UI and feature components.
- src/layouts/ layout wrappers.
- src/pages/ route-level pages.
- src/routes/ router setup and lazy imports.
- src/features/ feature-specific modules and schemas.
- src/config/ shared config (axios, query client).
- src/stores/ Zustand stores.
- src/interfaces/ shared types/interfaces.
- src/lib/utils.ts utilities (cn helper).

TypeScript Configuration

- Strict mode enabled ("strict": true).
- noUnusedLocals, noUnusedParameters enabled.
- Module resolution: bundler.
- Path alias: @/* -> ./src/*.
- JSX: react-jsx.

Code Style: Formatting and Syntax

- Mixed formatting exists. Follow the local file style you are editing.
- src/main.tsx uses single quotes and semicolons omitted.
- Many other files use double quotes and semicolons.
- Keep import order consistent with nearby code.
- Prefer explicit type-only imports using import type when applicable.
- Avoid any types; use proper types, generics, unknown + narrowing, or zod inference.

Code Style: Imports

- Use alias @/... for src/ imports where appropriate.
- Keep external imports before local ones (match adjacent file style).
- Group import type with related import or separate by convention in file.

Code Style: Naming

- Components: PascalCase function names and file names.
- Hooks: useX naming (useAuth).
- Types: PascalCase for exported types and interfaces.
- Local variables: camelCase.

React Patterns

- App entry: src/main.tsx creates root and renders App.
- Router uses createBrowserRouter in src/routes/routes.tsx.
- Providers: ThemeProvider, QueryClientProvider, ReactQueryDevtools in src/App.tsx.

Data Fetching

- Axios instance in src/config/axios.ts with baseURL from env and withCredentials.
- TanStack Query configured in src/config/tanstack-query.ts with defaults.

Error Handling

- Use AxiosError when handling API failures.
- Prefer explicit error branches for known error types.
- Do not swallow errors silently; log or surface them based on UI pattern.

Forms and Validation

- Forms use react-hook-form and zod with zodResolver.
- Define schemas near the form and infer types from schema.

UI and Styling

- Tailwind utilities are used heavily in JSX.
- Use the cn helper from src/lib/utils.ts to merge class names.
- Reuse UI primitives in src/components/ui/ when possible.
- Icons via lucide-react.
- When generating styles/components, use the existing dashboard/login palette only
  (slate-900/800/700/600, gray-300/400, cyan-500/400, blue-600, red-500)
  and avoid introducing new hues.

Routing

- Routes are defined as objects in src/routes/routes.tsx.
- Lazy page components are imported through src/routes/lazyImports.ts.
- Layout routes wrap child pages via Outlet.

State Management

- Zustand stores live in src/stores/.
- Prefer selectors when reading store state to avoid extra renders.

Commit Message Conventions (Conventional Commits)

Format:

text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

Example:

text
chore: remove unused lucide-react imports

- Elimina LogOut, Menu, PanelLeft, PanelLeftClose, UtensilsCrossed
- Limpieza de codigo innecesario

Types comunes:

text
feat: nueva feature (ej: add ConfirmDialog)
fix: bug fix (ej: fix 404 auth)
docs: documentacion
style: formato (sin logica)
refactor: reestructura codigo
perf: optimizacion performance
test: tests
chore: mantenimiento (ej: remove unused imports)
ci: CI/CD pipeline
build: cambios build
revert: revert commit

Git and Commits (Agent Behavior)

- Do not run any git commit commands.
- If the user asks for a commit, respond with a suggested commit message and
  a short English description only.
- Do not execute terminal commands even if asked for a commit.

Build Notes

- pnpm build performs a TypeScript project build then Vite build.
- Do not add emit output in TS config; noEmit is true in app/node configs.

File and Directory Conventions

- Use src/ for all app code.
- Keep layouts in src/layouts/.
- Keep interfaces in src/interfaces/.
- Keep feature-specific logic in src/features/.

Agent Guidance

- Do not modify .env directly; use .env.example for documenting variables.
- Follow existing conventions in each file; avoid mass reformatting.
- Keep changes minimal and targeted unless refactoring is requested.

Cursor/Copilot Rules

- No .cursor/rules/ or .cursorrules found.
- No .github/copilot-instructions.md found.

When Adding Tests (future)

- Select a runner (Vitest/Jest) and update package.json scripts.
- Include a single-test command example in this file.
