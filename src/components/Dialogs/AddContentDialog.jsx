import {  Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserApi from "../Hooks/useUserApi";
import { usePostContent } from "../Hooks/requests/Content";
import FormAddContent from "@components/Forms/FormAddContent";

/**
 * @param {*} param0 
 * @returns 
 */
export default function AddContentDialog({open, handleClose, isPublic, ...rest}) {
    const { idOrganization } = useParams(); // id de organizacion para organization
    const { userId } = useUserApi();//id de usuario para creator
    const [formPost, setFormPost] = useState(null);
    const {data: contentPosted, isFetching: isFetchingPostContent, isError: isErrorPostContent} = usePostContent({form: formPost, enabled: !!formPost})
    const queryClient = useQueryClient()
   
    useEffect(() => {
      //  console.log("useEffect que evalua el post", isFetchingPostContent, isErrorPostContent, contentPosted)
        if(!isFetchingPostContent){
            if (contentPosted){
             //   console.log("entra en el uef, if de data")
                queryClient.resetQueries({ queryKey: ['useGetContents'], exact: true }) //para actualizar las opciones de la actividad
                queryClient.resetQueries({ queryKey: ['useGetContentsOfUser'], exact: false }) //para actualizar las opciones de la actividad
                queryClient.resetQueries({ queryKey: ['useGetContentsOfOrganization', idOrganization], exact: false }) //para actualizar las opciones de la actividad
            }
            setFormPost(null);
            handleClose(contentPosted);
        }
    }, [contentPosted, isErrorPostContent, isFetchingPostContent]);//eslint-disable-line
    
    const handleSubmit = (v) =>{
       // console.log("HANDLE SUBMIT EN DIALOG", v)
        const form = {
            ...v,
            model: JSON.stringify(v.model),
            creator: userId,
            publicContent: isPublic ?? v.publicContent
        };
        if (!isPublic) {
            form.organization = Number(idOrganization);
        }
        console.log("Form", form)
       
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });
       // console.log("FormData", formData)
        setFormPost(formData);
    }

    return ( <Dialog
                fullScreen
                open={open}
                aria-labelledby="add-level-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle sx={{justifyContent:'space-between', display:'flex'}}><Typography variant="h5"> Agregar contenido</Typography>  <IconButton type='button'  onClick={handleClose}  disabled={isFetchingPostContent}><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormAddContent onSubmit={handleSubmit} loading={isFetchingPostContent} isPublic={isPublic}/>
               </DialogContent>
            </Dialog> );
}

AddContentDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    idParent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isPublic: PropTypes.bool
}

