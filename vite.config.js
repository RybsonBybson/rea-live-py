import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import settings from "./settings.json";
import path from "path";

const port = settings.server.port;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false,
    port: port,
  },
  resolve: {
    alias: {
      settings: path.join(__dirname, "settings.json"),
    },
  },
});
