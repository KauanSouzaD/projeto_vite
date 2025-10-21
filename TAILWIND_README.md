# Tailwind setup for this project

This file explains how Tailwind is configured in this repository.

Files of interest:

- `tailwind.config.js` — Tailwind config with content globs
- `postcss.config.cjs` — PostCSS using `@tailwindcss/postcss` and `autoprefixer`
- `src/index.css` — imports Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

Run locally:

```powershell
npm install
npm run dev
```

If you want me to overwrite the original README.md with the Tailwind instructions, tell me and I'll replace it.
