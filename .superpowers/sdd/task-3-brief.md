# Task 3: Configure Tailwind CSS

**Files:**
- Create: `tailwind.config.ts`
- Modify: `postcss.config.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: None
- Produces: Tailwind configuration and base styles

**Steps:**
1. Check if tailwind config exists:
   ```bash
   test -f tailwind.config.ts && echo "exists" || echo "missing"
   ```
   Expected: "missing"

2. Create tailwind.config.ts with the specified configuration (including custom colors for navy and gold, border radius, font family, animations)

3. Update postcss.config.mjs (if needed - verify it imports tailwindcss correctly)

4. Update globals.css with CSS variables for light and dark modes (including the custom navy and gold colors)

5. Verify Tailwind is working by checking class generation:
   ```bash
   # Start dev server briefly to check CSS generation
   npm run dev &
   sleep 5
   curl -s http://localhost:3000 | grep -i "text-navy-800" || echo "Tailwind classes not found"
   kill %1
   ```
   Expected: Should find Tailwind classes in generated HTML

6. Commit changes:
   ```bash
   git add tailwind.config.ts postcss.config.mjs src/app/globals.css
   git commit -m "feat: configure Tailwind CSS with custom design tokens"
   ```