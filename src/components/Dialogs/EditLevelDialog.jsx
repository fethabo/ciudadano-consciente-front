import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { usePatchLevel } from "../Hooks/requests/Level";
import FormLevel from "../Forms/FormLevel";
import { useQueryClient } from "@tanstack/react-query";

export default function EditLevelDialog({open, level, handleClose, path,...rest}) {
    const [formPatch, setFormPatch] = useState(null);
    const {data, isFetching, isError} = usePatchLevel({form: formPatch, levelId: level?.levelId, enabled: !!formPatch && !!level?.levelId})
    const queryClient = useQueryClient()
    
    useEffect(() => {
        if (data){
            setFormPatch(null);
            queryClient.resetQueries({ queryKey: ['useGetLevelChildrens', path], exact: true }) 
            queryClient.resetQueries({ queryKey: ['usePatchLevel', level.levelId ], exact: true }) 
            handleClose();
        }else if(isError){
            setFormPatch(null)
        }
    }, [data, isError]);//eslint-disable-line

    const handleSubmit = (v) =>{
        console.log("handleSubmit en dialog", v)
        const form = {...v}
        console.log("handleSubmit en dialog", v, form)
        setFormPatch(form);
    }

    return ( <Dialog
                open={open}
                aria-labelledby="edit-level-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Editar nivel  <IconButton type='button'  onClick={handleClose} disabled={isFetching} ><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormLevel onSubmit={handleSubmit} loading={isFetching} initialValues={level}/>
               </DialogContent>
            </Dialog> );
}

EditLevelDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    level: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

