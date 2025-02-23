import {  Dialog, DialogContent, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchReference } from "@components/Hooks/requests/References";
import FormReference from "@components/Forms/FormReference";

export default function EditReferenceDialog({open, reference, handleClose, ...rest}) {
  
  const queryClient = useQueryClient();
  const [formPatch, setFormPatch] = useState(null);
  const { data: referencePatched, isFetching: isFetchingPatch, isError: isErrorPatch} = usePatchReference({referenceId: formPatch?.referenceId, form: formPatch, enabled: !!formPatch})

  useEffect(()=>{
      if (!isFetchingPatch){
          setFormPatch(null)
          queryClient.resetQueries({ queryKey: ['useGetReferencesOfLevel', reference?.level], exact: true })
      }else if(isErrorPatch){
          setFormPatch(null)
      }
  }, [referencePatched, isFetchingPatch, isErrorPatch, reference, queryClient])	

    
        const handleSubmit = (values) => {
            setFormPatch({...values})
           
        }

    return ( <Dialog
                open={open}
                fullScreen
                aria-labelledby="edit-reference-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Editar Referencia en el nivel  <IconButton type='button'  onClick={handleClose}  disabled={isFetchingPatch}><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormReference onSubmit={handleSubmit} loading={isFetchingPatch} initialValues={reference} />
                {isFetchingPatch && <LinearProgress />}
               </DialogContent>
               
            </Dialog> );
}

EditReferenceDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    reference: PropTypes.object
}
