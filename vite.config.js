import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
            dynamicImportVars({
                // options
                include:['js','jsx']
              })
    ],
  
})
