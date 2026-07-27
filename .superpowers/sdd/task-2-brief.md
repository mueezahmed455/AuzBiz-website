# Task 2: Set Up Testing Framework

**Files:**
- Modify: `package.json`
- Create: `jest.config.ts`
- Create: `src/test-utils/test-utils.tsx` (actually setup.ts based on plan)

**Interfaces:**
- Consumes: None
- Produces: Jest configuration and test utilities

**Steps:**
1. Check if jest config exists:
   ```bash
   test -f jest.config.ts && echo "exists" || echo "missing"
   ```
   Expected: "missing"

2. Install testing dependencies:
   ```bash
   npm install -D @types/jest jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

3. Create jest.config.ts:
   ```typescript
   import type { Config } from 'jest';

   const config: Config = {
     preset: 'ts-jest',
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
     moduleNameMapping: {
       '^@/(.*)$': '<rootDir>/src/$1',
     },
     testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
     collectCoverageFrom: [
       'src/**/*.{ts,tsx}',
       '!src/**/*.d.ts',
       '!src/app/**',
     ],
   };

   export default config;
   ```

4. Create test utilities setup:
   ```typescript
   // src/test-utils/setup.ts
   import '@testing-library/jest-dom';
   ```

5. Add test scripts to package.json:
   ```json
   {
     "scripts": {
       "test": "jest",
       "test:watch": "jest --watch",
       "test:coverage": "jest --coverage"
     }
   }
   ```

6. Create a placeholder test to verify setup:
   ```typescript
   // src/__tests__/placeholder.test.tsx
   import { describe, expect, test } from '@jest/globals';

   describe('Placeholder test', () => {
     test('should pass', () => {
       expect(true).toBe(true);
     });
   });
   ```

7. Run tests to verify setup:
   ```bash
   npm test
   ```
   Expected: 1 passed

8. Commit changes:
   ```bash
   git add jest.config.ts src/test-utils/setup.ts src/__tests__/placeholder.test.tsx package.json
   git commit -m "feat: add Jest testing framework with React Testing Library"
   ```