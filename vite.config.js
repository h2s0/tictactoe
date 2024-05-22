import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { env } from "node:process";
import obfuscator from 'rollup-plugin-obfuscator';

const idDev = env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [
  react(),
  obfuscator({
    controlFlowFlattening: true,
    rotateStringArray: true,
    deadCodeInjection: true,
    disableConsoleOutput: true,
    stringArray: true,
  })
],
 css: {
   devSourcemap: true,
   modules: {
     generateScopedName: idDev
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