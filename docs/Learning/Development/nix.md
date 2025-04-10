# Backend Development Essentials

## Python

- **Core concepts**: Variables, data types, control structures (if/else, loops), functions, modules
- **OOP**: Classes, inheritance, encapsulation, polymorphism
- **Functional features**: List comprehensions, lambda functions, map/filter/reduce
- **Package management**: pip, virtual environments (venv)
- **Standard library**: os, sys, datetime, json, csv, requests

## unittest

- **Built-in testing framework** for Python
- **Basic structure**: TestCase classes, setUp/tearDown methods
- **Assertions**: assertEqual, assertTrue, assertRaises, etc.
- **Test discovery**: Running tests with patterns
- **Test runners**: Running single tests or test suites

## pytest

- **Modern testing framework** with simpler syntax than unittest
- **Fixtures**: Reusable test resources and setup/teardown
- **Parametrization**: Running tests with multiple inputs
- **Markers**: Categorizing and selecting tests
- **Plugins**: Extending functionality (coverage, mock, etc.)
- **Assertions**: Simple assert statements with rich failure messages

## SQLAlchemy

- **ORM (Object Relational Mapper)** for database interactions
- **Engine and Connection**: Database connectivity
- **Declarative Base**: Defining database models
- **Session**: Managing database transactions
- **Relationships**: one-to-many, many-to-many
- **Querying**: filter, join, order_by, group_by, etc.
- **Migrations**: Schema versioning (often used with Alembic)

## FastAPI

- **Modern, high-performance web framework** based on Python type hints
- **Path operations**: Defining API endpoints (GET, POST, etc.)
- **Path parameters** and **query parameters**
- **Request body**: Using Pydantic models for validation
- **Dependency injection** system
- **Automatic documentation**: Swagger UI and ReDoc
- **Authentication**: OAuth2, JWT, etc.

## Typer

- **CLI builder** based on Python type hints (from FastAPI creator)
- **Commands and subcommands**: Structured CLI apps
- **Arguments and options**: Accepting user input
- **Help text generation**: Automatic documentation
- **Completion support**: Tab completion for shells

## Alembic

- **Database migration tool** designed for SQLAlchemy
- **Migration environment**: Setting up the migration directory
- **Revision scripts**: Creating and applying migrations
- **Commands**: init, revision, upgrade, downgrade, etc.
- **Auto-generation**: Creating migrations from model changes
- **Branch management**: Handling multiple migration paths

# Frontend Development Essentials

## React

- **Component-based library** for building user interfaces
- **JSX**: XML-like syntax for describing UI
- **Components**: Function components vs class components
- **Props**: Passing data down to components
- **State**: Managing component data with useState
- **Lifecycle**: Using useEffect for side effects
- **Hooks**: useState, useEffect, useContext, useRef, etc.
- **Context API**: Sharing state across components

## NextUI

- **Component library** for React applications
- **Pre-built components**: Buttons, cards, inputs, modals, etc.
- **Theming**: Customizing look and feel
- **Dark mode support**
- **Responsive layouts**
- **Accessibility** features built-in

## TailwindCSS

- **Utility-first CSS framework**
- **Utility classes**: Applying styles directly in HTML/JSX
- **Responsive design**: Breakpoint prefixes (sm:, md:, lg:, etc.)
- **Customization**: Extending theme in tailwind.config.js
- **JIT (Just-In-Time) compiler**: On-demand utility generation
- **Plugins**: Extending functionality
- **@apply directive**: Extracting utility patterns

## TypeScript (basic)

- **Typed superset of JavaScript**
- **Type annotations**: Specifying types for variables, parameters, etc.
- **Interfaces and types**: Defining custom types
- **Type inference**: Automatic type detection
- **Generics**: Creating reusable components with different types
- **Type assertions**: Overriding inferred types
- **Type checking**: Catching errors at compile time

## TanStack Router

- **Type-safe routing** for React applications
- **File-based routing** options
- **Route parameters** and **search parameters**
- **Nested routes** and **layouts**
- **Route guards** and **loaders**
- **Navigation**: Link component and programmatic navigation

## TanStack Query (formerly React Query)

- **Data fetching and state management** library
- **Queries**: Fetching and caching data
- **Mutations**: Updating data on the server
- **Caching**: Automatic caching and stale-while-revalidate
- **Pagination** and **infinite scrolling**
- **Query invalidation**: Refreshing data when needed
- **Dependent queries**: Queries that depend on others

## Vite (with file-based routing)

- **Fast, modern build tool** for frontend development
- **Dev server**: Hot Module Replacement (HMR)
- **Build optimization**: Faster production builds
- **Plugin system**: Extending functionality
- **File-based routing**: Organizing routes by file structure
- **Environment variables**: Managing different environments
- **Static asset handling**: Importing and optimizing assets
