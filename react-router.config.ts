/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Add this future flag to fix the useContext null error
  future: {
    unstable_optimizeDeps: true,
  },
  presets: [vercelPreset()],
} satisfies Config;
