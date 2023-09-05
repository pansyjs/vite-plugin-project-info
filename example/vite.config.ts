import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { projectInfo } from '@pansy/vite-plugin-project-info';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    projectInfo(),
  ],
})
