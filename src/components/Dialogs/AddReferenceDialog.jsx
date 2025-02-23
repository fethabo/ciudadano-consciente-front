import {  Dialog, DialogContent, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostReference } from "@components/Hooks/requests/References";
import FormReference from "@components/Forms/FormReference";

export default function AddReferenceDialog({open, levelId , handleClose, ...rest}) {
        
        const [formPost, setFormPost] = useState(null);
  
        const { data: referenceAdded, isFetching: isFetchingAdd, isError: isErrorAdd} = usePostReference({form: formPost, enabled: !!formPost})
        const queryClient = useQueryClient();
    
        useEffect(()=>{
            if (!isFetchingAdd){
                setFormPost(null)
                queryClient.resetQueries({ queryKey: ['useGetReferencesOfLevel', levelId], exact: true })
                handleClose();
            }else if (isErrorAdd){
                setFormPost(null)
            }
        }, [referenceAdded, isFetchingAdd, isErrorAdd, levelId, queryClient])

        const handleSubmit = (values) => {
            values.level = levelId;
            setFormPost({...values})
        }

    return ( <Dialog
                open={open}
                fullScreen
                aria-labelledby="add-reference-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Agregar Referencia en el nivel  <IconButton type='button'  onClick={handleClose}  disabled={isFetchingAdd}><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormReference onSubmit={handleSubmit} loading={isFetchingAdd}/>
                {isFetchingAdd && <LinearProgress />}
               </DialogContent>
               
            </Dialog> );
}

AddReferenceDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    levelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
