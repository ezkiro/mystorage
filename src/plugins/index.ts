/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import GoogleSignInPlugin from "vue3-google-signin";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  loadFonts();
  app
    .use(vuetify)
    .use(router)
    .use(GoogleSignInPlugin, {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
    });
}
