# OperantScale

Marketing website for OperantScale, built with React, TanStack Start, Vite, and Tailwind CSS.

## Local development

1. Copy `.env.example` to `.env` and provide the required server-side credentials.
2. Run `npm ci`.
3. Run `npm run dev`.

## Quality checks

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

The contact form stores a submission in Supabase before attempting Resend notifications. Secrets must remain server-side.
