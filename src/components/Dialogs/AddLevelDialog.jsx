import {  Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostLevel } from "../Hooks/requests/Level";
import FormLevel from "../Forms/FormLevel";
import { useQueryClient } from "@tanstack/react-query";

export default function AddLevelDialog({open, idParent , handleClose, path,...rest}) {
    const {idOrganization} = useParams();
    const [formPost, setFormPost] = useState(null);
    const {data, isFetching, isError} = usePostLevel({form: formPost, enabled: !!formPost})
    const queryClient = useQueryClient()
   
   
    
    useEffect(() => {
        if (formPost && !isFetching && data){
            setFormPost(null);
            queryClient.resetQueries({ queryKey: ['useGetLevelChildrens', path], exact: true }) 
            queryClient.resetQueries({ queryKey: "usePostLevel", exact: true }) 
            handleClose();
        }else if(isError && !!formPost){
            setFormPost(null)
        }
    }, [data, isError, isFetching, formPost, queryClient]);//eslint-disable-line

    const handleSubmit = (v) =>{
        const form = {...v, parent: idParent, organization: idOrganization}
        console.log("handleSubmit en dialog", v, form)
        setFormPost(form);
    }

    return ( <Dialog
                open={open}
                fullScreen
                aria-labelledby="add-level-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Agregar nivel  <IconButton type='button'  onClick={handleClose}  disabled={isFetching}><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormLevel onSubmit={handleSubmit} loading={isFetching}/>
               </DialogContent>
            </Dialog> );
}

AddLevelDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    idParent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

