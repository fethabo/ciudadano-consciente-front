import { MenuItem, TextField } from '@mui/material';
import { Formik, Form, Field, /* ErrorMessage */ } from 'formik';
import PropTypes from "prop-types"

// Este componente recibirá una lista de campos y otras propiedades de Formik
/**
 * @todo Agregar control de POST, que reciba la funcion por props
 * @description children debe contener el button submit
 * @param {*} param0 
 * @example: 
 *      <FormBase
            fields={config.fields}
            initialValues={ { name: organization?.name, description: organization?.description, email: organization?.email }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
        >
        {isFetchingPatch && <LinearProgress />}
             <Box display={"flex"} justifyContent={"space-around"}>
                <Button key="volver" onClick={()=>navigate(`/organizations/${idOrganization}`)} disabled={isFetchingPatch}>Volver</Button>
                <Button key="submit" type="submit" disabled={isFetchingPatch||isFetchingOrganization}>GUARDAR</Button>
            </Box>
        </FormBase> 
 * @returns 
 */
export default function FormBase({ fields, initialValues, validationSchema, onSubmit, children, disableForm }){

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      
    >
      {(formState) => (
          <Form>
          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: '16px' }}>
              {field.type === 'select' ? (
                 <Field
                 name={field.name}
                 as={TextField}
                 select
                 label={field.label || field.name}
                 fullWidth
                 variant="outlined"
                 error={formState.touched[field.name] && Boolean(formState.errors[field.name])}
                 helperText={formState.touched[field.name] && formState.errors[field.name]}
                 disabled={disableForm}
                 {...field.props}
               >
                 {field.options?.map((option) => (
                   <MenuItem key={option.value} value={option.value}>
                     {option.label}
                   </MenuItem>
                 ))}
               </Field>
              ) : (
                <Field
                  as={TextField}
                  name={field.name}
                  type={field.type}
                  label={field.label || field.name}
                  placeholder={field.placeholder}
                  fullWidth
                  variant="outlined"
                  error={formState.touched[field.name] && Boolean(formState.errors[field.name])}
                  helperText={formState.touched[field.name] && formState.errors[field.name]}
                  disabled={disableForm}
                  {...field.props}
                />
              )}
            </div>
          ))}
          {children}
        </Form>
      )}
    </Formik>
  );
}

FormBase.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    initialValues: PropTypes.object,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.element,
    disableForm: PropTypes.bool
}

//import * as Yup from 'yup';

/* 
// Ejemplo de uso del componente CustomForm
const App = () => {
  // Definir los campos del formulario
  const fields = [
    { name: 'username', type: 'text', required: true, placeholder: 'Enter your username' },
    { name: 'email', type: 'email', required: true, placeholder: 'Enter your email' },
    { name: 'password', type: 'password', required: true, placeholder: 'Enter your password' },
  ];

  // Definir los valores iniciales
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  // Manejar el submit del formulario
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div>
      <h1>My Form</h1>
      <CustomForm
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
 */