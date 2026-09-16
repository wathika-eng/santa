# Cloudflare deployment

This frontend runs on Cloudflare Workers. Wrangler serves the generated `dist` directory, falls back to `index.html` for routes such as `/readings`, `/events`, and `/giving`, and runs the Worker first for `/api/*` requests.

```bash
bun install --frozen-lockfile
bun run deploy:cf:dry
bun run deploy:cf
```

The `_headers` file gives fingerprinted bundles and fonts a one-year immutable cache. Parish images use a seven-day cache with stale-while-revalidate so updated photographs can still replace an existing filename.

The `/api/liturgical-calendar` Worker endpoint fetches compact day titles from Universalis, caches dated upstream responses at the edge, and returns available days even when one upstream request fails.
