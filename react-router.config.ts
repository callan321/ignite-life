/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Add this future flag to fix the useContext null error
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
