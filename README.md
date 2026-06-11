# Endless Passport

Website for Brian's travel-talk business — endlesspassport.com. Travel talks (in-person Chicago / Zoom / pre-recorded), trip consultations, blog, and sponsor pages.

Originally built in Figma Make (file: [Upload multiple photos](https://www.figma.com/design/9PXpLRy4zTniPo6o1WqILP/Upload-multiple-photos)), exported June 2026 and self-hosted from this repo so it no longer depends on a Figma subscription.

## Stack

- Vite + React 18 + React Router 7, Tailwind 4, shadcn/ui, react-globe.gl
- Backend: Supabase edge function (`supabase/functions/server`) — form submissions, admin dashboard (`/admin`), blog CMS, newsletter broadcast via Resend. The function is already deployed on Supabase and runs independently of this repo.

## Develop

```sh
pnpm install   # npm chokes on this package.json; use pnpm
pnpm dev
pnpm build     # outputs dist/
```

## Notes

- Images were converted from Figma's PNG exports to WebP (`scripts/convert-images.mjs`). Source code still imports `figma:asset/<hash>.png` — the resolver in `vite.config.ts` maps those to the `.webp` files.
- The admin password is the `ADMIN_PASSWORD` secret in Supabase (Edge Functions → Secrets). The server fails closed if it is not set.
- Deploying frontend changes = rebuild + publish `dist/`. Deploying server changes requires `supabase functions deploy` against project `wjvxqsfbsxxrcfveweli`.
