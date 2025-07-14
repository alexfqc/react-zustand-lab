import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
    define: {
      "import.meta.env.VITE_REHYDRATE_DELAY": JSON.stringify(
        env.VITE_REHYDRATE_DELAY,
      ),
    },
  };
});
