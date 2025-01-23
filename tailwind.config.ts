import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import flowbitePlugin from "flowbite/plugin"

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins"],
      }
    },
  },
  plugins: [
    flowbitePlugin
  ],
  safelist: [
    'bg-slate-500',
    'text-slate-500',
    'bg-green-600',
    'text-green-600',
    'bg-amber-700',
    'text-amber-700',
    'bg-sky-700',
    'text-sky-700',
    'bg-indigo-700',
    'text-indigo-700',
    'sr-only',
    'container'
  ],
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  }
} satisfies Config;
