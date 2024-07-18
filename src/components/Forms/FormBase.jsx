import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from "prop-types"

// Este componente recibirá una lista de campos y otras propiedades de Formik
export default function FormBase({ fields, initialValues, validationSchema, onSubmit }){

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
          <Form>
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <Field as="select" id={field.name} name={field.name} {...field.props}>
                  <option value="">Select an option</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  component={field.component || 'input'}
                  placeholder={field.placeholder}
                  {...field.props}
                />
              )}
              <ErrorMessage name={field.name} component="div" className="error" />
            </div>
          ))}
          <button type="submit">Submit</button>
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