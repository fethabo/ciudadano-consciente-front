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
 * activityTypeVersionId *
publicContent *
model *
string($binary)
 * @param {*} param0 
 * @returns 
 */
export default function AddContentDialog({open, handleClose, ...rest}) {
    const {idOrganization} = useParams(); // id de organizacion para organization
    const { userId } = useUserApi();//id de usuario para creator
    const [formPost, setFormPost] = useState(null);
    const {data, isFetching, isError} = usePostContent({form: formPost, enabled: !!formPost})
    const queryClient = useQueryClient()
    

    //Model: formulario autogenerado segun el modelo del activityTypeVersionId. 
    //Para llegar al activityTypeVersionId primero tenemos que seleccionar el activityType., esa seleccion debe obtener el activityTypeVersion vigente
    //al obtener la version vigente tenemos el modelo para autogenerar el formulario
    // los valores del formulario del content se deben pasar como json en el content del post.
   
    
    useEffect(() => {
        if (data){
            setFormPost(null);
            queryClient.resetQueries({ queryKey: ['useGetContents'], exact: true }) //para actualizar las opciones de la actividad
            //     queryClient.resetQueries({ queryKey: ['useGetContentsOfOrganization', idOrganization], exact: true }) //para actualizar las opciones de la actividad
            handleClose();
        }else if(isError){
            setFormPost(null)
        }
    }, [data, isError]);//eslint-disable-line

    const handleSubmit = (v) =>{
        console.log("handleSubmit en dialog", v)
        /* TODO: JSON.stringify no esta escapando el arreglo de opciones del FieldArray (y si lo convierto a string en el submit?) */
        const form = {...v, model: JSON.stringify(v.model),  creator: userId, organization: Number(idOrganization)}
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });
        setFormPost(formData);
    }

    return ( <Dialog
                fullScreen
                open={open}
                aria-labelledby="add-level-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle sx={{justifyContent:'space-between', display:'flex'}}><Typography variant="h5"> Agregar contenido</Typography>  <IconButton type='button'  onClick={handleClose}  disabled={isFetching}><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormAddContent onSubmit={handleSubmit} loading={isFetching}/>
               </DialogContent>
            </Dialog> );
}

AddContentDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    idParent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

