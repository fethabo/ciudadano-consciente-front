import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchConcern } from "@components/Hooks/requests/Concerns";
import FormEditConcern from "@components/Forms/FormEditConcern";

export default function EditConcernDialog({open, concern, handleClose, ...rest}) {
    const [formPatch, setFormPatch] = useState(null);
    const {data, isFetching, isError, isFetchedAfterMount} = usePatchConcern({form: formPatch, concernId: concern?.concernId, enabled: !!formPatch && !!concern?.concernId})
    const queryClient = useQueryClient()
    
    useEffect(() => {
        if (data && isFetchedAfterMount) {
            setFormPatch(null);
            queryClient.resetQueries({ queryKey: ['usePatchConcern', concern.concernId ], exact: true }) 
            queryClient.resetQueries({ queryKey: ['useGetConcerns'], exact: false }) 
            handleClose();
        }else if(isError){
            setFormPatch(null)
        }
    }, [data, isError, isFetchedAfterMount, queryClient, concern, handleClose]);
    const handleSubmit = (v) =>{
        console.log("handleSubmit en dialog", v)
        const form = {...v}
        //console.log("handleSubmit en dialog", v, form)
        setFormPatch(form);
    }

    return ( <Dialog
        fullScreen        
        open={open}
                aria-labelledby="edit-concern-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Editar pregunta  <IconButton type='button'  onClick={handleClose} disabled={isFetching} ><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormEditConcern onSubmit={handleSubmit} loading={isFetching} initialValues={{concernId: concern?.concernId,
                            description: concern?.description,
                            explanation: concern?.explanation}}/>
               </DialogContent>
            </Dialog> );
}

EditConcernDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    concern: PropTypes.object,
}

