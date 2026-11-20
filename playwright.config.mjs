import { defineConfig } from "@playwright/test";

const PORT = Number(process.env.PORT || 8766);
const BASE = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "tests/integration",
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: BASE,
    trace: "on-first-retry"
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `python3 -m http.server ${PORT}`,
        url: BASE,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000
      }
});
