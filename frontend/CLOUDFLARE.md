# Cloudflare deployment

This frontend is configured as a static single-page application on Cloudflare Workers. Wrangler serves the generated `dist` directory and falls back to `index.html` for routes such as `/readings`, `/events`, and `/giving`.

```bash
bun install --frozen-lockfile
bun run deploy:cf:dry
bun run deploy:cf
```

The `_headers` file gives fingerprinted bundles and fonts a one-year immutable cache. Parish images use a seven-day cache with stale-while-revalidate so updated photographs can still replace an existing filename.
