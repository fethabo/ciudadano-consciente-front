import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from "react-router-dom";
import useMap from "./Hooks/useMap";

export default function WindowLevel({open,level,activity,handleClose, config, ...rest}) {
    const location= useLocation();
    const navigate=useNavigate();
    const { setLevelSelected } = useMap();

    return ( <Dialog
                open={open}
                aria-labelledby="level-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Level: {level?.levelId}  <IconButton type='button'  onClick={handleClose} ><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    {activity?.description}
               </DialogContent>
               <DialogActions>
                {/* {DEFINIR SI LA RUTA para acceder a la actividad puede ser directa, o si si o si tenemos que entrar desde el mapa. (manejando qué actividad manejar desde un contexto) */}
                    {config && 
                      <Button onClick={()=>{setLevelSelected(level); navigate(`${location.pathname}/activity/config`)}}>Configurar</Button>
                    }
                    <Button onClick={()=>{setLevelSelected(level); navigate(`${location.pathname}/activity`)}}>Iniciar</Button>
               </DialogActions>
            </Dialog> );
}

WindowLevel.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    level: PropTypes.object,
    activity: PropTypes.object,
    config: PropTypes.bool
}

