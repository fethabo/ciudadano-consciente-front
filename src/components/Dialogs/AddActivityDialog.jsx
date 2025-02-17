import {  Dialog, DialogContent, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostActivity } from "../Hooks/requests/Activity";
import FormActivity from "../Forms/FormActivity";

export default function AddActivityDialog({open, idLevel , handleClose, path,...rest}) {
    const [formPost, setFormPost] = useState(null);
    const {data, isFetching, isError} = usePostActivity({form: formPost, enabled: !!formPost})
    const queryClient = useQueryClient()
   
    useEffect(() => {
        if (data){
            setFormPost(null);
            queryClient.resetQueries({ queryKey: ['useGetLevelChildrens', path], exact: true }) // fuerzo la lectura del mapa actualizado
            queryClient.resetQueries({ queryKey: "usePostActivity", exact: true }) 
            handleClose();
      
        }else if(isError){
            setFormPost(null)
        }
    }, [data, isError]);//eslint-disable-line

    const handleSubmit = (v) =>{
        console.log("handleSubmit en dialog", v)
//Description y content viene del formulario, solo debo agregar level
        const form = {...v, level: idLevel}
        setFormPost(form);
    }

    return ( <Dialog
                open={open}
                fullScreen
                aria-labelledby="add-level-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Agregar Actividad  <IconButton type='button'  onClick={handleClose}  disabled={isFetching}><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormActivity onSubmit={handleSubmit} loading={isFetching}/>
                {isFetching && <LinearProgress />}
               </DialogContent>
               
            </Dialog> );
}

AddActivityDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    idLevel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

