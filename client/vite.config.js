import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-icons/bi', 'react-icons/ai', 'react-icons/fi', 'react-icons/md', 'react-icons/ri', 'react-icons/bs', 'react-icons/gi', 'react-icons/fa', 'react-icons/io', 'react-icons/im', 'react-icons/io5', 'react-icons/si', 'react-icons/ti', 'react-icons/vsc', 'react-icons/wi', 'react-icons/go', 'react-icons/g'],
    },
  },
})
