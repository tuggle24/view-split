import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: require.resolve("vue/dist/vue.js"),
    },
  },
  plugins: [createVuePlugin()],
});
