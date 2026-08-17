import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [
      tailwindcss(),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/*.server.*"], specifiers: ["server-only"] },
        },
      }),
      react(),
      nitro({ preset: "vercel" }),
    ],
    resolve: {
      tsconfigPaths: true,
      dedupe: ["react", "react-dom"],
    },
  };
});
