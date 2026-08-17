// `src/server.ts` handles SSR errors. Keep the Start configuration data-only:
// importing `createMiddleware` here causes Nitro's Vercel output to form a
// circular cold-start dependency with TanStack's built-in CSRF middleware.
export const startInstance = {
  getOptions: async () => ({}),
};
