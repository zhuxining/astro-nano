import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["LXGW WenKai","LXGW WenKai TC", ...defaultTheme.fontFamily.sans],
        serif: ["LXGW WenKai","LXGW WenKai TC", ...defaultTheme.fontFamily.serif],
        mono: ["LXGW WenKai Mono TC", "monospace", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
