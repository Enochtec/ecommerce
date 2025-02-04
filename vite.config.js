import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://ridexpress.vercel.app",
      routes: ["/", "/book-ride", "/contact"],
    }),
  ],
  ssr: {
    prerender: true,  // Enables prerendering for better SEO
  }
})

// import { defineConfig } from 'vite';

// export default defineConfig({
//   resolve: {
//     alias: {
//       '@': '/src', // Resolves '@' to the 'src' folder
//     },
//   },
// });
