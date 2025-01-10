/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        poppins: ["Poppins"],
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
}

