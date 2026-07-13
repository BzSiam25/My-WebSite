# Development Guidelines

## 1. Code Quality

- All code must pass strict ESLint and Prettier checks.
- Do not bypass TypeScript errors using `any` or `@ts-ignore` unless absolutely necessary (which should be documented).

## 2. Environment Variables

- Prefix all client-exposed environment variables with `VITE_`.
- Validate all environment variables on startup using Zod.
- Never commit `.env.local` or any file containing secrets.

## 3. Git Workflow & Commit Convention

Follow the Conventional Commits specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding/fixing tests
- `chore:` for build tasks, package manager configs, etc.

## 4. Import Strategy

Always use absolute imports via the `@/` alias for files inside the `src/` directory to maintain readability.
**Good:** `import { Button } from "@/components/ui/button";`
**Bad:** `import { Button } from "../../components/ui/button";`

## 5. Error Handling

- Never leave uncaught promises.
- Use TanStack Query's error states for asynchronous data.
- Ensure route-level and feature-level Error Boundaries are in place.
