import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    // Enable React to support React JSX components.
    integrations: [
        react(),
    ],
    extensions: ['.astro', '.jsx'],
    middleware: [
        (req, res, next) => {
            // Si la solicitud es para el servidor, pasa al servidor
            if (req.url.startsWith("/server/")) {
                return next();
            }

            // De lo contrario, sirve la aplicación de Astro
            return renderHtml();
        },
    ],
});