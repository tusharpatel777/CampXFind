// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Add this safelist configuration
  safelist: [
    // Ensure Tailwind generates these classes for dynamic usage in GlassCard
    'text-blue-300', 'text-green-300', 'text-yellow-300',
    'bg-blue-500', 'hover:bg-blue-600',
    'bg-green-500', 'hover:bg-green-600',
    'bg-yellow-500', 'hover:bg-yellow-600',
    'border-blue-400/40', 'shadow-[0_0_30px_rgba(59,130,246,0.35)]', 'hover:shadow-[0_0_55px_rgba(59,130,246,0.6)]',
    'border-green-400/40', 'shadow-[0_0_30px_rgba(34,197,94,0.35)]', 'hover:shadow-[0_0_55px_rgba(34,197,94,0.6)]',
    'border-yellow-400/40', 'shadow-[0_0_30px_rgba(234,179,8,0.35)]', 'hover:shadow-[0_0_55px_rgba(234,179,8,0.6)]',
    // Add other dynamic classes if any more are introduced
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}