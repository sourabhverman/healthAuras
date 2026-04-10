import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE?.trim() || "/";

  return {
    base,
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    build: {
      rollupOptions: {
        input: {
          main:     path.resolve(__dirname, "index.html"),
          products: path.resolve(__dirname, "products/index.html"),
          about:    path.resolve(__dirname, "about/index.html"),
          clients:  path.resolve(__dirname, "clients/index.html"),
          partners: path.resolve(__dirname, "partners/index.html"),
          contact:  path.resolve(__dirname, "contact/index.html"),
        },
      },
    },
  };
});
