import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchActivity } from "../Hooks/requests/Activity";
import FormActivity from "../Forms/FormActivity";
import { usePatchContent } from "../Hooks/requests/Content";
import FormContent from "../Forms/FormContent";

export default function EditContentDialog({open, content, handleClose, path,...rest}) {
    const [formPatch, setFormPatch] = useState(null);
    const {data, isFetching, isError} = usePatchContent({form: formPatch, contentId: content?.contentId, enabled: !!formPatch && !!content?.contentId})
    const queryClient = useQueryClient()
    
    useEffect(() => {
        if (data){
            setFormPatch(null);
            queryClient.resetQueries({ queryKey: ['usePatchContent', content.contentId ], exact: true }) 
            handleClose();
        }else if(isError){
            setFormPatch(null)
        }
    }, [data, isError]);//eslint-disable-line

    const handleSubmit = (v) =>{
        const form = {...v}
        setFormPatch(form);
    }

    return ( <Dialog
                open={open}
                aria-labelledby="edit-content-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Editar content  <IconButton type='button'  onClick={handleClose} disabled={isFetching} ><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormContent onSubmit={handleSubmit} loading={isFetching} initialValues={content}/>
               </DialogContent>
            </Dialog> );
}

EditContentDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    content: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
