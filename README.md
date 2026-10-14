# CF-Server-Monitor Theme Design

Vue 3 + Vite third-party theme for CF-Server-Monitor.

## Local build

```bash
pnpm install
pnpm run build
```

The production files are written to `dist/`.

## GitHub Pages build

The workflow in `.github/workflows/deploy-dist.yml` builds on pushes to `main` or `master` and appends the result to the `dist` branch. Enable `Settings → Actions → General → Workflow permissions → Read and write permissions`.

Add these repository Secrets when needed: `API_BASE`, `TITLE`, `BACKGROUND_IMAGE`, `CSP_API`, and `CSP_STATIC`.

In CF-Server-Monitor, use the URL of the `dist` branch (prefer a commit-specific URL):

```text
https://github.com/<owner>/<repository>/tree/<commit-id>/dist
```

If GitHub Pages serves the theme from another origin, configure that origin in the Worker `CORS_ALLOWED_ORIGINS` environment variable.
