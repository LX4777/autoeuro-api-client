# Agent Guidelines for Autoeuro API Client

This document provides guidelines for AI agents working on the Autoeuro API Client repository. It includes build/lint/test commands, code style conventions, and project-specific patterns.

## Project Overview

TypeScript-based API client for the Autoeuro web service. The project exports both ESM and CommonJS builds. Source code is in `src/`, with tests in `src/__tests__/`. The main entry point is `src/AutoeuroService.ts`.

## Build Commands

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm run build`     | Clean `dist/` and build both CJS and ESM outputs  |
| `npm run build:cjs` | Build CommonJS version to `dist/cjs/`             |
| `npm run build:esm` | Build ESM version to `dist/esm/`                  |
| `npm start`         | Run the example from `dist/esm/examples/index.js` |
| `npm run start:dev` | Build and start dev server (nodemon)              |
| `npm run dev`       | Start development server with nodemon             |

## Lint and Format Commands

| Command          | Description                       |
| ---------------- | --------------------------------- |
| `npm run lint`   | Run ESLint on `src/` directory    |
| `npm run format` | Format source files with Prettier |

- ESLint configuration: `eslint.config.js` uses `typescript-eslint` with strict, stylistic, and recommended type-checked rules. Note that the config uses ES modules; Node.js 20+ is recommended for linting.
- Prettier configuration: `.prettierrc` enforces:
  - Trailing comma: `all`
  - Single quotes: `true`
  - Print width: `120`
  - Tab width: `2`

**Always run `npm run lint` and `npm run format` after making changes.**

## Test Commands

| Command                                          | Description                       |
| ------------------------------------------------ | --------------------------------- |
| `npm test`                                       | Run all tests with Jest           |
| `npm test -- --testNamePattern="pattern"`        | Run tests matching a name pattern |
| `npx jest src/__tests__/AutoeuroService.test.ts` | Run a specific test file          |
| `npx jest --testPathPattern=AutoeuroService`     | Run tests matching a path pattern |

- Jest configuration: `jest.config.js` uses `ts-jest` preset, Node environment, and matches `*.test.ts`/`*.spec.ts` files.
- Test files are co-located with source files in `src/__tests__/`.
- Mocking: Axios is mocked using `jest.mock('axios')`. See existing tests for patterns.

## Code Style Guidelines

### TypeScript Configuration

- Strict mode enabled (`strict: true`).
- Target: `ES2017`.
- Module resolution: `node` (CJS) / `nodenext` (ESM).
- Declaration files are generated in `dist/types/`.
- Base URL: `./src`, paths mapping `"*": ["*"]`.

### Imports

- Use ES module imports.
- For type‑only imports, use `import type { ... } from '...'`.
- When importing from local files, include the `.js` extension (even for TypeScript files). Example:
  ```ts
  import { ApiClient } from './app/ApiClient.js';
  import type { Response } from './types/Response.js';
  ```
- Group imports: external dependencies first, then internal modules.
- Avoid relative paths that go beyond one level up; use base‑URL‑relative paths if needed.

### Naming Conventions

- **Classes**: `PascalCase` (e.g., `AutoeuroService`, `ApiClient`).
- **Methods / functions**: `camelCase` (e.g., `getBalance`, `searchItems`).
- **Variables / parameters**: `camelCase`.
- **Type / Interface**: `PascalCase` (e.g., `GetBalanceResponse`, `ApiClientConfig`).
- **Constants**: `UPPER_SNAKE_CASE` if exported, otherwise `camelCase`.
- **Private properties/methods**: prefix with `private` keyword and use `camelCase`.

### Formatting

- Indent with 2 spaces.
- Maximum line length 120 characters.
- Use single quotes for strings.
- Trailing commas in multiline object/array definitions.
- Braces on same line (K&R style).

### Error Handling

- The API returns error responses as part of the `Response` union type (`ERROR` field). Do not throw exceptions for business‑logic errors; let the caller handle the `ERROR` object.
- Network/axios errors may be thrown; these are caught by the caller.
- No custom validation library is used; keep dependencies minimal.

### Comments

- Use JSDoc‑style comments for public methods (in Russian, as per existing code).
- Inline comments can be in Russian or English; maintain consistency with surrounding code.
- Comment complex logic or workarounds (e.g., type conversions due to API inconsistencies).

### File Structure

```
src/
├── app/           # Core API client infrastructure
├── types/         # TypeScript type definitions
├── __tests__/     # Jest test files
└── examples/      # Usage examples
```

- Place new types in `src/types/`.
- Place new API methods in `src/AutoeuroService.ts` (or create a new service class if needed).
- Test files should mirror the source file name with `.test.ts` suffix.

## Testing Patterns

- Mock `global.fetch` using `jest.fn()` to mock HTTP requests.
- Mock responses should match the `Response<T>` shape.
- Write descriptive test names in Russian (e.g., `'тест /get_balance'`).
- Use `it` blocks for individual test cases, grouped under `describe('AutoeuroService', ...)`.
- Use `beforeEach` to reset mocks and create a fresh service instance.
- Assert both the returned data and the mock call arguments.

Example snippet:

```ts
it('тест /get_balance', async () => {
  const mockData: GetBalanceResponse = { ... };
  mockedFetch.mockResolvedValue({
    ok: true,
    json: async () => mockData,
  });
  const result = await service.getBalance();
  expect(result.DATA[0]).toEqual(mockData.DATA[0]);
  expect(mockedFetch).toHaveBeenCalledWith('/get_balance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      key: '',
    },
    body: undefined,
    signal: expect.any(AbortSignal),
  });
});
```

## Git Hooks

- Husky pre‑commit hook runs `npm run lint`. Ensure lint passes before committing.
- Do not bypass hooks.

## Additional Notes

- The project uses **Husky** for Git hooks and **rimraf** for cleaning directories.
- There are no Cursor (`/.cursor/rules/`) or Copilot (`/.github/copilot-instructions.md`) rules.
- The README is in Russian; keep any user‑facing documentation in Russian.
- Version 2.0+ uses native `fetch` API instead of axios, requiring Node.js 18+.
- When adding new API endpoints, follow the existing pattern:
  1. Add request data type in `src/types/RequestData.ts`.
  2. Add response type in `src/types/Response.ts`.
  3. Implement method in `AutoeuroService` that calls `this.request<T>()` and uses `this.getResponse<T>()`.
  4. Add type conversions if the API returns strings instead of numbers (document the discrepancy).
  5. Write comprehensive tests.
- Run `npm run build` to ensure TypeScript compilation passes before committing.
- Avoid adding new dependencies unless absolutely necessary.

## Quick Reference

```bash
# Build the project
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Run all tests
npm test

# Run a single test file
npx jest src/__tests__/AutoeuroService.test.ts

# Run tests matching a name
npm test -- --testNamePattern="get_balance"
```

**Always verify lint and test passes before considering the task complete.**
