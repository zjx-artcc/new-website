import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins"],
      },
      colors: {
        primary: {
          //Flowbite-svelte
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        }
      }
    },
  },
  plugins: [],
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
    'sr-only'
  ]
} satisfies Config

