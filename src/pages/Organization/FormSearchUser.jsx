import FormBase from "../../components/Forms/FormBase";
import * as Yup from 'yup';
import { useGetRoles } from "../../components/Hooks/requests/Roles";


/* TODO: ATAJAR ERROR y progreso DE FETCH */
function FormSearchUsers() {
    const {data: roles, /* isFetching: isFetchingRoles, isError: isErrorRoles */}= useGetRoles({enabled: true});
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
      const handleSubmit = (values) => {
        //TODO: VERIFICAR QUE EL USUARIO EXISTE (GETBYEMAIL)
        //TODO: AGREGAR POST DE USER
        console.log('Form values:', values);
      };
   
    return ( 
                    <FormBase
                        fields={fields}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    />

     );
}

export default FormSearchUsers;