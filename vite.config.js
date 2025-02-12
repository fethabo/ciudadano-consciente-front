import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import path from 'path';
import {lottie} from 'vite-plugin-lottie';


// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), 
            dynamicImportVars({
                // options
                include:['js','jsx']
              }),
              lottie()
    ],
    
    resolve: {
      alias: {
        // Define alias para directorios
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        // También puedes definir alias para rutas específicas
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@templates': path.resolve(__dirname, 'public/templates'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@security': path.resolve(__dirname, 'src/security'),
        '@animations': path.resolve(__dirname, 'src/assets/animations'),
        
      }
    },
    assetsInclude: ["**/*.lottie"],
    server: {
      host: true,
      port: 5173
    }
})
