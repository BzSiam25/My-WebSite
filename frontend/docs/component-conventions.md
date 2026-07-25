# Component Conventions

## 1. Architecture

We use a modified Atomic Design structure:

- **UI Primitives (`src/components/ui`)**: Highly reusable, stateless components (e.g., Button, Input). Built using shadcn/ui and Radix.
- **Layouts (`src/components/layout`)**: Structural components like Navbar, Footer, and Grid wrappers.
- **Shared (`src/components/shared`)**: Components used across multiple features but containing specific styling (e.g., SectionHeading).
- **Features (`src/features`)**: Complex components that implement business logic or connect to the data layer.

## 2. TypeScript Interfaces

- Export props interfaces for all components.
- Use `React.FC` or explicitly type the return value and props.

## 3. Styling

- Use Tailwind CSS for all styling.
- Avoid inline styles unless computing dynamic values (e.g., Framer Motion animations).
- Use the `cn()` utility function (clsx + tailwind-merge) for conditionally joining Tailwind classes.

## 4. State Management

- Prefer local state (`useState`, `useReducer`) for UI state.
- Use TanStack Query for remote data fetching, caching, and synchronization.
- Avoid global state managers (like Redux/Zustand) unless the state is genuinely shared across distant components (e.g., Theme, AI Assistant open state).
