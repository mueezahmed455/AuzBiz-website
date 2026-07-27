# Task 1: Install Development Dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: None
- Produces: Updated package.json with new devDependencies

**Steps:**
1. Verify these packages are not currently installed:
   ```bash
   npm list @tanstack/react-query zod @hookform/resolvers @headlessui/react @heroicons/react next-i18next
   ```
   Expected: Error showing packages not found

2. Install the dependencies:
   ```bash
   npm install -D @tanstack/react-query zod @hookform/resolvers @headlessui/react @heroicons/react next-i18next
   ```

3. Verify installation:
   ```bash
   npm list @tanstack/react-query zod @hookform/resolvers @headlessui/react @heroicons/react next-i18next
   ```
   Expected: List showing installed versions

4. Commit changes:
   ```bash
   git add package.json package-lock.json
   git commit -m "feat: add core dependencies for RTQ, forms, UI, i18n"
   ```