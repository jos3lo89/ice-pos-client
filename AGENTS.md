# AGENTS.md

Purpose

- Guide coding agents working in this repo.
- Keep instructions factual to this codebase.

Repository Summary

- Vite + React + TypeScript app.
- Module system: ESM ("type": "module").
- Styling: Tailwind CSS, tailwind-merge, tailwind-animations.
- Data: Axios + TanStack Query.
- State: Zustand.
- Forms: react-hook-form + zod.
- Notifications: sonner.

Package Manager

- pnpm (pnpm-lock.yaml present).

Commands (Do Not Run)

- Install: pnpm install
- Dev server: pnpm dev
- Build: pnpm build (tsc -b && vite build)
- Lint: pnpm lint (eslint .)
- Preview: pnpm preview
- Tests: no test script configured
- Single test: not available; add a test runner first

Execution Policy

- Do not run tests or start the dev server for any task.
- Do not run lint/build/preview commands in this environment.
- Tell the user to run these commands locally when needed.

Environment

- Example env file: .env.example
- Required var shown: VITE_API_BASE_URL
- Vite env access via import.meta.env

Project Structure (observed)

- src/components/ UI and shared components.
- src/components/ui/ reusable primitives.
- src/layouts/ layout wrappers.
- src/routes/ router setup and lazy imports.
- src/features/*/pages for feature pages.
- src/features/*/components, hooks, services, schemas, interfaces.
- src/config/ axios and query client.
- src/stores/ Zustand stores.
- src/interfaces/ shared types/interfaces.
- src/lib/utils.ts utilities (cn helper).

TypeScript + Tooling

- Strict mode enabled.
- noUnusedLocals and noUnusedParameters enabled.
- Module resolution: bundler.
- Path alias: @/* -> ./src/*.
- JSX: react-jsx.

Code Style: General

- Mixed formatting exists; follow local file style.
- src/main.tsx uses single quotes and no semicolons.
- Many other files use double quotes and semicolons.
- Avoid mass reformatting unrelated to the change.

Code Style: Imports

- Use @/ alias for src/ imports when appropriate.
- Keep external imports before local ones (match local style).
- Prefer import type for type-only imports.
- Group type imports with related values or separate per file convention.

Code Style: Types

- Avoid any; use proper types or generics.
- Prefer unknown + narrowing when types are uncertain.
- Use zod inference for form/data types where schemas exist.

Code Style: Naming

- Components: PascalCase function names and filenames.
- Hooks: useX naming (useAuth).
- Types/Interfaces: PascalCase.
- Variables: camelCase.

React Patterns

- App entry: src/main.tsx creates root and renders App.
- Router: createBrowserRouter in src/routes/routes.tsx.
- Providers: ThemeProvider, QueryClientProvider, ReactQueryDevtools in src/App.tsx.
- Layout routes wrap child pages via Outlet.

Data Fetching

- Axios instance in src/config/axios.ts (baseURL from env, withCredentials).
- TanStack Query configured in src/config/tanstack-query.ts with defaults.

Error Handling

- Use AxiosError for API failures where applicable.
- Prefer explicit branches for known error types.
- Do not swallow errors silently; surface via UI/toasts when expected.

Forms and Validation

- react-hook-form with zodResolver.
- Define schemas near the form and infer types from schema.

State Management

- Zustand stores live in src/stores/.
- Prefer selectors when reading store state to avoid extra renders.

UI and Styling (Dashboard + Users reference)

- Overall theme: dark slate surfaces (bg-slate-900/800/700) with gray text
  (text-gray-300/400/500) and cyan accents (cyan-500/400).
- Borders: border-slate-700; cards and tables often use bg-slate-800 or
  bg-slate-800/50 with rounded-lg/rounded-xl and shadow-xl.
- Accent colors in the UI: cyan-600/500 buttons, blue-600, red-500 for danger,
  green-500 for success, and stat accents use green/blue/purple/orange.
- Logo mark uses gradient (from-cyan-500 to-blue-600).
- Interactive states: hover bg-slate-700, focus-visible ring cyan-500.
- Page motion: animate-in fade-in duration-500 on main views.

Routing

- Routes are defined as objects in src/routes/routes.tsx.
- Lazy page components are imported via src/routes/lazyImports.ts.

Commit Message Conventions (Conventional Commits)

Format:

text
<type>[optional scope]: <description>

Common types: feat, fix, docs, style, refactor, perf, test, chore, ci, build,
revert.

Git and Commits (Agent Behavior)

- Do not run git commit commands.
- If the user asks for a commit, respond with a suggested commit message
  and a short English description only.
- Do not execute terminal commands for commits.

Agent Guidance

- Do not modify .env directly; use .env.example for documenting variables.
- Keep changes minimal and targeted unless refactoring is requested.
- Never run tests or start the dev server as part of an edit task.

Cursor/Copilot Rules

- No .cursor/rules/ or .cursorrules found.
- No .github/copilot-instructions.md found.

When Adding Tests (future)

- Select a runner (Vitest or Jest) and add scripts.
- Include a single-test command example in this file.
- Even then, do not run tests or start the dev server here; instruct the user.
