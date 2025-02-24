import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchActivity } from "../Hooks/requests/Activity";
import FormActivity from "../Forms/FormActivity";

export default function EditActivityDialog({open, activity, handleClose, path,...rest}) {
    const [formPatch, setFormPatch] = useState(null);
    //console.log("ACTIVITY EN EDIT DIALOG", activity)
    const {data, isFetching, isError} = usePatchActivity({form: formPatch, activityId: activity?.activityId, enabled: !!formPatch && !!activity?.activityId})
    const queryClient = useQueryClient()
    
    useEffect(() => {
        if (data){
            setFormPatch(null);
            queryClient.resetQueries({ queryKey: ['useGetLevelChildrens', path], exact: true }) //ESTE HACE FALTA ACA? DEBERIA ALCANZAR CON REALIZAR EL GET ACTIVITIES, NO?
            queryClient.resetQueries({ queryKey: ['usePatchActivity', activity.activityId ], exact: true }) 
            queryClient.resetQueries({ queryKey: ['useGetContent'], exact: false})
            queryClient.resetQueries({ queryKey: ['useGetActivityByLevel'], exact: false})
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
                fullScreen
                aria-labelledby="edit-activity-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Editar actividad  <IconButton type='button'  onClick={handleClose} disabled={isFetching} ><CloseIcon/></IconButton> </DialogTitle>
               <DialogContent dividers>
                    <FormActivity onSubmit={handleSubmit} loading={isFetching} initialValues={activity}/>
               </DialogContent>
            </Dialog> );
}

EditActivityDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    activity: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

