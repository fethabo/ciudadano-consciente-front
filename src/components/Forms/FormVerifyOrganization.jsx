import { useGetOrganizationByEmail, usePostOrganizationVerify } from "@components/Hooks/requests/Organizations";
import { Alert, Container, Skeleton, Stack, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from '@mui/icons-material/Email';
function FormVerifyOrganization() {

    const { idOrganization } = useParams();
    const [email, setEmail] = useState(null)
    const [enabledGetOrganization, setEnabledGetOrganization] = useState(false);
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization} = useGetOrganizationByEmail({ email: email, enabled: (!!email && enabledGetOrganization)})
    const [formPost, setFormPost] = useState(null);
    const {data: organizationVerified, isFetching: isFetchingVerification,isFetchedAfterMount, isError: isErrorVerification} = usePostOrganizationVerify({organizationId: formPost?.organizationId,form: formPost,enabled: !!formPost})

    const handleSubmit = (values, actions)=>{
        if(values?.email){
            setEmail(values.email);
            setEnabledGetOrganization(true);
            }
        else{
            setFormPost({organizationId: idOrganization||organization?.organizationId, token: values?.token})
        }
        actions.resetForm();
    }


    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(isFetchedAfterMount){
        if(!isFetchingVerification){
            if (isErrorVerification){
                setFormPost(null)
            }else{
                setFormPost(null)
                setOpenDialog(true)
            }
        }}
    }, [organizationVerified, isErrorVerification, isFetchingVerification, isFetchedAfterMount]);

    const handleClose = () => {
        setOpenDialog(false);
        navigate(`/organizations`);
    };

    return (
        <>
            <Container>
                <Formik
                    initialValues={{ email: '', token: '' }}
                    onSubmit={(values, actions) => handleSubmit(values, actions)}
                >
                    
                    {({ isSubmitting }) => (
                        <Form >
                            <Typography variant="h6" >Confirma el correo electrónico</Typography>
                            {
                            (isFetchingOrganization || isFetchingVerification)
                            ? (
                                <Stack gap="1em">
                                    <Skeleton variant="rounded" width="100%" height={46} />
                                    <Skeleton variant="rounded" width="100%" height={46} />
                                    <Skeleton variant="rounded" width={100} height={36} style={{ marginTop: 16 }} />
                                </Stack>
                            ) : (idOrganization || organization?.organizationId) ? (
                                <Stack gap="1em">
                                <Alert severity="warning" icon={<EmailIcon />}>Ingresa el token que te enviamos por correo electrónico</Alert>
                                    <Field
                                        name="token"
                                        as={TextField}
                                        label="Código de Validación"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <Button type="submit" disabled={isSubmitting} >Verificar</Button>
                                </Stack>
                            ) : (
                                <Stack gap="1em">
                                 {isErrorOrganization && <Alert severity="error">Hubo un problema al buscar el correo, prueba nuevamente</Alert>}
                                 <Alert severity="info">Ingresa el correo electrónico con el que registraste la organización</Alert>
                                    <Field
                                        name="email"
                                        type="email"
                                        as={TextField}
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <Button type="submit" disabled={isSubmitting} startIcon={<SearchIcon />}>Buscar</Button>
                                </Stack>
                            )}
                        </Form>
                    )}
                </Formik>
            </Container>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Verificación Exitosa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                     <Alert severity="success" icon={<MarkEmailReadIcon />}>   El correo de la organización ha sido validado con éxito.</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
           
}

export default FormVerifyOrganization;