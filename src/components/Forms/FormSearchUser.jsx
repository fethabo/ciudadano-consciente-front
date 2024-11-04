import FormBase from "./FormBase";
import * as Yup from 'yup';
import { useGetRoles } from "../Hooks/requests/Roles";
import { Alert, Button } from "@mui/material";
import { useGetUserByEmail } from "../Hooks/requests/Users/Index";
import { useEffect, useState } from "react";
import { usePostRoleUserOrganization } from "../Hooks/requests/Organizations";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

/* TODO: ATAJAR ERROR y progreso DE FETCH */
function FormSearchUsers({handleSubmit}) {
    const {data: roles, /* isFetching: isFetchingRoles, isError: isErrorRoles */}= useGetRoles({enabled: true});
    const [values, setValues]= useState(null);
    const {data: user, isFetching: isFetchingUser, isError: isErrorUser}= useGetUserByEmail({userEmail:values?.user, enabled: !!values})
    //OBTENGO EL USUARIO, se lo paso en el handleSumbit al padre
    const [dataPost, setDataPost]= useState(null);
    const {idOrganization} = useParams();
    const {data: responsePost, isFetching: isFetchingPost, isError: isErrorPost} = usePostRoleUserOrganization({organizationId: idOrganization, form: dataPost, enabled: !!dataPost &&!!idOrganization})
    const navigate= useNavigate();
    //Habilitamos el post
    useEffect(() => {
      if (user&& values && dataPost===null){
        setDataPost({
          "user": user?.userId,
          "role": values?.role,
          "organization": idOrganization
        })
        setValues(null)//lo reseteo para permitir otro envio si llega a fallar
      }
    }, [user, dataPost,values, idOrganization]);

    //Evaluo respuesta del post
    useEffect(() => {
      if(isErrorPost){
        setDataPost(null);
      }
      if(responsePost){
         setDataPost(null);
         handleSubmit();
      }
    }, [responsePost, isErrorPost, handleSubmit]);

    const rolesRefactor = (roles)=>{
        const options= [];
        if(roles?.length>0){
        roles.map((role) =>
            options.push({value:role.roleId, label: role.name})
        )
    }
        return options
    }
    const fields = [
        { name: 'user', type: 'email', placeholder: 'Enter the email', label:"Email", required: true },
        { name: 'role', type: 'select', placeholder: 'Select Role', label: "Rol", options:rolesRefactor(roles), required: true },
      ];
    
      // Definir los valores iniciales
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
   
    return ( 
                    <FormBase
                        fields={fields}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={searchUser}
                    >
                      {isErrorUser&&
                      <Alert severity="error">Hubo un error al buscar el usuario</Alert>
                      }
                      
                      {isErrorPost&&
                      <Alert severity="error">Hubo un error al agregar al usuario</Alert>
                      }
                        <Button
                      disabled={isFetchingUser}
                      loading={isFetchingUser}     
                      onClick={()=>navigate(`/organizations/${idOrganization}`)}                 
                      >cancelar</Button>
                    <Button
                      type="submit"
                      disabled={isFetchingUser}
                      loading={isFetchingUser}                      
                      >Agregar</Button>
                    </FormBase>

     );
}

export default FormSearchUsers;