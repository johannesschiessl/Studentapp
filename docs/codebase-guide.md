# Student App Codebase Guide

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Directory Structure](#directory-structure)
- [Code Organization](#code-organization)
- [Server Actions](#server-actions)
- [Styling Conventions](#styling-conventions)
- [State Management](#state-management)
- [Database & API](#database--api)
- [Best Practices](#best-practices)
- [Testing](#testing)
- [Documentation](#documentation)

## Project Overview

The Student App is a Next.js application that helps students track their grades, homework, subjects, events, and exams. The app uses a modern tech stack with TypeScript, Tailwind CSS, and Supabase for the backend.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Formatting**: Prettier
- **Linting**: ESLint

## Directory Structure

src/
├── app/
│ ├── (app)/ # Protected app routes
│ ├── (auth)/ # Authentication routes
│ ├── actions/ # Server actions
│ └── globals.css # Global styles
├── components/
│ ├── ui/ # Reusable UI components
│ ├── sections/ # Layout sections
│ └── [feature]/ # Feature-specific components
├── contexts/ # React contexts
├── hooks/ # Custom React hooks
├── lib/ # Utility functions and configurations
├── types/ # TypeScript type definitions
└── supabase/ # Supabase related configurations

## Code Organization

### Components

Components are organized by feature and follow a consistent pattern:

1. **UI Components**: Generic, reusable components live in `components/ui/`
2. **Feature Components**: Feature-specific components are grouped in their own directories
3. **Layout Components**: Page layout components are stored in `components/sections/`

Example component structure:

```typescript
"use client";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
interface ComponentProps {
// Props interface
}
export default function ComponentName({ prop1, prop2 }: ComponentProps) {
// Component logic
return (
// JSX
);
}
```

### Server Actions

Server actions are organized in the `app/actions` directory and follow this pattern:

```typescript
"use server";
import { createClient } from "@/lib/supabase/server";
export async function actionName(params: ParamType) {
  const supabase = createClient();
  // Action logic
}
```

## Styling Conventions

We use Tailwind CSS with a custom configuration that includes:

1. Custom color schemes for light/dark modes
2. Consistent border radius (`--radius: 1rem`)
3. Custom component themes

Reference to color configuration:
`src/app/globals.css`

## Database & API

### Supabase Schema

The database schema is defined in migrations and includes tables for:

- School years
- Subjects
- Exams
- Homework
- Exam types and groups
- Flashcards and decks

Reference to schema:
`supabase/migrations.sql`

### Row Level Security (RLS)

All tables implement RLS policies to ensure users can only access their own data. Example policies:

```sql
create policy "Users can view their own subjects"
on public.subjects for select
using (auth.uid() = user_id);
```

## Best Practices

1. **Type Safety**

   - Always define TypeScript interfaces for props and data structures
   - Use strict type checking
   - Place shared types in `src/types/` directory

2. **Component Structure**

   - Use function components with TypeScript
   - Implement proper prop typing
   - Use the "use client" directive when needed

3. **State Management**

   - Use React hooks for local state
   - Implement contexts for shared state
   - Keep state as close to where it's used as possible

4. **Error Handling**

   - Implement proper error boundaries
   - Use try-catch blocks in async operations
   - Provide user-friendly error messages

5. **Code Style**

   - Follow ESLint configuration
   - Use Prettier for consistent formatting
   - Follow the project's naming conventions

6. **Performance**

   - Implement proper code splitting
   - Use Next.js image optimization
   - Implement proper caching strategies

7. **Security**
   - Always validate user input
   - Implement proper authentication checks
   - Follow Supabase security best practices

## Contributing

1. **Branch Naming**

   - Feature: `feat/feature-name`
   - Bug fix: `fix/bug-description`
   - Refactor: `refactor/description`

2. **Commit Messages**

   - Use conventional commits format (e.g. `feat(subjects): add new grade calculator`)
   - Include ticket number if applicable
   - Keep messages clear and concise

3. **Pull Requests**
   - Include proper description
   - Reference related issues
   - Add necessary tests
   - Ensure all checks pass

## Testing

While the project currently doesn't have extensive testing, we plan to implement:

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright

## Documentation

- Document complex functions with JSDoc comments
- Keep README up to date
- Document API endpoints and their usage
- Include examples for complex features
