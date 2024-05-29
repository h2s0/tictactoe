import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { env } from "node:process";
import obfuscator from 'rollup-plugin-obfuscator';

const isDev = env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    !isDev && obfuscator({
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      disableConsoleOutput: true,
      stringArray: true,
      rotateStringArray: true,
      rotateStringArrayEnabled: true,
      stringArrayThreshold: 0.75,
      transformObjectKeys: true,
      splitStrings: true,
      splitStringsChunkLength: 10
    })
  ].filter(Boolean),
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: isDev
        ? "[name]_[local]__[hash:base64:5]"
        : "[hash:base64:4]",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
