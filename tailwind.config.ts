import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
<<<<<<< HEAD
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
=======
  content: ['./src/**/*.{html,js,svelte,ts}'],
>>>>>>> 9bd946e (idk what I changed)
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins"],
<<<<<<< HEAD
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
=======
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
>>>>>>> 9bd946e (idk what I changed)
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
<<<<<<< HEAD
    'sr-only'
  ]
} satisfies Config

=======
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
>>>>>>> 9bd946e (idk what I changed)
