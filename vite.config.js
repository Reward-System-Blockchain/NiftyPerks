import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middleware: {
      // If no routes match, send the index.html file
      // This allows client-side routing to work
      after: (req, res) => {
        res.statusCode = 200;
        res.end(fs.readFileSync('dist/index.html'));
      },
    },
  },
})
