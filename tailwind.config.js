/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './wwwroot/*.html',
    './wwwroot/**/*.html',
    './wwwroot/js/*.js',
    './wwwroot/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-blue-100',
    'bg-gray-200',
    'hover:shadow-md',
    'shadow-md',
    'transition-shadow',
    'py-10',
    'max-h-[90vh]',
    'overflow-y-auto',
    'w-8',
    'h-8',
    'p-3',
    'hover:text-gray-800',
    'py-1.5',
  ],
}