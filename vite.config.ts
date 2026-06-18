import { config as loadDotenv } from "dotenv";
import path from "path";
import { defineConfig, loadEnv, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import { createViteFormApiMiddleware } from "./server/viteApiMiddleware.js";

loadDotenv({ path: path.resolve(process.cwd(), ".env"), quiet: true });
loadDotenv({ path: path.resolve(process.cwd(), ".env.local"), override: true, quiet: true });

function attachFormApi(server: ViteDevServer | PreviewServer, env: Record<string, string>): void {
  server.middlewares.use(createViteFormApiMiddleware(env));
}

export default defineConfig(({ mode }) => {
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), ""),
  } as Record<string, string>;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: true },
    },
    preview: {
      port: 8080,
      host: "::",
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      {
        name: "certifygrc-form-api",
        configureServer(server: ViteDevServer) {
          attachFormApi(server, env);
        },
        configurePreviewServer(server: PreviewServer) {
          attachFormApi(server, env);
        },
      },
    ].filter(Boolean),

    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});
