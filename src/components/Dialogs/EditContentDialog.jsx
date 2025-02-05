import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetContentImages, usePatchContent, usePostContentImage } from "../Hooks/requests/Content";
import FormEditContent from "@components/Forms/FormEditContent";
import ImageControl from "@components/ImageControl";

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
    fullScreen
                open={open}
                aria-labelledby="edit-content-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Editar content  <IconButton type='button'  onClick={handleClose} disabled={isFetching} ><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormEditContent onSubmit={handleSubmit} loading={isFetching} initialValues={content}/>
                    <ImageControl useFetchImages={useGetContentImages} useUploadImage={usePostContentImage} paramsGet={{contentId:content?.contentId}} paramsUpload={{contentId:content?.contentId}}/>

               </DialogContent>
            </Dialog> );
}

EditContentDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    content: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
