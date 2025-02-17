import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchContent } from "../Hooks/requests/Content";
import FormEditContent from "@components/Forms/FormEditContent";
import ImageControl from "@components/ImageControl";
import TagsControl from "@components/TagsControl";

export default function EditContentDialog({open, content, handleClose, ...rest}) {
    const [formPatch, setFormPatch] = useState(null);
    const {data, isFetching, isError} = usePatchContent({form: formPatch, contentId: content?.contentId, enabled: !!formPatch && !!content?.contentId})
    const queryClient = useQueryClient()

    useEffect(() => {
        if (data){
            setFormPatch(null);
            queryClient.resetQueries({ queryKey: ['usePatchContent', content.contentId ], exact: true }) 
            queryClient.resetQueries({ queryKey: ['useGetContents'], exact: false }) //para actualizar las opciones de la actividad
            queryClient.resetQueries({ queryKey: ['useGetContentsOfUser'], exact: false }) //para actualizar las opciones de la actividad
            queryClient.resetQueries({ queryKey: ['useGetContentsOfOrganization', content.organization], exact: true }) //para actualizar las opciones de la actividad
            handleClose();
        }else if(isError){
            setFormPatch(null)
        }
    }, [data, isError]);//eslint-disable-line

    const handleSubmit = (v) =>{
        const formData = new FormData();
        formData.append("content", v.contentId);
        formData.append("model", JSON.stringify(v.model));
        formData.append("description", v.description)
        formData.append("publicContent", v.publicContent)
        setFormPatch(formData);
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
                    <FormEditContent onSubmit={handleSubmit} loading={isFetching} content={content}/>
                    <TagsControl entityId={content?.contentId?.toString()} entityType={"contents"} />
                    <ImageControl contentId={content?.contentId?.toString()} uploadeable/>
               </DialogContent>
            </Dialog> );
}

EditContentDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    content: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
