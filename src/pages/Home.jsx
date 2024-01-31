import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { Alert, Card, CardContent, Typography } from "@mui/material"

export default function Home (){
    
    return(
        <>
            <div>
              <Typography variant='h4'>Ciudadano Consciente</Typography>
             <Card><CardContent>Contenido del home</CardContent><Alert severity='error'>Definir layout antes de seguir(condicionará la navegación) </Alert></Card>
            </div>
            
            
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </>

    )
}