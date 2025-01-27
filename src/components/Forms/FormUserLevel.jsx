import FormBase from "./FormBase";
import * as Yup from 'yup';
import { useGetRoles } from "../Hooks/requests/Roles";
import { Alert, Box, Button, LinearProgress, Skeleton, Stack } from "@mui/material";
import { useGetUserByEmail } from "../Hooks/requests/Users/Index";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { usePostUserRoleLevel } from "../Hooks/requests/Level";

//TODO: evaluar uso de useMutation para evitar el doble POST
function FormUserLevel({handleSubmit, levelId}) {
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled: true});
    const [values, setValues]= useState(null);
    const {data: user, isFetching: isFetchingUser, isError: isErrorUser}= useGetUserByEmail({userEmail:values?.user, enabled: !!values})
    const [dataPost, setDataPost]= useState(null);
    const {data: responsePost, isFetching: isFetchingPost, isError: isErrorPost} = usePostUserRoleLevel({levelId: levelId, form: dataPost, enabled: !!dataPost &&!!levelId})
    
    //Habilitamos el post
    useEffect(() => {
      if (user&& values && dataPost===null){
        setDataPost({
          "user": user?.userId,
          "role": values?.role,
          "level": levelId
        })
        setValues(null)//lo reseteo para permitir otro envio si llega a fallar
      }
    }, [user, dataPost,values, levelId]);

    //Evaluo respuesta del post
    useEffect(() => {
      if(isErrorPost){
        setDataPost(null);
      }
      if(responsePost){
         setDataPost(null);
         setValues(null)
         handleSubmit();
      }
    }, [responsePost, isErrorPost, handleSubmit]);

    //Refactorizo los roles para el select
    const rolesRefactor = (roles) => {
      const options = [];
      if (roles?.length > 0) {
          roles.filter(role => role.name === "L-Moderator" || role.name === "L-Divulgator")
               .map((role) => options.push({ value: role.roleId, label: role.name }));
      }
      return options;
  }
    
    const fields = [
        { name: 'user', type: 'email', placeholder: 'Enter the email', label:"Email", required: true },
        { name: 'role', type: 'select', placeholder: 'Select Role', label: "Rol", options:rolesRefactor(roles), required: true },
      ];
    
      const initialValues = {
        user: '',
        role: '',
      };
    
      // Definir el esquema de validación con Yup
      const validationSchema = Yup.object().shape({
        user: Yup.string().email('Invalid email').required('Required'),
        role: Yup.number().required('Required'),
      });
    
      // Manejar el submit del formulario
      const searchUser = (values) => {
        setValues(values);
      };
   
    return ( isFetchingRoles ? (
      <Box>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={56} />
          <Skeleton variant="rectangular" width="100%" height={56} />
      </Box>
  ) : (
                    <FormBase
                        fields={fields}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={searchUser}
                    >
                      <Stack spacing={2}>
                      {isErrorRoles && (
                <Alert severity="error">Hubo un error al obtener los roles disponibles</Alert>
            )}
                      {isErrorUser && (
                <Alert severity="error">Hubo un error al buscar el usuario</Alert>
            )}
            {isErrorPost && (
                <Alert severity="error">Hubo un error al agregar al usuario</Alert>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={isFetchingUser || isFetchingPost}
                            onClick={() => handleSubmit()}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isFetchingUser || isFetchingPost}
                        >
                            Agregar
                        </Button>
            </Box>
            {(isFetchingUser || isFetchingPost) && (
                <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress />
                </Box>
            )}
            </Stack>
                    </FormBase>

     ));
}

export default FormUserLevel;

FormUserLevel.propTypes = {
    handleSubmit: PropTypes.func,
}